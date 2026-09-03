import { CSSProperties, forwardRef, useEffect, useRef, useState } from 'react';

import MaskedInput from './MaskedInput';
import {
  formatNumber,
  getDecimalPlaces,
  parseNumber,
  setNativeValue,
} from './utils';

type InputModifier = 'shiftKey' | 'altKey' | 'ctrlKey' | 'metaKey';

export type Modifiers = {
  [key in InputModifier]?: number;
};

const MODIFIER_PRIORITY: InputModifier[] = [
  'metaKey',
  'ctrlKey',
  'altKey',
  'shiftKey',
];

/** Horizontal movement (in px) required before a pointer drag becomes a scrub. */
const DRAG_THRESHOLD_PX = 3;

interface InteractiveInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Modifiers to apply to the input value. Defaults to `{ shiftKey: 0.1 }`.
   */
  modifiers?: Modifiers;
  value?: number;
}

interface DragState {
  pointerId: number;
  startX: number;
  lastX: number;
  /** Value at drag start, restored when the drag is cancelled with Escape. */
  startValue: number;
  /** Unrounded accumulated value while scrubbing. */
  accumulated: number;
  scrubbing: boolean;
  previousBodyCursor: string;
}

/**
 * Main component for the InteractiveInput.
 *
 * Click and drag horizontally to scrub the value; a plain click focuses the
 * field for manual text editing (drags while focused select text instead of
 * scrubbing). Scrubbing works with mouse, touch and pen via Pointer Events,
 * survives the pointer leaving the element thanks to pointer capture, applies
 * modifier keys (read live from each pointer event) and can be cancelled with
 * Escape, restoring the value from before the drag.
 */
const InteractiveInput = forwardRef<HTMLInputElement, InteractiveInputProps>(
  (
    {
      value,
      modifiers = {
        altKey: 1,
        ctrlKey: 1,
        metaKey: 1,
        shiftKey: 0.1,
      },
      style: _style = {},
      onBlur,
      onFocus,
      onKeyDown,
      onPointerCancel,
      onPointerDown,
      onPointerMove,
      onPointerUp,
      ...props
    },
    forwardedRef
  ) => {
  const dragRef = useRef<DragState | null>(null);
  const [editing, setEditing] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);

  const step = props.step ? +props.step : 1;
  const min = props.min !== undefined ? +props.min : undefined;
  const max = props.max !== undefined ? +props.max : undefined;

  const style: CSSProperties = {
    cursor: editing && !scrubbing ? undefined : 'ew-resize',
    touchAction: 'none',
    ..._style,
  };

  // Safety net: if unmounted mid-scrub, restore the document cursor.
  useEffect(
    () => () => {
      const drag = dragRef.current;
      if (drag?.scrubbing) {
        document.body.style.cursor = drag.previousBodyCursor;
      }
    },
    []
  );

  const activeModifier = (e: React.PointerEvent<HTMLInputElement>): number => {
    for (const key of MODIFIER_PRIORITY) {
      if (e[key]) return modifiers[key] ?? 1;
    }
    return 1;
  };

  const finishScrub = (
    input: HTMLInputElement,
    drag: DragState,
    restoreStartValue: boolean
  ) => {
    dragRef.current = null;
    if (!drag.scrubbing) return;

    setScrubbing(false);
    document.body.style.cursor = drag.previousBodyCursor;

    try {
      input.releasePointerCapture(drag.pointerId);
    } catch {
      // Capture may already be released, or unavailable in the environment.
    }

    if (restoreStartValue) {
      setNativeValue(input, formatNumber(drag.startValue));
    }

    // Leave edit mode so the next click-and-drag scrubs again.
    input.blur();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLInputElement>) => {
    onPointerDown?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || props.disabled || props.readOnly) return;

    const input = e.currentTarget;

    // If the field is already focused the user is editing text; let the
    // pointer place the caret or select text instead of arming a scrub.
    if (document.activeElement === input) return;

    let startValue = parseNumber(input.value);
    if (!Number.isFinite(startValue)) {
      startValue = Number(props.defaultValue ?? min ?? 0) || 0;
    }

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      lastX: e.clientX,
      startValue,
      accumulated: startValue,
      scrubbing: false,
      previousBodyCursor: '',
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLInputElement>) => {
    onPointerMove?.(e);

    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const input = e.currentTarget;

    // The pointer was released outside our knowledge (e.g. missed pointerup
    // without capture); don't scrub on hover.
    if (e.buttons === 0) {
      dragRef.current = null;
      return;
    }

    if (!drag.scrubbing) {
      if (Math.abs(e.clientX - drag.startX) < DRAG_THRESHOLD_PX) return;

      drag.scrubbing = true;
      drag.lastX = e.clientX;
      setScrubbing(true);
      drag.previousBodyCursor = document.body.style.cursor;
      document.body.style.cursor = 'ew-resize';

      try {
        input.setPointerCapture(e.pointerId);
      } catch {
        // Pointer capture unavailable (e.g. jsdom); scrubbing still works
        // while the pointer stays over the element.
      }
    }

    // Modifiers are read live from the event, so pressing or releasing a
    // modifier mid-drag takes effect immediately, and only affects movement
    // from this point on (no jumps).
    const mod = activeModifier(e);
    const stepModifier = step * mod;
    const decimals = getDecimalPlaces(step) + getDecimalPlaces(mod);

    drag.accumulated += (e.clientX - drag.lastX) * stepModifier;
    drag.lastX = e.clientX;

    if (min !== undefined) drag.accumulated = Math.max(drag.accumulated, min);
    if (max !== undefined) drag.accumulated = Math.min(drag.accumulated, max);

    const next = +drag.accumulated.toFixed(decimals);
    if (!Number.isNaN(next)) {
      setNativeValue(input, formatNumber(next));
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLInputElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    finishScrub(e.currentTarget, drag, false);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLInputElement>) => {
    onPointerUp?.(e);
    handlePointerEnd(e);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLInputElement>) => {
    onPointerCancel?.(e);
    handlePointerEnd(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const drag = dragRef.current;
    if (e.key === 'Escape' && drag?.scrubbing) {
      e.preventDefault();
      finishScrub(e.currentTarget, drag, true);
      return;
    }
    onKeyDown?.(e);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditing(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditing(false);
    onBlur?.(e);
  };

  return (
    <MaskedInput
      {...props}
      ref={forwardedRef}
      defaultValue={props.defaultValue ?? 0}
      style={style}
      value={value !== undefined ? formatNumber(value) : undefined}
      onBlur={handleBlur}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
  }
);

export default InteractiveInput;

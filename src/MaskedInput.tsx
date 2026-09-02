import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { type MaskFunction, maskNumber } from './masks';
import {
  getDecimalPlaces,
  normalizeNumberText,
  parseNumber,
  setNativeValue,
  toCanonicalText,
} from './utils';

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Masking function applied to the input text. Receives the raw text and the
   * previous (valid) text, and returns the text to display. Defaults to
   * `maskNumber`, which accepts complete and in-progress decimal numbers,
   * including negative ones.
   */
  mask?: MaskFunction;
  value?: string;
}

/**
 * A React input component featuring input masking specifically designed to
 * address limitations with negative numbers in standard HTML input elements.
 *
 * The displayed text is owned locally while the field is focused, so
 * in-progress states like "", "-" or "1." are never overwritten by a
 * controlled host echoing parsed values back. The `value` prop is synced to
 * the display only while the field is not focused.
 *
 * All change events delivered to `onChange` are genuine React ChangeEvents
 * whose `target.value` is the canonical (dot-decimal) string.
 */
const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      defaultValue,
      mask = maskNumber,
      onBlur,
      onChange,
      onFocus,
      onKeyDown,
      step = 1,
      value,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(
      forwardedRef,
      () => innerRef.current as HTMLInputElement
    );

    const [text, setText] = useState(
      value ?? (defaultValue != null ? String(defaultValue) : '')
    );
    const textRef = useRef(text);
    textRef.current = text;

    const isFocusedRef = useRef(false);
    const isNumericMask = mask === maskNumber;

    // Sync the display from the controlled prop, but never while the user is
    // editing: in-progress text must not be stomped by host echoes.
    useEffect(() => {
      if (value === undefined || isFocusedRef.current) return;
      setText(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const raw = input.value;
      const masked = mask(raw, textRef.current);

      if (masked !== raw) {
        // Rejected input: restore the previous text and put the caret back
        // where it was before the invalid characters were inserted.
        const caretAfter = input.selectionStart ?? raw.length;
        const caret = Math.min(
          masked.length,
          Math.max(0, caretAfter - (raw.length - masked.length))
        );
        input.value = masked;
        input.setSelectionRange(caret, caret);
        return;
      }

      textRef.current = masked;
      setText(masked);

      if (!onChange) return;

      const canonical = toCanonicalText(masked);
      if (canonical !== masked) {
        // Expose the canonical (dot-decimal) value on the real event while
        // the host handler runs, then restore the display text and caret.
        const selectionStart = input.selectionStart ?? masked.length;
        const selectionEnd = input.selectionEnd ?? masked.length;
        input.value = canonical;
        onChange(event);
        input.value = masked;
        input.setSelectionRange(selectionStart, selectionEnd);
      } else {
        onChange(event);
      }
    };

    const stepBy = (direction: 1 | -1) => {
      const input = innerRef.current;
      if (!input) return;

      const current = parseNumber(textRef.current);
      const stepValue = Number(step) || 1;
      const decimals = getDecimalPlaces(stepValue);

      let next =
        (Number.isFinite(current) ? current : 0) + direction * stepValue;

      const min = props.min !== undefined ? Number(props.min) : NaN;
      const max = props.max !== undefined ? Number(props.max) : NaN;
      if (!Number.isNaN(min)) next = Math.max(next, min);
      if (!Number.isNaN(max)) next = Math.min(next, max);

      setNativeValue(input, next.toFixed(decimals));
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        stepBy(1);
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        stepBy(-1);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = true;
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      isFocusedRef.current = false;
      const current = textRef.current;
      const normalized = isNumericMask ? normalizeNumberText(current) : current;

      if (normalized !== current) {
        // Emits a genuine change through the regular pipeline.
        setNativeValue(event.target, normalized);
      } else if (value !== undefined && value !== current) {
        // Reconcile the display with the controlled prop, e.g. when the
        // field was left empty and the host kept its previous value.
        setText(value);
      }

      onBlur?.(event);
    };

    return (
      <input
        inputMode="decimal"
        {...props}
        type="text"
        ref={innerRef}
        value={text}
        onBlur={handleBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

export default MaskedInput;

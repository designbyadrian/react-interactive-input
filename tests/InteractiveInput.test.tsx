import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

import InteractiveInput from '../src/InteractiveInput';

afterEach(cleanup);

/** A controlled host that parses every change and echoes it back. */
function ControlledHost(props: {
  initial?: number;
  min?: number;
  max?: number;
  step?: number;
  onValue?: (value: number) => void;
}) {
  const { initial = 0, onValue, ...rest } = props;
  const [value, setValue] = useState(initial);
  return (
    <InteractiveInput
      aria-label="scrub-input"
      value={value}
      onChange={e => {
        const parsed = parseFloat(e.target.value);
        if (!Number.isNaN(parsed)) {
          setValue(parsed);
          onValue?.(parsed);
        }
      }}
      {...rest}
    />
  );
}

const pointer = (overrides: Record<string, unknown> = {}) => ({
  pointerId: 1,
  button: 0,
  buttons: 1,
  ...overrides,
});

/** Starts a drag at x=100 and crosses the 3px threshold (which resets the anchor). */
const startDrag = (input: HTMLElement) => {
  fireEvent.pointerDown(input, pointer({ clientX: 100 }));
  fireEvent.pointerMove(input, pointer({ clientX: 103 }));
};

describe('InteractiveInput scrubbing', () => {
  it('scrubs the value with horizontal movement through a controlled host', () => {
    render(<ControlledHost initial={0} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 113 })); // +10px
    fireEvent.pointerUp(input, pointer({ clientX: 113 }));

    expect(input.value).toBe('10');
  });

  it('does not scrub below the movement threshold (plain click)', () => {
    render(<ControlledHost initial={5} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    fireEvent.pointerDown(input, pointer({ clientX: 100 }));
    fireEvent.pointerMove(input, pointer({ clientX: 101 }));
    fireEvent.pointerUp(input, pointer({ clientX: 101 }));

    expect(input.value).toBe('5');
  });

  it('can scrub down to exactly 0', () => {
    render(<ControlledHost initial={5} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 98 })); // -5px from anchor
    fireEvent.pointerUp(input, pointer({ clientX: 98 }));

    expect(input.value).toBe('0');
  });

  it('clamps to min={0} while dragging past it', () => {
    render(<ControlledHost initial={5} min={0} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 3 })); // -100px
    expect(input.value).toBe('0');

    // Reversing immediately moves up again (accumulator is clamped too).
    fireEvent.pointerMove(input, pointer({ clientX: 7 }));
    fireEvent.pointerUp(input, pointer({ clientX: 7 }));
    expect(input.value).toBe('4');
  });

  it('applies a modifier pressed mid-drag, without value jumps', () => {
    render(<ControlledHost initial={0} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 113 })); // +10 at step 1
    expect(input.value).toBe('10');

    // Shift defaults to a 0.1 multiplier: +10px adds only 1.
    fireEvent.pointerMove(input, pointer({ clientX: 123, shiftKey: true }));
    fireEvent.pointerUp(input, pointer({ clientX: 123 }));
    expect(input.value).toBe('11');
  });

  it('cancels the drag with Escape, restoring the start value', () => {
    render(<ControlledHost initial={7} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 113 }));
    expect(input.value).toBe('17');

    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input.value).toBe('7');

    // The drag is over: further movement changes nothing.
    fireEvent.pointerMove(input, pointer({ clientX: 150 }));
    expect(input.value).toBe('7');
  });

  it('scales by step and rounds to the step decimals', () => {
    render(<ControlledHost initial={0} step={0.1} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 106 })); // +3px * 0.1
    fireEvent.pointerUp(input, pointer({ clientX: 106 }));

    expect(input.value).toBe('0.3');
  });

  it('does not scrub when the field is already focused (edit mode)', () => {
    render(<ControlledHost initial={5} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    input.focus();
    startDrag(input);
    fireEvent.pointerMove(input, pointer({ clientX: 200 }));
    fireEvent.pointerUp(input, pointer({ clientX: 200 }));

    expect(input.value).toBe('5');
  });
});

describe('InteractiveInput manual editing', () => {
  it('supports typing a negative number into a controlled host', async () => {
    const user = userEvent.setup();

    render(<ControlledHost initial={42} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    await user.click(input);
    await user.clear(input);
    await user.keyboard('-10');

    expect(input.value).toBe('-10');

    await user.tab();
    expect(input.value).toBe('-10');
  });

  it('delete-all then retype does not inject a leading zero', async () => {
    const user = userEvent.setup();

    render(<ControlledHost initial={42} />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    await user.click(input);
    await user.clear(input);
    expect(input.value).toBe('');

    await user.keyboard('9');
    expect(input.value).toBe('9');
  });

  it('survives a host that echoes values asynchronously', async () => {
    const user = userEvent.setup();

    function AsyncHost() {
      const [value, setValue] = useState(1);
      return (
        <InteractiveInput
          aria-label="scrub-input"
          value={value}
          onChange={e => {
            const parsed = parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) {
              setTimeout(() => setValue(parsed), 10);
            }
          }}
        />
      );
    }

    render(<AsyncHost />);
    const input = screen.getByLabelText<HTMLInputElement>('scrub-input');

    await user.click(input);
    await user.clear(input);
    await user.keyboard('0.5');

    // Let the delayed echoes (0, then 0.5) arrive while still focused.
    await new Promise(resolve => setTimeout(resolve, 50));

    expect(input.value).toBe('0.5');
  });

  it('shows 0 initially when uncontrolled, like before', () => {
    render(<InteractiveInput aria-label="scrub-input" />);
    expect(screen.getByLabelText<HTMLInputElement>('scrub-input').value).toBe(
      '0'
    );
  });
});

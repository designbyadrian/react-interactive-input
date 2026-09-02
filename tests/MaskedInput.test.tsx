import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import MaskedInput from '../src/MaskedInput';

afterEach(cleanup);

/**
 * A typical controlled host: parses each change, keeps its previous value
 * when the text is not (yet) a number, and echoes the parsed value back into
 * the `value` prop — the exact pattern that used to cause typing artefacts.
 */
function ControlledHost({
  initial = 42,
  onText,
}: {
  initial?: number;
  onText?: (text: string) => void;
}) {
  const [value, setValue] = useState(initial);
  return (
    <MaskedInput
      aria-label="host-input"
      value={String(value)}
      onChange={e => {
        onText?.(e.target.value);
        const parsed = parseFloat(e.target.value);
        if (!Number.isNaN(parsed)) setValue(parsed);
      }}
    />
  );
}

describe('MaskedInput typing', () => {
  it('accepts typing a negative number ("-10") and emits each step', async () => {
    const user = userEvent.setup();
    const values: string[] = [];

    render(
      <MaskedInput
        aria-label="input"
        onChange={e => values.push(e.target.value)}
      />
    );

    const input = screen.getByLabelText<HTMLInputElement>('input');
    await user.click(input);
    await user.keyboard('-10');

    expect(input.value).toBe('-10');
    expect(values).toEqual(['-', '-1', '-10']);
  });

  it('rejects invalid characters and keeps the previous text', async () => {
    const user = userEvent.setup();

    render(<MaskedInput aria-label="input" />);
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('1a2');

    expect(input.value).toBe('12');
  });

  it('does not share mask state between instances', async () => {
    const user = userEvent.setup();

    render(
      <>
        <MaskedInput aria-label="first" />
        <MaskedInput aria-label="second" />
      </>
    );

    const first = screen.getByLabelText<HTMLInputElement>('first');
    const second = screen.getByLabelText<HTMLInputElement>('second');

    await user.click(first);
    await user.keyboard('55');

    await user.click(second);
    await user.keyboard('x');

    // Before the fix, the module-level mask closure would resurrect "55"
    // (the other instance's last valid value) inside the second input.
    expect(second.value).toBe('');
    expect(first.value).toBe('55');
  });

  it('emits a canonical dot-decimal string when a comma is typed', async () => {
    const user = userEvent.setup();
    const values: string[] = [];

    render(
      <MaskedInput
        aria-label="input"
        onChange={e => values.push(e.target.value)}
      />
    );
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('1,5');

    expect(input.value).toBe('1,5'); // display keeps the typed separator
    expect(values).toEqual(['1', '1.', '1.5']); // events are canonical
  });
});

describe('MaskedInput controlled host echoes', () => {
  it('lets the user delete everything and retype without artefacts', async () => {
    const user = userEvent.setup();
    const texts: string[] = [];

    render(<ControlledHost initial={42} onText={t => texts.push(t)} />);
    const input = screen.getByLabelText<HTMLInputElement>('host-input');

    await user.click(input);
    await user.clear(input);

    // The host kept 42 (parse of "" is NaN) but must not stomp the display.
    expect(input.value).toBe('');

    await user.keyboard('5');

    // No "05", "425" or similar artefacts.
    expect(input.value).toBe('5');
    expect(texts[texts.length - 1]).toBe('5');
  });

  it('preserves an in-progress decimal point against host echoes ("0.5")', async () => {
    const user = userEvent.setup();

    render(<ControlledHost initial={1} />);
    const input = screen.getByLabelText<HTMLInputElement>('host-input');

    await user.click(input);
    await user.clear(input);
    await user.keyboard('0.5');

    // Typing "0." echoes value 0 from the host; the trailing dot must survive.
    expect(input.value).toBe('0.5');
  });

  it('reconciles an emptied field with the host value on blur', async () => {
    const user = userEvent.setup();

    render(<ControlledHost initial={42} />);
    const input = screen.getByLabelText<HTMLInputElement>('host-input');

    await user.click(input);
    await user.clear(input);
    await user.tab();

    // The host kept 42; once editing ends the display follows the prop again.
    expect(input.value).toBe('42');
  });

  it('syncs external value changes while not focused', () => {
    const { rerender } = render(
      <MaskedInput aria-label="input" value="1" onChange={() => {}} />
    );
    const input = screen.getByLabelText<HTMLInputElement>('input');

    rerender(<MaskedInput aria-label="input" value="99" onChange={() => {}} />);
    expect(input.value).toBe('99');
  });
});

describe('MaskedInput blur normalization', () => {
  it('collapses leading zeros on blur ("007" becomes "7")', async () => {
    const user = userEvent.setup();
    const values: string[] = [];

    render(
      <MaskedInput
        aria-label="input"
        onChange={e => values.push(e.target.value)}
      />
    );
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('007');
    await user.tab();

    expect(input.value).toBe('7');
    expect(values[values.length - 1]).toBe('7');
  });

  it('strips a lone minus and trailing separator on blur', async () => {
    const user = userEvent.setup();

    render(<MaskedInput aria-label="input" />);
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('-');
    await user.tab();
    expect(input.value).toBe('');

    await user.click(input);
    await user.keyboard('1.');
    await user.tab();
    expect(input.value).toBe('1');
  });
});

describe('MaskedInput arrow stepping', () => {
  it('steps with ArrowUp/ArrowDown and clamps to min/max', async () => {
    const user = userEvent.setup();
    const values: string[] = [];

    render(
      <MaskedInput
        aria-label="input"
        defaultValue="4"
        min={0}
        max={5}
        onChange={e => values.push(e.target.value)}
      />
    );
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('{ArrowUp}{ArrowUp}');
    expect(input.value).toBe('5'); // clamped at max

    await user.keyboard(
      '{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}{ArrowDown}'
    );
    expect(input.value).toBe('0'); // clamped at min
  });

  it('respects a decimal step', async () => {
    const user = userEvent.setup();

    render(<MaskedInput aria-label="input" defaultValue="1" step={0.1} />);
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('{ArrowUp}');
    expect(input.value).toBe('1.1');
  });

  it('lets a user-supplied onKeyDown cancel stepping', async () => {
    const user = userEvent.setup();
    const onKeyDown = vi.fn((e: React.KeyboardEvent) => e.preventDefault());

    render(
      <MaskedInput aria-label="input" defaultValue="1" onKeyDown={onKeyDown} />
    );
    const input = screen.getByLabelText<HTMLInputElement>('input');

    await user.click(input);
    await user.keyboard('{ArrowUp}');

    expect(onKeyDown).toHaveBeenCalled();
    expect(input.value).toBe('1');
  });
});

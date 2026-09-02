export const getDecimalPlaces = (value: number): number => {
  const parts = value.toString().split('.');
  return parts.length > 1 ? parts[1].length : 0;
};

/**
 * Convert display text to the canonical machine format: dot decimal
 * separator, mirroring how native number inputs expose a locale-independent
 * DOM value.
 */
export const toCanonicalText = (text: string): string => text.replace(',', '.');

/** Parse display text (dot or comma decimal separator) into a number. */
export const parseNumber = (text: string): number =>
  parseFloat(toCanonicalText(text));

/** Format a numeric value as canonical display text. Non-finite values become "". */
export const formatNumber = (value: number): string =>
  Number.isFinite(value) ? String(value) : '';

/**
 * Normalize an in-progress editing string into its canonical representation:
 * collapses leading zeros ("007" becomes "7"), strips trailing decimal
 * separators ("1." becomes "1") and lone minus signs ("-" becomes ""), and
 * converts a comma decimal separator to a dot. Unparseable text becomes "".
 */
export const normalizeNumberText = (text: string): string =>
  formatNumber(parseNumber(text));

/**
 * Set an input's value through the native HTMLInputElement value setter and
 * dispatch a bubbling `input` event. Using the prototype setter bypasses
 * React's internal value tracking, so React treats the dispatched event like
 * genuine user input and fires `onChange` with a real ChangeEvent whose
 * target is the actual input element.
 */
export const setNativeValue = (
  input: HTMLInputElement,
  value: string
): void => {
  if (input.value === value) return;

  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value'
  )?.set;

  if (setter) {
    setter.call(input, value);
  } else {
    input.value = value;
  }

  input.dispatchEvent(new Event('input', { bubbles: true }));

  if (setter) {
    // Re-assign through the instance path (a no-op for the DOM, since the
    // value is already set) so instance-level interceptors that wrap the
    // value setter (e.g. testing-library's user-event) observe the
    // programmatic change and don't act on stale values afterwards.
    input.value = input.value; // eslint-disable-line no-self-assign
  }
};

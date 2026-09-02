export type MaskFunction = (rawValue: string, previousValue: string) => string;

/**
 * Matches complete and in-progress decimal numbers, including intermediate
 * editing states such as "", "-", "1.", "-0," and ",5". Both "." and "," are
 * accepted as the decimal separator.
 */
const NUMBER_PATTERN = /^-?\d*[.,]?\d*$/;

/**
 * Pure number mask: returns the raw value when it is a valid (possibly
 * in-progress) decimal number, otherwise returns the previous valid value.
 *
 * Being pure, it holds no internal state, so mask behavior can never leak
 * between input instances.
 */
export const maskNumber: MaskFunction = (rawValue, previousValue) =>
  NUMBER_PATTERN.test(rawValue) ? rawValue : previousValue;

import type {
  colorScaleStringValuesTokens,
  colorScaleValuesTokens,
} from "../tokens";

export type ColorScaleValues = (typeof colorScaleValuesTokens)[number];

export type ColorScaleStringValues =
  (typeof colorScaleStringValuesTokens)[number];

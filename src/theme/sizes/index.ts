import type {
  borderRadiusValuesTokens,
  borderWidthValuesTokens,
  dimensionValuesTokens,
  spacingValuesTokens,
} from "../tokens";

type BorderRadiusValues = (typeof borderRadiusValuesTokens)[number];
type BorderWidthValues = (typeof borderWidthValuesTokens)[number];
type DimensionValues = (typeof dimensionValuesTokens)[number];
type SpacingValues = (typeof spacingValuesTokens)[number];

export type {
  DimensionValues,
  BorderWidthValues,
  BorderRadiusValues,
  SpacingValues,
};

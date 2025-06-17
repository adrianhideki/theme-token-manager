import type { Theme, PartialTheme, ResultTheme } from "./types";
import colors from "./colors";
import type { ColorScaleValues } from "./colors";
import type {
  FontFamily,
  FontHeight,
  FontParagraphSpacing,
  FontSize,
  FontSpacing,
  FontWeight,
} from "./fonts";
import {
  generateColorScale,
  getContrastColor,
  getIsDarkMode,
  injectColorCss,
  injectFontCss,
  injectSpacingCss,
  transformTheme,
  validateTheme,
} from "./utils";
import type {
  BorderRadiusValues,
  BorderWidthValues,
  DimensionValues,
  SpacingValues,
} from "./sizes";
import {
  borderRadiusValuesTokens,
  borderWidthValuesTokens,
  colorScaleStringValuesTokens,
  colorScaleValuesTokens,
  colorValuesTokens,
  dimensionValuesTokens,
  fontFamilyTokens,
  fontHeightTokens,
  fontParagraphSpacingTokens,
  fontSizeTokens,
  fontSpacingTokens,
  fontValuesTokens,
  fontWeightTokens,
  spacingValuesTokens,
  themePaletteBorderTokens,
  themePaletteIconTokens,
  themePaletteSurfaceTokens,
  themePaletteTextTokens,
} from "./tokens";
import { defaultTheme, emptyTheme } from "./default";
import { ColorScaleStringValues } from "./colors/types";

export type {
  Theme,
  PartialTheme,
  ResultTheme,
  ColorScaleValues,
  FontSize,
  FontWeight,
  FontParagraphSpacing,
  FontSpacing,
  FontFamily,
  FontHeight,
  DimensionValues,
  BorderWidthValues,
  BorderRadiusValues,
  SpacingValues,
  ColorScaleStringValues,
};

export {
  colors,
  generateColorScale,
  getContrastColor,
  getIsDarkMode,
  injectColorCss,
  injectFontCss,
  injectSpacingCss,
  transformTheme,
  validateTheme,
  borderRadiusValuesTokens,
  borderWidthValuesTokens,
  dimensionValuesTokens,
  spacingValuesTokens,
  fontFamilyTokens,
  fontHeightTokens,
  fontParagraphSpacingTokens,
  colorValuesTokens,
  fontValuesTokens,
  fontSizeTokens,
  fontSpacingTokens,
  fontWeightTokens,
  themePaletteSurfaceTokens,
  themePaletteTextTokens,
  themePaletteIconTokens,
  themePaletteBorderTokens,
  colorScaleValuesTokens,
  colorScaleStringValuesTokens,
  defaultTheme,
  emptyTheme,
};

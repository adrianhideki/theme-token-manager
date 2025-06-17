import type { ColorScaleValues } from "./colors";
import type {
  FontFamily,
  FontSpacing,
  FontParagraphSpacing,
  FontSize,
  FontWeight,
  FontHeight,
} from "./fonts";
import type {
  BorderRadiusValues,
  BorderWidthValues,
  DimensionValues,
  SpacingValues,
} from "./sizes";
import type {
  colorValuesTokens,
  fontValuesTokens,
  themePaletteBorderTokens,
  themePaletteIconTokens,
  themePaletteSurfaceTokens,
  themePaletteTextTokens,
} from "./tokens";

export type NestedOptional<T> = {
  [P in keyof T]?: NestedOptional<T[P]>;
};

export type ColorValues = (typeof colorValuesTokens)[number];

export type FoundationValues = "foundation.white" | "foundation.black";

export type FontValues = (typeof fontValuesTokens)[number];

export type ThemeColorValue = {
  color: ColorValues | FoundationValues;
  scale?: ColorScaleValues;
};

export type BaseThemeConfig = {
  font?: {
    family?: Record<FontFamily, string>;
    spacing?: Record<FontSpacing, number>;
    paragraphSpacing?: Record<FontParagraphSpacing, number>;
    size?: Record<FontSize, number>;
    weight?: Record<FontWeight, number>;
    height?: Record<FontHeight, number>;
  };
  color?: {
    /** Collection of colors to reference in theme */
    collection?: Record<string, Record<ColorScaleValues, string>>;
    /** basic foundations colors */
    foundations?: {
      white?: string;
      black?: string;
    };
  };
  size?: {
    dimension?: Record<DimensionValues, number>;
  };
};

export type ThemePaletteSurfaceValues =
  (typeof themePaletteSurfaceTokens)[number];

export type ThemePaletteSurface<Value> = Record<
  ThemePaletteSurfaceValues,
  Value
>;

export type ThemePaletteTextValues = (typeof themePaletteTextTokens)[number];

export type ThemePaletteText<Value> = Record<ThemePaletteTextValues, Value>;

export type ThemePaletteIconValues = (typeof themePaletteIconTokens)[number];

export type ThemePaletteIcon<Value> = Record<ThemePaletteIconValues, Value>;

export type ThemePaletteBorderValues =
  (typeof themePaletteBorderTokens)[number];

export type ThemePaletteBorder<Value> = Record<ThemePaletteBorderValues, Value>;

export type ThemePalette<Value> = {
  surface: ThemePaletteSurface<Value>;
  text: ThemePaletteText<Value>;
  icon: ThemePaletteIcon<Value>;
  border: ThemePaletteBorder<Value>;
};

type ThemeFont<Family, Spacing, Size, Height, Weight, Paragraph> = {
  family: Record<FontValues, Family>;
  spacing: Record<FontValues, Spacing>;
  size: Record<FontValues, Size>;
  height: Record<FontValues, Height>;
  weight: Record<FontValues, Weight>;
  paragraphSpacing: Record<FontValues, Paragraph>;
};

type ThemeSize<Value> = {
  border?: {
    width?: Record<BorderWidthValues, Value>;
    radius?: Record<BorderRadiusValues, Value>;
  };
  spacing?: Record<SpacingValues, Value>;
};

type ThemeColor<T> = {
  primary: T;
  secondary: T;
  accent: T;
  success: T;
  error: T;
  information: T;
  warning: T;
  "neutral-light": T;
  "neutral-dark": T;
};

export type Theme = {
  /**
   * Base values to use on theme customization
   */
  id?: string;
  name?: string;
  base: BaseThemeConfig;
  color: ThemeColor<string>;
  font: ThemeFont<
    FontFamily,
    FontSpacing,
    FontSize,
    FontHeight,
    FontWeight,
    FontParagraphSpacing
  >;
  size: ThemeSize<DimensionValues>;
  palette: {
    light: ThemePalette<ThemeColorValue>;
    dark: ThemePalette<ThemeColorValue>;
  };
};

/**
 * Theme with the values translated based on base theme property
 * ```ts
 * base: {
 *   font: {
 *     family: {
 *       heading: 'Inter'
 *     },
 *   }
 * }
 * font: {
 *   family: {
 *     h1: 'heading'
 *   }
 * }
 * // Results
 * theme.font.family.h1 => 'Inter'
 * ```
 */
export type ResultTheme = {
  id?: string;
  name?: string;
  base: BaseThemeConfig;
  color: ThemeColor<Record<ColorScaleValues, string>>;
  font: ThemeFont<string, number, number, number, number, number>;
  size: ThemeSize<number>;
  palette: { light: ThemePalette<string>; dark: ThemePalette<string> };
};

export type PartialTheme = NestedOptional<Theme>;

import type {
  fontFamilyTokens,
  fontHeightTokens,
  fontParagraphSpacingTokens,
  fontSizeTokens,
  fontSpacingTokens,
  fontWeightTokens,
} from "../../theme/tokens";

type FontFamily = (typeof fontFamilyTokens)[number];
type FontHeight = (typeof fontHeightTokens)[number];
type FontParagraphSpacing = (typeof fontParagraphSpacingTokens)[number];
type FontSize = (typeof fontSizeTokens)[number];
type FontSpacing = (typeof fontSpacingTokens)[number];
type FontWeight = (typeof fontWeightTokens)[number];

export type {
  FontSize,
  FontWeight,
  FontParagraphSpacing,
  FontSpacing,
  FontFamily,
  FontHeight,
};

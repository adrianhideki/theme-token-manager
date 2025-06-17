import { createContext } from "react";
import type { PartialTheme, ResultTheme } from "../../theme/types";

export type ThemeContextValues = {
  theme: ResultTheme;
  referenceTheme: PartialTheme;
  updateTheme: (value: PartialTheme) => void;
};

export const ThemeContext = createContext<ThemeContextValues | null>(null);

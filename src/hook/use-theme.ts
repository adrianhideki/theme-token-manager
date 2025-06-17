import { useContext } from "react";
import {
  ThemeContext,
  type ThemeContextValues,
} from "../context/theme-context";
import { defaultTheme } from "../theme/default";
import { transformTheme } from "../theme/utils";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return {
      theme: transformTheme(defaultTheme),
      referenceTheme: defaultTheme,
      updateTheme: () => {},
    } as ThemeContextValues;
  }

  return context;
};

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { ThemeContext } from "../../context/theme-context";
import { defaultTheme, type PartialTheme, type Theme } from "../../theme";
import { deepMerge, transformTheme, validateTheme } from "../../theme/utils";

type ThemeProviderProps = {
  theme?: PartialTheme;
};

const getTheme = (
  inputTheme: PartialTheme | undefined,
  defaultTheme: Theme
) => {
  const isInputValid = validateTheme(inputTheme as Theme).isValid;

  return isInputValid
    ? (inputTheme as Theme)
    : deepMerge<Theme>(defaultTheme, inputTheme as PartialTheme) ??
        defaultTheme;
};

const ThemeProvider = ({
  children,
  theme: inputTheme,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState<Theme>(getTheme(inputTheme, defaultTheme));

  const handleUpdateTheme = useCallback((value: PartialTheme) => {
    setTheme(value as Theme);
  }, []);

  useEffect(() => {
    if (inputTheme) {
      setTheme(getTheme(inputTheme, defaultTheme));
    }
  }, [inputTheme]);

  const transformedTheme = useMemo(() => transformTheme(theme), [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: transformedTheme,
        referenceTheme: theme,
        updateTheme: handleUpdateTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

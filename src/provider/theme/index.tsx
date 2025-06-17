import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { ThemeContext } from "../../context/theme-context";
import { defaultTheme, type PartialTheme, type Theme } from "../../theme";
import { deepMerge, transformTheme } from "../../theme/utils";

type ThemeProviderProps = {
  theme?: PartialTheme;
};

const ThemeProvider = ({
  children,
  theme: inputTheme,
}: PropsWithChildren<ThemeProviderProps>) => {
  const [theme, setTheme] = useState<Theme>(
    deepMerge<Theme>(defaultTheme, inputTheme ?? defaultTheme)
  );

  const handleUpdateTheme = useCallback((value: PartialTheme) => {
    setTheme(value as Theme);
  }, []);

  useEffect(() => {
    if (inputTheme) {
      setTheme(deepMerge<Theme>(defaultTheme, inputTheme));
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

import type { ResultTheme } from "../types";

const injectFontCss = (theme: ResultTheme) => {
  const vars: Record<string, string> = {};

  Object.entries(theme?.base?.font ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([prop, value]) => {
      vars[`--font-${key}-${prop}`] = value;
    });
  });

  Object.entries(theme?.font ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([prop, value]) => {
      vars[`--font-${key}-${prop}`] = value;
    });
  });

  return vars;
};

export default injectFontCss;

import type { ResultTheme } from "../types";

const injectFontCss = (theme: ResultTheme, prefix?: string) => {
  const vars: Record<string, string> = {};
  const userPrefix = prefix ? `${prefix}-` : "";

  Object.entries(theme?.base?.font ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([prop, value]) => {
      vars[`--${userPrefix}font-${key}-${prop}`] = value;
    });
  });

  Object.entries(theme?.font ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([prop, value]) => {
      vars[`--${userPrefix}font-${key}-${prop}`] = value;
    });
  });

  return vars;
};

export default injectFontCss;

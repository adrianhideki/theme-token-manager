import type { ResultTheme } from "../types";

const injectSpacingCss = (theme: ResultTheme, prefix?: string) => {
  const vars: Record<string, string | number> = {};
  const userPrefix = prefix ? `${prefix}-` : "";

  Object.entries(theme?.base?.size?.dimension ?? {}).forEach(([key, value]) => {
    vars[`--${userPrefix}size-${key}`] = value;
  });

  Object.entries(theme?.size?.border ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([prop, value]) => {
      vars[`--${userPrefix}size-border-${key}-${prop}`] = value;
    });
  });

  Object.entries(theme?.size?.spacing ?? {}).forEach(([key, value]) => {
    vars[`--${userPrefix}size-spacing-${key}`] = value;
  });

  return vars;
};

export default injectSpacingCss;

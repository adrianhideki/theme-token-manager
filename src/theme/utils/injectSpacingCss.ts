import type { ResultTheme } from "../types";

const injectSpacingCss = (theme: ResultTheme) => {
  const vars: Record<string, string | number> = {};

  Object.entries(theme?.base?.size?.dimension ?? {}).forEach(([key, value]) => {
    vars[`--size-${key}`] = value;
  });

  Object.entries(theme?.size?.border ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([prop, value]) => {
      vars[`--size-border-${key}-${prop}`] = value;
    });
  });

  Object.entries(theme?.size?.spacing ?? {}).forEach(([key, value]) => {
    vars[`--size-spacing-${key}`] = value;
  });

  return vars;
};

export default injectSpacingCss;

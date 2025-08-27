import type { ResultTheme } from "../types";

const injectColorCss = (theme: ResultTheme, mode: "light" | "dark", prefix?: string) => {
  const vars: Record<string, string> = {};
  const userPrefix = prefix ? `${prefix}-` : "";

  Object.entries(theme?.base?.color?.collection ?? {}).forEach(
    ([key, value]) => {
      Object.entries(value).forEach(([scale, color]) => {
        vars[`--${userPrefix}color-${key}-${scale}`] = color;
      });
    }
  );

  Object.entries(theme?.base?.color?.foundations ?? {}).forEach(
    ([key, value]) => {
      vars[`--${userPrefix}color-foundations-${key}`] = value;
    }
  );

  Object.entries(theme?.color ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([scale, color]) => {
      vars[`--${userPrefix}color-${key}-${scale}`] = color;
    });
  });

  Object.entries(theme?.palette?.[mode] ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([property, color]) => {
      vars[`--${userPrefix}color-${key}-${property}`] = color;
    });
  });

  return vars;
};

export default injectColorCss;

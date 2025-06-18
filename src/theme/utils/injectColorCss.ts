import type { ResultTheme } from "../types";

const injectColorCss = (theme: ResultTheme, mode: "light" | "dark") => {
  const vars: Record<string, string> = {};

  Object.entries(theme?.base?.color?.collection ?? {}).forEach(
    ([key, value]) => {
      Object.entries(value).forEach(([scale, color]) => {
        vars[`--color-${key}-${scale}`] = color;
      });
    }
  );

  Object.entries(theme?.base?.color?.foundations ?? {}).forEach(
    ([key, value]) => {
      vars[`--color-foundations-${key}`] = value;
    }
  );

  Object.entries(theme?.color ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([scale, color]) => {
      vars[`--color-${key}-${scale}`] = color;
    });
  });

  Object.entries(theme?.palette?.[mode] ?? {}).forEach(([key, value]) => {
    Object.entries(value).forEach(([property, color]) => {
      vars[`--color-${key}-${property}`] = color;
    });
  });

  return vars;
};

export default injectColorCss;

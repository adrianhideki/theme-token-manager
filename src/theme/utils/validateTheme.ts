import { defaultTheme } from "../default";
import type { Theme } from "../types";

/**
 * Validates that the theme object's color, font, size, and palette properties
 * reference valid keys and structures defined in the base property.
 * Returns an array of error messages, or an empty array if valid.
 */

const hasKey = (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

const validatePropertyValue = (
  object: object,
  possibleValues: Array<string>,
  errorCallback: (key: string, value: string) => string
) => {
  const errors: string[] = [];

  Object.entries(object || {}).forEach(([key, value]) => {
    if (typeof value === "string" && !possibleValues.some((v) => v === value)) {
      errors.push(errorCallback(key, value));
    }
  });

  return errors;
};

function validatePalette(
  colors: string[],
  palette: object,
  path: string[] = []
) {
  const errors: string[] = [];

  Object.entries(palette).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && "color" in value) {
      const colorRef = value.color as string;

      if (!colors.some((v) => v === colorRef)) {
        errors.push(
          `palette.${[...path, key].join(
            "."
          )}.color references unknown color "${colorRef}"`
        );
      }
    } else if (typeof value === "object" && value !== null) {
      validatePalette(colors, value, [...path, key]).forEach((e) =>
        errors.push(e)
      );
    }
  });

  return errors;
}

function findUndefinedProperties(
  refObj: Record<string, unknown>,
  obj: Record<string, unknown>,
  path: string[] = []
): string[] {
  const errors: string[] = [];
  if (refObj && typeof refObj === "object") {
    Object.keys(refObj).forEach((key) => {
      const currentPath = [...path, key];
      if (obj?.[key] === undefined) {
        errors.push(currentPath.join("."));
      } else if (typeof refObj?.[key] === "object" && refObj?.[key]) {
        errors.push(
          ...findUndefinedProperties(
            refObj?.[key] as Record<string, unknown>,
            obj?.[key] as Record<string, unknown>,
            currentPath
          )
        );
      }
    });
  }
  return errors;
}

export default function validateTheme(theme: Theme) {
  const errors: string[] = [];

  try {
    if (!theme) {
      throw "Empty object.";
    }

    findUndefinedProperties(defaultTheme, theme).forEach((field) =>
      errors.push(`${field} property is undefined`)
    );

    const colorCollection = Object.keys(theme?.base?.color?.collection || {});
    const colorFoundations = Object.keys(
      theme?.base?.color?.foundations || {}
    ).map((item) => `foundation.${item}`);
    const colorTheme = Object.keys(theme?.color || {});

    const allColors = [...colorCollection, ...colorFoundations, ...colorTheme];

    // Validate color keys
    if (theme?.color && theme.base?.color) {
      validatePropertyValue(
        theme.color,
        [...colorCollection, ...colorFoundations],
        (key, value) => `color.${key} references unknown color "${value}"`
      ).forEach((e) => errors.push(e));
    }

    if (theme.font && theme.base?.font) {
      validatePropertyValue(
        theme.font.family,
        Object.keys(theme.base.font.family || {}),
        (key, value) =>
          `font.family.${key} references unknown family "${value}"`
      ).forEach((e) => errors.push(e));
    }

    if (theme?.font && theme.base?.font) {
      validatePropertyValue(
        theme.font.size,
        Object.keys(theme.base.font.size || {}),
        (key, value) => `font.size.${key} references unknown size "${value}"`
      ).forEach((e) => errors.push(e));
    }

    if (theme?.font && theme.base?.font) {
      validatePropertyValue(
        theme.font.height,
        Object.keys(theme.base.font.height || {}),
        (key, value) =>
          `font.height.${key} references unknown height "${value}"`
      ).forEach((e) => errors.push(e));
    }

    if (theme?.font && theme.base?.font) {
      validatePropertyValue(
        theme.font.spacing,
        Object.keys(theme.base.font.spacing || {}),
        (key, value) =>
          `font.spacing.${key} references unknown spacing "${value}"`
      ).forEach((e) => errors.push(e));
    }

    if (theme?.size && theme.base?.size) {
      const dimensions = theme.base.size.dimension || {};

      Object.entries(theme.size.spacing || {}).forEach(([key, value]) => {
        if (typeof value === "string" && !hasKey(dimensions, value)) {
          errors.push(
            `size.spacing.${key} references unknown dimension "${value}"`
          );
        }
      });
    }

    if (theme.palette) {
      validatePalette(allColors, theme.palette).forEach((e) => errors.push(e));
    }

    return { isValid: errors.length === 0, errors };
  } catch (error) {
    if (error instanceof Error) {
      errors.push(error.message);
    }

    if (typeof error === "string") {
      errors.push(error);
    }

    return { isValid: false, errors: errors };
  }
}

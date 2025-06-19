import { describe, it, expect } from "vitest";
import validateTheme from "./validateTheme";
import type { BaseThemeConfig, NestedOptional, Theme } from "../types";

describe("validateTheme", () => {
  const baseTheme: BaseThemeConfig = {
    color: {
      collection: {
        black: { "100": "#000000" },
        blue: { "100": "#0000ff" },
      },
      foundations: {
        black: "#000000",
        white: "#ffffff",
      },
    },
    font: {
      family: {
        headline: "Inter",
        content: "Arial",
      },
      height: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        base: 10,
        "2xl": 22,
        "3xl": 24,
        "4xl": 26,
      },
      size: {
        xs: 8,
        sm: 10,
        md: 12,
        lg: 14,
        xl: 16,
        base: 14,
        "2xl": 22,
        "3xl": 28,
        "4xl": 32,
      },
      spacing: {
        base: 10,
        xs: 12,
        md: 14,
        lg: 16,
      },
      weight: {
        bold: 800,
        medium: 500,
        regular: 400,
        semiBold: 600,
      },
      paragraphSpacing: {
        base: 10,
      },
    },
    size: {
      dimension: {
        "0": 0,
        "25": 2,
        "50": 4,
        "100": 6,
        "150": 8,
        "200": 10,
        "300": 12,
        "400": 14,
        "500": 16,
        "600": 18,
        "700": 20,
        "800": 22,
        "900": 24,
        "1000": 26,
        "1100": 28,
        "1200": 30,
        "1300": 32,
        "1400": 34,
        "1500": 36,
        "1600": 38,
        "1700": 40,
        "1800": 42,
        "1900": 44,
      },
    },
  } as NestedOptional<BaseThemeConfig> as BaseThemeConfig;

  it("returns valid for a correct theme", () => {
    const theme: Theme = {
      id: "valid",
      name: "Valid Theme",
      base: baseTheme,
      color: {
        primary: "black",
        secondary: "blue",
      },
      font: {
        family: {
          h1: "headline",
        },
        height: {
          h1: "4xl",
          body: "sm",
        },
        size: {
          h1: "2xl",
          body: "sm",
        },
        spacing: {
          h1: "lg",
          body: "base",
        },
        weight: {
          h1: "bold",
          body: "regular",
        },
        paragraphSpacing: {
          h1: "base",
          body: "base",
        },
      },
      size: {
        border: {
          width: {},
          radius: {},
        },
        spacing: {
          xs: 100,
        },
      },
      palette: {
        light: {
          surface: {
            "primary-default": { color: "primary", scale: 100 },
          },
          text: {},
          icon: {},
          border: {},
        },
        dark: {
          surface: {
            "primary-default": { color: "primary", scale: 100 },
          },
          text: {},
          icon: {},
          border: {},
        },
      },
    } as NestedOptional<Theme> as Theme;

    const result = validateTheme(theme);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("returns error for unknown color in color property", () => {
    const theme = {
      base: baseTheme,
      color: {
        primary: "not-a-color",
      },
    } as NestedOptional<Theme> as Theme;

    const result = validateTheme(theme);

    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /color\.primary references unknown color "not-a-color"/
    );
  });

  it("returns error for unknown font family", () => {
    const theme = {
      ...({ base: baseTheme } as Theme),
      color: { primary: "black" },
      font: {
        family: { h1: "unknown" },
      },
    };

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.family\.h1 references unknown family "unknown"/
    );
  });

  it("returns error for unknown font size", () => {
    const theme = {
      ...({ base: baseTheme } as Theme),
      color: { primary: "black" },
      font: {
        size: { h1: "unknown" },
      },
    };

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.size\.h1 references unknown size "unknown"/
    );
  });

  it("returns error for unknown font height", () => {
    const theme = {
      ...({ base: baseTheme } as Theme),
      color: { primary: "black" },
      font: {
        height: { h1: "unknown" },
      },
    };

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.height\.h1 references unknown height "unknown"/
    );
  });

  it("returns error for unknown font spacing", () => {
    const theme = {
      ...({ base: baseTheme } as Theme),
      color: { primary: "black" },
      font: {
        spacing: { h1: "unknown" },
      },
    };

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.spacing\.h1 references unknown spacing "unknown"/
    );
  });

  it("returns error for unknown size.spacing dimension", () => {
    const theme: Theme = {
      base: baseTheme,
      color: { primary: "black" },
      size: {
        border: { width: {}, radius: {} },
        spacing: { xs: "not-a-dimension" },
      },
    } as unknown as Theme;

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /size\.spacing\.xs references unknown dimension "not-a-dimension"/
    );
  });

  it("returns error for unknown palette color reference", () => {
    const theme = {
      ...({ base: baseTheme } as Theme),
      color: { primary: "black" },
      palette: {
        light: {
          surface: {
            "primary-default": { color: "not-a-color", scale: 100 },
          },
        },
      },
    };

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /palette\.light\.surface\.primary-default\.color references unknown color "not-a-color"/
    );
  });

  it("returns invalid for empty object", () => {
    const result = validateTheme(undefined as unknown as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toBe("Empty object.");
  });
});

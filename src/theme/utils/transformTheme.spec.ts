import { describe, it, expect } from "vitest";
import transformTheme from "./transformTheme";
import type { PartialTheme, Theme } from "../types";
import deepMerge from "./deepMerge";

describe("transformTheme", () => {
  const theme: Theme = {
    id: "test-theme",
    name: "Test Theme",
    base: {
      color: {
        collection: {
          black: {
            "100": "#111111",
            "200": "#222222",
            "300": "#333333",
            "400": "#444444",
            "500": "#555555",
            "600": "#666666",
            "700": "#777777",
            "800": "#888888",
            "900": "#999999",
            "1000": "#aaaaaa",
            "1100": "#bbbbbb",
            "1200": "#cccccc",
          },
          blue: {
            "100": "#eaf6ff",
            "200": "#99d5ff",
            "300": "#66bfff",
            "400": "#33aaff",
            "500": "#0095ff",
            "600": "#0077cc",
            "700": "#005999",
            "800": "#003b66",
            "900": "#002233",
            "1000": "#00111a",
            "1100": "#000a0d",
            "1200": "#000508",
          },
        },
        foundations: {
          black: "#000000",
          white: "#ffffff",
        },
      },
      font: {
        family: {
          headline: "Montserrat",
          content: "Inter",
        },
        height: {
          "4xl": 72,
          "3xl": 56,
          "2xl": 44,
          xl: 36,
          lg: 28,
          md: 22,
          base: 18,
          sm: 16,
          xs: 14,
        },
        spacing: {
          lg: 2,
          md: 1,
          xs: 0,
          base: 0,
        },
        paragraphSpacing: {
          base: 20,
        },
        size: {
          "4xl": 72,
          "3xl": 56,
          "2xl": 44,
          xl: 36,
          lg: 28,
          md: 22,
          base: 18,
          sm: 16,
          xs: 14,
        },
        weight: {
          regular: 400,
          medium: 500,
          semiBold: 600,
          bold: 700,
        },
      },
      size: {
        dimension: {
          "0": 0,
          "25": 2,
          "50": 4,
          "100": 8,
          "150": 12,
          "200": 16,
          "300": 20,
          "400": 24,
          "500": 32,
          "600": 40,
          "700": 48,
          "800": 56,
          "900": 64,
          "1000": 80,
          "1100": 96,
          "1200": 112,
          "1300": 128,
          "1400": 144,
          "1500": 160,
          "1600": 192,
          "1700": 256,
          "1800": 384,
          "1900": 512,
        },
      },
    },
    color: {
      primary: "black",
      secondary: "blue",
      accent: "blue",
      error: "black",
      information: "blue",
      success: "blue",
      warning: "black",
      "neutral-dark": "black",
      "neutral-light": "blue",
    },
    font: {
      family: {
        body: "content",
        h1: "headline",
      },
      spacing: {
        body: "base",
        h1: "lg",
      },
      height: {
        body: "base",
        h1: "4xl",
      },
      size: {
        body: "base",
        h1: "4xl",
      },
      weight: {
        body: "regular",
        h1: "bold",
      },
      paragraphSpacing: {
        body: "base",
        h1: "base",
      },
    },
    size: {
      border: {
        width: {
          xs: 25,
          sm: 50,
        },
        radius: {
          none: 0,
          xs: 25,
        },
      },
      spacing: {
        xs: 50,
        sm: 100,
      },
    },
    palette: {
      dark: {
        surface: {
          "primary-default": { color: "primary", scale: 1000 },
          page: { color: "foundation.black" },
        },
        text: {
          "primary-onColor": { color: "secondary", scale: 100 },
        },
        icon: {
          "primary-onColor": { color: "accent", scale: 100 },
        },
        border: {
          "primary-default": { color: "primary", scale: 1000 },
        },
      },
      light: {
        surface: {
          "primary-default": { color: "primary", scale: 100 },
        },
        text: {
          "primary-onColor": { color: "secondary", scale: 100 },
        },
        icon: {
          "primary-onColor": { color: "accent", scale: 100 },
        },
        border: {
          "primary-default": { color: "primary", scale: 100 },
        },
      },
    },
  } as PartialTheme as Theme;

  it("should transform font tokens to resolved values", () => {
    const result = transformTheme(theme);
    expect(result.font.family.body).toBe("Inter");
    expect(result.font.family.h1).toBe("Montserrat");
    expect(result.font.size.body).toBe(18);
    expect(result.font.size.h1).toBe(72);
    expect(result.font.weight.body).toBe(400);
    expect(result.font.weight.h1).toBe(700);
  });

  it("should transform color tokens to resolved color scales", () => {
    const result = transformTheme(theme);
    expect(result.color.primary["100"]).toBe("#111111");
    expect(result.color.secondary["100"]).toBe("#eaf6ff");
  });

  it("should transform size tokens to resolved dimension values", () => {
    const result = transformTheme(theme);
    expect(result.size.border.width.xs).toBe(2);
    expect(result.size.border.width.sm).toBe(4);
    expect(result.size.border.radius.none).toBe(0);
    expect(result.size.border.radius.xs).toBe(2);
    expect(result.size.spacing.xs).toBe(4);
    expect(result.size.spacing.sm).toBe(8);
  });

  it("should transform palette tokens to resolved color values", () => {
    const result = transformTheme(theme);
    expect(result.palette.dark.surface["primary-default"]).toBe("#aaaaaa");
    expect(result.palette.dark.text["primary-onColor"]).toBe("#eaf6ff");
    expect(result.palette.dark.icon["primary-onColor"]).toBe("#eaf6ff");
    expect(result.palette.dark.border["primary-default"]).toBe("#aaaaaa");
    expect(result.palette.light.surface["primary-default"]).toBe("#111111");
    expect(result.palette.light.text["primary-onColor"]).toBe("#eaf6ff");
    expect(result.palette.light.icon["primary-onColor"]).toBe("#eaf6ff");
    expect(result.palette.light.border["primary-default"]).toBe("#111111");
  });

  it("should preserve id and name", () => {
    const result = transformTheme(theme);
    expect(result.id).toBe("test-theme");
    expect(result.name).toBe("Test Theme");
  });

  it("should throw when pass an invalid color", () => {
    const mockedTheme = deepMerge(theme, {
      palette: { dark: { surface: { pageAlternative: { color: "x" } } } },
    }) as Theme;

    expect(() => {
      transformTheme(mockedTheme);
    }).toThrow("Invalid color value x.");
  });

  it("should throw when pass an invalid color into theme selectors", () => {
    const mockedTheme = deepMerge(theme, {
      color: {
        primary: "x",
      },
    }) as Theme;

    expect(() => {
      transformTheme(mockedTheme);
    }).toThrow("Invalid color for primary");
  });

  it("should return a color from collection", () => {
    const mockedTheme = deepMerge(theme, {
      palette: {
        dark: { surface: { pageAlternative: { color: "black", scale: 100 } } },
      },
    }) as Theme;

    const result = transformTheme(mockedTheme);

    expect(result.palette.dark.surface.pageAlternative).toBe("#111111");
  });
});

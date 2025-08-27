import { it, expect, describe } from "vitest";
import injectColorCss from "./injectColorCss";
import type { NestedOptional, ResultTheme } from "../types";

describe("injectColorCss", () => {
  const mockTheme: ResultTheme = {
    base: {
      color: {
        collection: {
          black: { "100": "#111111", "200": "#222222" },
          blue: { "100": "#0000ff" },
        },
        foundations: {
          black: "#000000",
          white: "#ffffff",
        },
      },
    },
    color: {
      primary: { "100": "#111111" },
      secondary: { "100": "#0000ff" },
    },
    palette: {
      dark: {
        surface: {
          "primary-default": "#111111",
        },
        text: {
          "primary-onColor": "#ffffff",
        },
        icon: {
          "primary-onColor": "#333333",
        },
        border: {
          "primary-default": "#444444",
        },
      },
      light: {
        surface: {
          "primary-default": "#555555",
        },
        text: {
          "primary-onColor": "#666666",
        },
        icon: {
          "primary-onColor": "#777777",
        },
        border: {
          "primary-default": "#888888",
        },
      },
    },
  } as NestedOptional<ResultTheme> as ResultTheme;

  it("should generate correct CSS variables for base colors", () => {
    const vars = injectColorCss(mockTheme as ResultTheme, "dark");

    expect(vars).toMatchObject({
      "--color-black-100": mockTheme.base.color?.collection?.["black"][100],
      "--color-black-200": mockTheme.base.color?.collection?.["black"][200],
      "--color-blue-100": mockTheme.base.color?.collection?.["blue"][100],
      "--color-foundations-black": mockTheme.base.color?.foundations?.black,
      "--color-foundations-white": mockTheme.base.color?.foundations?.white,
    });
  });

  it("should generate correct CSS variables for color tokens dark mode", () => {
    const vars = injectColorCss(mockTheme, "dark");

    expect(vars).toMatchObject({
      "--color-surface-primary-default":
        mockTheme.palette?.dark?.surface?.["primary-default"],
      "--color-text-primary-onColor":
        mockTheme.palette?.dark?.text?.["primary-onColor"],
      "--color-icon-primary-onColor":
        mockTheme.palette?.dark?.icon?.["primary-onColor"],
      "--color-border-primary-default":
        mockTheme.palette?.dark?.border?.["primary-default"],
    });
  });

  it("should generate correct CSS variables for color tokens light mode", () => {
    const vars = injectColorCss(mockTheme, "light");

    expect(vars).toMatchObject({
      "--color-surface-primary-default":
        mockTheme.palette?.light?.surface?.["primary-default"],
      "--color-text-primary-onColor":
        mockTheme.palette?.light?.text?.["primary-onColor"],
      "--color-icon-primary-onColor":
        mockTheme.palette?.light?.icon?.["primary-onColor"],
      "--color-border-primary-default":
        mockTheme.palette?.light?.border?.["primary-default"],
    });
  });

  it("should not inject when the object is empty", () => {
    const vars = injectColorCss({} as ResultTheme, "light");

    expect(vars).toMatchObject({});
  });

  it("should generate variables with prefix", () => {
    const vars = injectColorCss(mockTheme as ResultTheme, "dark", "test");

    expect(vars).toMatchObject({
      "--test-color-black-100":
        mockTheme.base.color?.collection?.["black"][100],
      "--test-color-black-200":
        mockTheme.base.color?.collection?.["black"][200],
      "--test-color-blue-100": mockTheme.base.color?.collection?.["blue"][100],
      "--test-color-foundations-black":
        mockTheme.base.color?.foundations?.black,
      "--test-color-foundations-white":
        mockTheme.base.color?.foundations?.white,
    });
  });
});

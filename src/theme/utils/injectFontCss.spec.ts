import { describe, expect, it } from "vitest";
import injectFontCss from "./injectFontCss";
import { NestedOptional, ResultTheme } from "../types";

describe("injectFontCss", () => {
  const mockTheme: ResultTheme = {
    base: {
      font: {
        family: {
          content: "Inter",
        },
        height: {
          "2xl": 8,
        },
        size: {
          base: 14,
        },
        paragraphSpacing: {
          base: 12,
        },
        spacing: {
          xs: 10,
        },
        weight: {
          regular: 400,
        },
      },
    },
    font: {
      family: {
        body: "Inter",
      },
      height: {
        body: 8,
      },
      size: {
        body: 14,
      },
      paragraphSpacing: {
        body: 12,
      },
      spacing: {
        body: 10,
      },
      weight: {
        body: 400,
      },
    },
  } as NestedOptional<ResultTheme> as ResultTheme;

  it("should inject the correct variables for base font properties", () => {
    const vars = injectFontCss(mockTheme);

    expect(vars).toMatchObject({
      "--font-family-content": mockTheme?.base?.font?.family?.content,
      "--font-height-2xl": mockTheme?.base?.font?.height?.["2xl"],
      "--font-size-base": mockTheme?.base?.font?.size?.base,
      "--font-paragraphSpacing-base":
        mockTheme?.base?.font?.paragraphSpacing?.base,
      "--font-spacing-xs": mockTheme?.base?.font?.spacing?.xs,
      "--font-weight-regular": mockTheme?.base?.font?.weight?.regular,
    });
  });

  it("should inject the correct variables for theme font properties", () => {
    const vars = injectFontCss(mockTheme);

    expect(vars).toMatchObject({
      "--font-family-body": mockTheme?.font?.family?.body,
      "--font-height-body": mockTheme?.font?.height?.body,
      "--font-weight-body": mockTheme?.font?.weight?.body,
      "--font-size-body": mockTheme?.font?.size?.body,
      "--font-paragraphSpacing-body": mockTheme?.font?.paragraphSpacing?.body,
      "--font-spacing-body": mockTheme?.font?.spacing?.body,
    });
  });

  it("should inject variables with prefix", () => {
    const vars = injectFontCss(mockTheme, "test");

    expect(vars).toMatchObject({
      "--test-font-family-body": mockTheme?.font?.family?.body,
      "--test-font-height-body": mockTheme?.font?.height?.body,
      "--test-font-weight-body": mockTheme?.font?.weight?.body,
      "--test-font-size-body": mockTheme?.font?.size?.body,
      "--test-font-paragraphSpacing-body": mockTheme?.font?.paragraphSpacing?.body,
      "--test-font-spacing-body": mockTheme?.font?.spacing?.body,
    });
  });

  it("should not inject when the object is empty", () => {
    const vars = injectFontCss({} as ResultTheme);

    expect(vars).toMatchObject({});
  });
});

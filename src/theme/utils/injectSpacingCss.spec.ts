import { describe, it, expect } from "vitest";
import injectSpacingCss from "./injectSpacingCss";
import type { ResultTheme } from "../types";

describe("injectSpacingCss", () => {
  const mockTheme = {
    base: {
      size: {
        dimension: {
          "0": 0,
          "25": 2,
          "50": 4,
          "100": 8,
        },
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
  } as unknown as ResultTheme;

  it("should inject CSS variables for base size dimensions", () => {
    const vars = injectSpacingCss(mockTheme);
    expect(vars).toMatchObject({
      "--size-0": mockTheme.base?.size?.dimension?.[0],
      "--size-25": mockTheme.base?.size?.dimension?.[25],
      "--size-50": mockTheme.base?.size?.dimension?.[50],
      "--size-100": mockTheme.base?.size?.dimension?.[100],
    });
  });

  it("should inject CSS variables for border width and radius", () => {
    const vars = injectSpacingCss(mockTheme);
    expect(vars).toMatchObject({
      "--size-border-width-xs": mockTheme.size?.border?.width?.xs,
      "--size-border-width-sm": mockTheme.size?.border?.width?.sm,
      "--size-border-radius-none": mockTheme.size?.border?.radius?.none,
      "--size-border-radius-xs": mockTheme.size?.border?.radius?.xs,
    });
  });

  it("should inject CSS variables for spacing", () => {
    const vars = injectSpacingCss(mockTheme);
    expect(vars).toMatchObject({
      "--size-spacing-xs": mockTheme.size?.spacing?.xs,
      "--size-spacing-sm": mockTheme.size?.spacing?.sm,
    });
  });

  it("should inject CSS variables with prefix", () => {
    const vars = injectSpacingCss(mockTheme, "test");
    expect(vars).toMatchObject({
      "--test-size-spacing-xs": mockTheme.size?.spacing?.xs,
      "--test-size-spacing-sm": mockTheme.size?.spacing?.sm,
    });
  });

  it("should not inject when the object is empty", () => {
    const vars = injectSpacingCss({} as ResultTheme);

    expect(vars).toMatchObject({});
  });
});

import { describe, it, expect } from "vitest";
import validateTheme from "./validateTheme";
import type { Theme } from "../types";
import { defaultTheme } from "../default";
import deepMerge from "./deepMerge";

describe("validateTheme", () => {
  const sut = {
    id: "valid",
    name: "Valid Theme",
    base: defaultTheme.base,
    color: defaultTheme.color,
    font: defaultTheme.font,
    size: defaultTheme.size,
    palette: defaultTheme.palette,
  };

  it("returns valid for a correct theme", () => {
    const result = validateTheme(sut);

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual([]);
  });

  it("returns error for unknown color in color property", () => {
    const theme = deepMerge(sut, {
      color: {
        primary: "not-a-color",
      },
    });

    const result = validateTheme(theme as Theme);

    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /color\.primary references unknown color "not-a-color"/
    );
  });

  it("returns error for unknown font family", () => {
    const theme = deepMerge(sut, {
      font: {
        family: { h1: "unknown" },
      },
    });

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.family\.h1 references unknown family "unknown"/
    );
  });

  it("returns error for unknown font size", () => {
    const theme = deepMerge(sut, {
      font: {
        size: { h1: "unknown" },
      },
    });

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.size\.h1 references unknown size "unknown"/
    );
  });

  it("returns error for unknown font height", () => {
    const theme = deepMerge(sut, {
      font: {
        height: { h1: "unknown" },
      },
    });

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.height\.h1 references unknown height "unknown"/
    );
  });

  it("returns error for unknown font spacing", () => {
    const theme = deepMerge(sut, {
      font: {
        spacing: { h1: "unknown" },
      },
    });

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /font\.spacing\.h1 references unknown spacing "unknown"/
    );
  });

  it("returns error for unknown size.spacing dimension", () => {
    const theme = deepMerge(sut, {
      size: {
        spacing: { xs: "not-a-dimension" },
      },
    });

    const result = validateTheme(theme as Theme);
    expect(result.isValid).toBe(false);
    expect(result.errors[0]).toMatch(
      /size\.spacing\.xs references unknown dimension "not-a-dimension"/
    );
  });

  it("returns error for unknown palette color reference", () => {
    const theme = deepMerge(sut, {
      palette: {
        light: {
          surface: {
            "primary-default": { color: "not-a-color", scale: 100 },
          },
        },
      },
    });

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

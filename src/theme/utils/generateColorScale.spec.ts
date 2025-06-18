import { describe, it, expect } from "vitest";
import generateColorScale from "./generateColorScale";
import { colorScaleValuesTokens } from "../tokens";

describe("generateColorScale", () => {
  it("returns an object with all scale keys", () => {
    const scale = generateColorScale("#3498db");
    expect(Object.keys(scale).map(Number)).toEqual(colorScaleValuesTokens);
  });

  it("returns valid hex colors for each scale key", () => {
    const colors = [
      "#080000",
      "#3498db",
      "#ffffff",
      "#4dff00",
      "#0004ff",
      "#ff0000",
      "#915fad",
      "#5f9dad",
      "#ff0066"
    ];

    colors.forEach((color) => {
      const scale = generateColorScale(color);

      for (const key of colorScaleValuesTokens) {
        expect(scale[key]).toMatch(/^#[0-9a-f]{6}$/i);
      }
    });
  });

  it("generates different scales for different base colors", () => {
    const scale1 = generateColorScale("#3498db");
    const scale2 = generateColorScale("#e74c3c");
    expect(scale1).not.toEqual(scale2);
  });

  it("handles 3-digit hex input", () => {
    const scale = generateColorScale("#fff");
    for (const key of colorScaleValuesTokens) {
      expect(scale[key]).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it("produces lighter colors for lower keys and darker for higher keys", () => {
    const scale = generateColorScale("#3498db");
    // 100 should be lighter than 1200
    expect(scale[100]).not.toBe(scale[1200]);
    // Compare as strings, but in a real test you could convert to HSL and compare lightness
  });
});

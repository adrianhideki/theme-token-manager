import { describe, it, expect } from "vitest";
import getContrastColor from "./getContrastColor";

describe("getContrastColor", () => {
  it("returns #000000 for light backgrounds", () => {
    expect(getContrastColor("#ffffff")).toBe("#000000");
    expect(getContrastColor("#f0f0f0")).toBe("#000000");
  });

  it("returns #ffffff for dark backgrounds", () => {
    expect(getContrastColor("#000000")).toBe("#ffffff");
    expect(getContrastColor("#222")).toBe("#ffffff");
  });

  it("handles 3-digit hex", () => {
    expect(getContrastColor("#fff")).toBe("#000000");
    expect(getContrastColor("#000")).toBe("#ffffff");
  });

  it("returns #000000 for invalid hex", () => {
    expect(getContrastColor("not-a-color")).toBe("#000000");
  });
});

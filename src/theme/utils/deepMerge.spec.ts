import { describe, it, expect } from "vitest";
import deepMerge from "./deepMerge";
import { defaultTheme } from "../default";
import { PartialTheme } from "../types";

describe("deepMerge", () => {
  it("merges two flat objects", () => {
    const a = { foo: 1, bar: 2 };
    const b = { bar: 3, baz: 4 };
    expect(deepMerge(a, b)).toEqual({ foo: 1, bar: 3, baz: 4 });
  });

  it("merges nested objects recursively", () => {
    const a = { foo: { x: 1, y: 2 }, bar: 5 };
    const b = { foo: { y: 3, z: 4 }, baz: 6, y: { b: "a" } };
    expect(deepMerge(a, b)).toEqual({
      foo: { x: 1, y: 3, z: 4 },
      bar: 5,
      baz: 6,
      y: { b: "a" },
    });
  });

  it("replaces arrays instead of merging them", () => {
    const a = { arr: [1, 2, 3], foo: 1 };
    const b = { arr: [4, 5] };
    expect(deepMerge(a, b)).toEqual({ arr: [4, 5], foo: 1 });
  });

  it("overwrites primitive values with objects", () => {
    const a = { foo: 1 };
    const b = { foo: { bar: 2 } };
    expect(deepMerge(a, b)).toEqual({ foo: { bar: 2 } });
  });

  it("overwrites objects with primitive values", () => {
    const a = { foo: { bar: 2 } };
    const b = { foo: 1 };
    expect(deepMerge(a, b)).toEqual({ foo: 1 });
  });

  it("does not mutate the original objects", () => {
    const a = { foo: 1 };
    const b = { bar: 2 };
    const result = deepMerge(a, b);
    expect(result).not.toBe(a);
    expect(result).not.toBe(b);
    expect(a).toEqual({ foo: 1 });
    expect(b).toEqual({ bar: 2 });
  });

  it("handles empty source object", () => {
    const a = { foo: 1 };
    const b = {};
    expect(deepMerge(a, b)).toEqual({ foo: 1 });
  });

  it("handles empty target object", () => {
    const a = {};
    const b = { foo: 1 };
    expect(deepMerge(a, b)).toEqual({ foo: 1 });
  });

  it("handles non-object values in source", () => {
    const a = { foo: 1 };
    const b = { foo: null, bar: undefined };
    expect(deepMerge(a, b)).toEqual({ foo: null, bar: undefined });
  });

  it("merges deeply nested objects", () => {
    const a = { a: { b: { c: 1 } } };
    const b = { a: { b: { d: 2 } } };
    expect(deepMerge(a, b)).toEqual({ a: { b: { c: 1, d: 2 } } });
  });

  it("not merge values", () => {
    const a = "a";
    const b = "b";

    expect(
      deepMerge(
        a as unknown as Record<string, unknown>,
        b as unknown as Record<string, unknown>
      )
    ).toEqual("a");
  });

  it("merge default theme", () => {
    const a = defaultTheme;
    const b: PartialTheme = {
      palette: {
        dark: {
          surface: {
            "primary-default": {
              color: "secondary",
              scale: 900,
            },
          },
        },
      },
    };

    expect(
      deepMerge<PartialTheme>(a, b).palette?.dark?.surface?.["primary-default"]
    ).toEqual({
      color: "secondary",
      scale: 900,
    });

    expect(
      deepMerge<PartialTheme>(a, b).palette?.dark?.surface?.[
        "secondary-default"
      ]
    ).toEqual(defaultTheme?.palette?.dark?.surface?.["secondary-default"]);
  });
});

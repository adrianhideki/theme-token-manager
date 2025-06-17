import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import getIsDarkMode from "./getIsDarkMode";

const localstorageMock = (mockedValue?: string): Storage => {
  return {
    getItem: () => (mockedValue ? mockedValue : null),
    length: 1,
    clear: () => {},
    key: () => "",
    removeItem: () => {},
    setItem: () => {},
  };
};

describe("getIsDarkMode", () => {
  const originalMatchMedia = window.matchMedia;
  const originalGetItem = window.localStorage.getItem;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    window.localStorage.getItem = originalGetItem;
  });

  it("returns true if localStorage mode is 'dark'", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    window.localStorage = localstorageMock("dark");

    expect(getIsDarkMode()).toBe(true);
  });

  it("returns false if localStorage mode is 'light'", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    window.localStorage = localstorageMock();

    expect(getIsDarkMode()).toBe(false);
  });

  it("returns true if no mode in localStorage and matchMedia matches dark", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    window.localStorage = localstorageMock();

    expect(getIsDarkMode()).toBe(true);
  });

  it("returns false if no mode in localStorage and matchMedia does not match dark", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    window.localStorage = localstorageMock();

    expect(getIsDarkMode()).toBe(false);
  });
});

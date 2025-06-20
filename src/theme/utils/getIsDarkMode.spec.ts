import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import getIsDarkMode from "./getIsDarkMode";

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
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockImplementation(() => "dark");

    window.matchMedia = vi.fn().mockReturnValue({ matches: false });

    const result = getIsDarkMode();

    expect(result).toBe(true);
    expect(getItemSpy).toBeCalledWith("mode");
  });

  it("returns false if localStorage mode is 'light'", () => {
    const getItemSpy = vi.spyOn(Storage.prototype, "getItem");
    getItemSpy.mockImplementation(() => "light");

    window.matchMedia = vi.fn().mockReturnValue({ matches: false });

    expect(getIsDarkMode()).toBe(false);
  });

  it("returns true if no mode in localStorage and matchMedia matches dark", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    expect(getIsDarkMode()).toBe(true);
  });

  it("returns false if no mode in localStorage and matchMedia does not match dark", () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: false });
    expect(getIsDarkMode()).toBe(false);
  });
});

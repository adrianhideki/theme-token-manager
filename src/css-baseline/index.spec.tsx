import "./styles.css";
import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import ThemeProvider from "../provider/theme";
import CssBaseline from ".";
import { deepMerge } from "../theme/utils";
import { defaultTheme, Theme } from "../theme";

const PrimaryBackground = () => {
  return (
    <div data-testid="primary" className="bg-surface-primary-default">
      primary
    </div>
  );
};

const theme = deepMerge(defaultTheme, {
  base: {
    color: {
      collection: {
        test: {
          "100": "#6600ff",
          "200": "#000000",
          "300": "#000000",
          "400": "#000000",
          "500": "#000000",
          "600": "#000000",
          "700": "#000000",
          "800": "#000000",
          "900": "#000000",
          "1000": "#000000",
          "1100": "#000000",
          "1200": "#000000",
        },
      },
    },
  },
  color: {
    primary: "test",
  },
  palette: {
    light: {
      surface: {
        "primary-default": {
          color: "primary",
          scale: 100,
        },
      },
    },
  },
});

describe("Css Baseline", () => {
  it("should have the correct CSS variable", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline data-testid="css-container" mode="light"></CssBaseline>
      </ThemeProvider>
    );

    const el = getByTestId("css-container");
    const style = getComputedStyle(el.element());

    expect(style.getPropertyValue("--color-surface-primary-default")).toBe(
      "#6600ff"
    );
  });

  it("should have the correct background color using css class", async () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline mode="light">
          <PrimaryBackground />
        </CssBaseline>
      </ThemeProvider>
    );

    const el = getByTestId("primary");
    const style = getComputedStyle(el.element());

    expect(style.backgroundColor).toBe("rgb(102, 0, 255)");
  });

  it("should should inject variable with a prefix", () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme as Theme}>
        <CssBaseline
          data-testid="css-container"
          mode="light"
          prefix="test"
        ></CssBaseline>
      </ThemeProvider>
    );

    const el = getByTestId("css-container");
    const style = getComputedStyle(el.element());

    expect(style.getPropertyValue("--test-color-surface-primary-default")).toBe(
      "#6600ff"
    );
  });
});

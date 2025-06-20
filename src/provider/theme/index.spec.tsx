import ThemeProvider from ".";
import { describe, it, expect } from "vitest";
import { render } from "vitest-browser-react";
import { useTheme } from "../../hook/use-theme";
import { defaultTheme } from "../../theme";

const ThemeValues = () => {
  const { theme } = useTheme();
  return (
    <div>
      <div>name: {theme.name}</div>
      <div>content:</div>
      <div>{JSON.stringify(theme)}</div>
    </div>
  );
};

const UpdateThemeButton = () => {
  const { referenceTheme, updateTheme } = useTheme();

  const handleButtonClick = () => {
    updateTheme({
      ...referenceTheme,
      name: "new name",
    });
  };

  return <button onClick={handleButtonClick}>update theme</button>;
};

describe("Theme Provider", () => {
  it("should render with a partial theme", async () => {
    const { getByText } = render(
      <ThemeProvider
        theme={{
          name: "static",
          base: {
            color: {
              collection: {
                gray: {
                  "100": "#f1f1f1",
                },
              },
            },
          },
          color: {
            primary: "gray",
          },
        }}
      >
        <ThemeValues />
      </ThemeProvider>
    );

    await expect.element(getByText("name: static")).toBeInTheDocument();
  });

  it("should render the default theme when not provide a input theme", async () => {
    const { getByText } = render(
      <ThemeProvider>
        <ThemeValues />
      </ThemeProvider>
    );

    await expect.element(getByText("name: default")).toBeInTheDocument();
  });

  it("should not merge when pass a valid theme", async () => {
    const { getByText } = render(
      <ThemeProvider theme={{ ...defaultTheme, name: "valid" }}>
        <ThemeValues />
      </ThemeProvider>
    );

    await expect.element(getByText("name: valid")).toBeInTheDocument();
  });

  it("should update the theme properties", async () => {
    const { getByText } = render(
      <ThemeProvider theme={{ ...defaultTheme, name: "valid" }}>
        <ThemeValues />
        <UpdateThemeButton />
      </ThemeProvider>
    );

    await getByText("update theme", { exact: true }).click();
    await expect.element(getByText("name: new name")).toBeInTheDocument();
  });
});

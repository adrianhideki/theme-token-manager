import { describe, it, expect, vi, afterEach } from "vitest";
import { render } from "vitest-browser-react";
import { defaultTheme } from "../../theme";
import ThemeCollectionProvider from ".";
import { useThemeCollection } from "../../hook/use-theme-collection";
import { deepMerge } from "../../theme/utils";

const CollectionValues = () => {
  const { currentTheme, themes } = useThemeCollection();

  return (
    <div>
      <div>Current theme: {currentTheme}</div>
      <div>Name: {themes.find((t) => t.id === currentTheme)?.name ?? ""}</div>
      <div>Count: {themes.length}</div>
    </div>
  );
};

const UpdateCurrentThemeButton = ({ value }: { value: string }) => {
  const { updateCurrentTheme } = useThemeCollection();

  const handleButtonClick = () => {
    updateCurrentTheme(value);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Update current theme</button>
    </div>
  );
};

const DeleteCurrentThemeButton = ({ value }: { value: string }) => {
  const { deleteTheme } = useThemeCollection();

  const handleButtonClick = () => {
    deleteTheme(value);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Delete theme</button>
    </div>
  );
};

const AddThemeButton = () => {
  const { addTheme } = useThemeCollection();

  const handleButtonClick = () => {
    addTheme({ ...defaultTheme, name: "new-theme", id: "new-theme" });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Add theme</button>
    </div>
  );
};

const UpdateThemeButton = () => {
  const { updateTheme } = useThemeCollection();

  const handleButtonClick = () => {
    updateTheme({ ...defaultTheme, name: "new name" });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Update theme</button>
    </div>
  );
};

describe("Theme Collection Provider", () => {
  afterEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
  });

  it("should load the theme from local storage", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    getItem.mockImplementation((key: string) => {
      if (key === "themes") {
        return JSON.stringify([defaultTheme]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
      </ThemeCollectionProvider>
    );

    await expect(
      getByText(`Current theme: ${defaultTheme.id}`)
    ).toBeInTheDocument();
    await expect(getItem).toBeCalledWith("currentTheme");
    await expect(getItem).toBeCalledWith("themes");
  });

  it("should update storage when change current theme", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    getItem.mockImplementation((key: string) => {
      if (key === "themes") {
        return JSON.stringify([
          defaultTheme,
          { ...defaultTheme, id: "theme2", name: "theme2" },
        ]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
        <UpdateCurrentThemeButton value="theme2" />
      </ThemeCollectionProvider>
    );

    await getByText("Update current theme", { exact: true }).click();
    await expect(getByText(`Current theme: theme2`)).toBeInTheDocument();
    await expect(setItem).toBeCalledWith("currentTheme", "theme2");
  });

  it("should not update the theme when the current id doesn't exists", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    getItem.mockImplementation((key: string) => {
      if (key === "themes") {
        return JSON.stringify([defaultTheme]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
        <UpdateCurrentThemeButton value="invalid_theme" />
      </ThemeCollectionProvider>
    );

    await getByText("Update current theme", { exact: true }).click();
    await expect(getByText(`Current theme: invalid_theme`)).toBeInTheDocument();
  });

  it("should remove a theme from collection and change to available theme", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");
    const setItem = vi.spyOn(Storage.prototype, "setItem");

    getItem.mockImplementationOnce((key: string) => {
      if (key === "themes") {
        return JSON.stringify([
          defaultTheme,
          { ...defaultTheme, id: "theme2", name: "theme2" },
        ]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
        <DeleteCurrentThemeButton value="theme2" />
      </ThemeCollectionProvider>
    );

    await getByText("Delete theme", { exact: true }).click();
    await expect(getByText("Current theme: default")).toBeInTheDocument();
    await expect(getByText("Count: 1")).toBeInTheDocument();
    await expect(setItem).toBeCalledWith("currentTheme", "default");
  });

  it("should remove a theme from collection and not change the theme when the collection is empty", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    getItem.mockImplementationOnce((key: string) => {
      if (key === "themes") {
        return JSON.stringify([defaultTheme]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
        <DeleteCurrentThemeButton value="default" />
      </ThemeCollectionProvider>
    );

    await getByText("Delete theme", { exact: true }).click();
    await expect(getByText("Current theme: default")).toBeInTheDocument();
    await expect(getByText("Count: 0")).toBeInTheDocument();
  });

  it("should add a theme to collection", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    getItem.mockImplementationOnce((key: string) => {
      if (key === "themes") {
        return JSON.stringify([defaultTheme]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
        <AddThemeButton />
      </ThemeCollectionProvider>
    );

    await getByText("Add theme", { exact: true }).click();
    await expect(getByText("Count: 2")).toBeInTheDocument();
  });

  it("should update a theme property from collection", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    getItem.mockImplementationOnce((key: string) => {
      if (key === "themes") {
        return JSON.stringify([
          defaultTheme,
          { ...defaultTheme, id: "theme2", name: "theme2" },
        ]);
      }

      return defaultTheme.id ?? null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider>
        <CollectionValues />
        <UpdateThemeButton />
      </ThemeCollectionProvider>
    );

    await getByText("Update theme", { exact: true }).click();
    await expect(getByText("Name: new name")).toBeInTheDocument();
  });

  it("should merge default theme when receive a incomplete theme", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    vi.mock("../../theme/utils/deepMerge.ts", {
      spy: true,
    });

    getItem.mockImplementationOnce((key: string) => {
      if (key === "themes") {
        return null;
      }

      return null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider defaultTheme={{ name: "input theme" }}>
        <CollectionValues />
      </ThemeCollectionProvider>
    );

    expect(getByText("Current theme: default")).toBeInTheDocument();
    expect(getByText("Name: input theme")).toBeInTheDocument();
    expect(deepMerge).toHaveBeenCalledOnce();
  });

  it("should not merge default theme when receive a complete theme", async () => {
    const getItem = vi.spyOn(Storage.prototype, "getItem");

    vi.mock("../../theme/utils/deepMerge.ts", {
      spy: true,
    });

    getItem.mockImplementationOnce((key: string) => {
      if (key === "themes") {
        return null;
      }

      return null;
    });

    const { getByText } = render(
      <ThemeCollectionProvider
        defaultTheme={{ ...defaultTheme, id: "1", name: "complete theme" }}
      >
        <CollectionValues />
      </ThemeCollectionProvider>
    );

    expect(getByText("Current theme: 1")).toBeInTheDocument();
    expect(getByText("Name: complete theme")).toBeInTheDocument();
    expect(deepMerge).toHaveBeenCalledTimes(0);
  });

  it("should throw when calling the context outside provider", async () => {
    const renderWithError = () => render(<CollectionValues />);

    expect(renderWithError).toThrowError("Invalid context");
  });
});

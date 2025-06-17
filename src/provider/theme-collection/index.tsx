import {
  useCallback,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { ThemeCollectionContext } from "../../context/theme-collection";
import { useTheme } from "../../hook/use-theme";
import type { Theme } from "../../theme/types";

const ThemeCollectionProvider = ({ children }: PropsWithChildren) => {
  const { updateTheme, referenceTheme } = useTheme();
  const [themes, setThemes] = useState(
    localStorage.getItem("themes")
      ? (JSON.parse(localStorage.getItem("themes")!) as Theme[])
      : [{ ...(referenceTheme as Theme), id: "default", name: "default" }]
  );
  const [currentTheme, setCurrentTheme] = useState(
    String(localStorage.getItem("currentTheme") ?? themes[0].id)
  );

  useEffect(() => {
    const theme = themes.find((theme) => theme.id === currentTheme);

    if (theme) {
      updateTheme(theme);
    }
  }, [themes, updateTheme, currentTheme]);

  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem("currentTheme", String(currentTheme));
  }, [currentTheme]);

  const handleAddTheme = useCallback(
    (theme: Theme) => setThemes((prev) => [...prev, theme]),
    []
  );

  const handleDelete = useCallback(
    (id: string) => {
      setThemes((prev) => [...prev.filter((t) => t.id !== id)]);

      const theme = themes.find((t) => t.id !== id);

      if (theme) {
        setCurrentTheme(theme.id!);
      }
    },
    [themes]
  );

  const handleUpdate = useCallback(
    (theme: Theme) => {
      setThemes((prev) =>
        prev.map((item) => {
          if (item.id === theme.id) {
            return theme;
          }

          return item;
        })
      );

      updateTheme(theme);
    },
    [updateTheme]
  );

  const handleUpdateCurrentTheme = useCallback(
    (id: string) => {
      setCurrentTheme(id);
    },
    [setCurrentTheme]
  );

  return (
    <ThemeCollectionContext.Provider
      value={{
        themes,
        addTheme: handleAddTheme,
        updateCurrentTheme: handleUpdateCurrentTheme,
        deleteTheme: handleDelete,
        updateTheme: handleUpdate,
        currentTheme,
      }}
    >
      {children}
    </ThemeCollectionContext.Provider>
  );
};

export default ThemeCollectionProvider;

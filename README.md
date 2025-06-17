# 🎨 theme-token-manager

A theme token manager for React that uses tokens to style and theme applications.  
Try the [demo](https://react-theme.hydk.com.br/).

---

## Installation

```sh
npm install theme-token-manager
```

or

```sh
yarn add theme-token-manager
```

---

## Usage

### 1. Provide a Theme

Wrap your app with [`ThemeProvider`](src/provider/theme/index.tsx):

```tsx
import { ThemeProvider, defaultTheme } from "theme-token-manager";

<ThemeProvider theme={defaultTheme}>
  <App />
</ThemeProvider>;
```

You can also provide your own theme object (see [`Theme`](src/theme/types.ts)).

### 2. Access Theme in Components

Use the [`useTheme`](src/hook/use-theme.ts) hook to access the current theme:

```tsx
import { useTheme } from "theme-token-manager";

const MyComponent = () => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        backgroundColor: theme.palette.light.surface["primary-default"],
      }}
    >
      {/* ... */}
    </div>
  );
};
```

## CSS Variables and Baseline

To inject CSS variables and baseline styles, use [`CssBaseline`](src/css-baseline/index.tsx):

```tsx
import { CssBaseline } from "theme-token-manager";

<CssBaseline mode="light">
  <App />
</CssBaseline>;
```

This will inject CSS variables based on your theme.  
See [src/css-baseline/styles.css](src/css-baseline/styles.css) for available classes.

---

## Multiple Themes

To manage multiple themes, use the [`ThemeCollectionProvider`](src/provider/theme-collection/index.tsx):

```tsx
import { ThemeCollectionProvider } from "theme-token-manager";

<ThemeCollectionProvider themes={[theme1, theme2]}>
  <App />
</ThemeCollectionProvider>;
```

---

## API Reference

- [`ThemeProvider`](src/provider/theme/index.tsx): Provides a theme context.
- [`useTheme`](src/hook/use-theme.ts): Access the current theme.
- [`CssBaseline`](src/css-baseline/index.tsx): Injects CSS variables and baseline styles.
- [`ThemeCollectionProvider`](src/provider/theme-collection/index.tsx): Manage multiple themes.
- [`defaultTheme`](src/theme/default/index.ts): The default theme object.
- [`Theme`](src/theme/types.ts): Type definition for a theme.

---

## Contributing

Contributions are welcome! Please open issues or pull requests on [GitHub](https://github.com/adrianhideki/theme-token-manager).

---

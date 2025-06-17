import { useMemo, type HTMLAttributes, type PropsWithChildren } from "react";
import { useTheme } from "../hook/use-theme";
import "./styles.css";
import {
  injectColorCss,
  injectFontCss,
  injectSpacingCss,
} from "../theme/utils";

type CssBaselineProps = {
  mode: "light" | "dark";
} & HTMLAttributes<HTMLDivElement>;

const CssBaseline = ({
  children,
  mode,
  style,
  ...props
}: PropsWithChildren<CssBaselineProps>) => {
  const { theme } = useTheme();

  const colorCss = useMemo(() => injectColorCss(theme, mode), [theme, mode]);
  const fontCss = useMemo(() => injectFontCss(theme), [theme]);
  const spacingCss = useMemo(() => injectSpacingCss(theme), [theme]);

  return (
    <div
      style={{
        ...colorCss,
        ...fontCss,
        ...spacingCss,
        width: "100%",
        minHeight: "100vh",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default CssBaseline;

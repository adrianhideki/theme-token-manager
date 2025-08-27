import { useMemo, type HTMLAttributes, type PropsWithChildren } from "react";
import { useTheme } from "../hook/use-theme";
import {
  injectColorCss,
  injectFontCss,
  injectSpacingCss,
} from "../theme/utils";

type CssBaselineProps = {
  mode: "light" | "dark";
  prefix?: string;
} & HTMLAttributes<HTMLDivElement>;

const CssBaseline = ({
  children,
  mode,
  style,
  prefix,
  ...props
}: PropsWithChildren<CssBaselineProps>) => {
  const { theme } = useTheme();

  const colorCss = useMemo(
    () => injectColorCss(theme, mode, prefix),
    [theme, mode, prefix]
  );
  const fontCss = useMemo(() => injectFontCss(theme, prefix), [theme, prefix]);
  const spacingCss = useMemo(
    () => injectSpacingCss(theme, prefix),
    [theme, prefix]
  );

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

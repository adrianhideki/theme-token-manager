const getIsDarkMode = () => {
  const mode = localStorage.getItem("mode");

  if (mode) {
    return mode === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export default getIsDarkMode;

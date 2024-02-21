import React, {
  useContext,
  useCallback,
  useEffect,
  createContext,
} from "react";
import { StatusBar, useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { usePersistedState } from "../hooks/usePersistedState";
import { darkColors } from "../styles/colors";
import { lightColors } from "../styles/colors";

interface ThemeControllerContext {
  toggleTheme: (theme?: string) => unknown;
  currentThemeName: "light" | "dark" | string;
}

const ThemeControllerContext = createContext<ThemeControllerContext>(
  {} as ThemeControllerContext
);

const ThemeControllerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme, themeFetched] = usePersistedState<typeof lightColors>(
    "@Odin:theme",
    defaultTheme === "light" ? lightColors : darkColors
  );
  const toggleTheme = useCallback(
    (themeName = "") => {
      if (themeName) {
        if (themeName !== theme.title) {
          setTheme(themeName === "light" ? lightColors : darkColors);
        }
        return;
      }

      setTheme(theme.title === "light" ? darkColors : lightColors);
    },
    [theme, theme.title]
  );

  useEffect(() => {
    setTheme((old) => (old.title === "light" ? lightColors : darkColors));
  }, [themeFetched]);

  useEffect(() => {
    if (defaultTheme !== theme.title) {
      setTheme(defaultTheme === "light" ? lightColors : darkColors);
    }
  }, [defaultTheme]);

  useEffect(() => {
    StatusBar.setBarStyle(
      theme.title === "light" ? "dark-content" : "light-content"
    );
    StatusBar.setBackgroundColor(theme.colors.background);
  }, [theme]);

  return (
    <ThemeControllerContext.Provider
      value={{ toggleTheme, currentThemeName: theme.title }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

const useThemeController = () => {
  const themeControllerContext = useContext(ThemeControllerContext);

  return themeControllerContext;
};

export { ThemeControllerProvider, useThemeController };

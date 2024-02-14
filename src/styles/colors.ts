import { darken, lighten } from "polished"

export const darkColors = {
  title: "dark",
  colors: {
    black: "#fff",
    white: "#000",
    background: "#0b0c1e",
    gray: "#aaa",
    shape: lighten(0.1, "#0b0c1e"),
    primary: "#5773ff"
  }
}

export const lightColors = {
  title: "light",
  colors: {
    black: "#000",
    white: "#fff",
    background: "#e9e9e9",
    gray: "#444",
    shape: darken(0.1, "#e9e9e9"),
    primary: "#5773ff"
  }
}
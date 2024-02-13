import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    title: string;
    colors: {
      black: string;
      white: string;
      background: string;
    };
  }
}
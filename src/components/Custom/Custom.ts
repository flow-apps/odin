import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";

interface ITitleProps {
  fontSize: string;
  fontFamily?: string;
  color?: string;
  margin?: string;
  padding?: string;
  align?: string;
}

export const Title = styled.Text<ITitleProps>`
  font-size: ${(props) => props.fontSize};
  font-family: ${(props) => props.fontFamily || fonts.bold};
  color: ${(props) => props.color || props.theme.colors.black};
  margin: ${(props) => props.margin || "0px"};
  padding: ${(props) => props.padding || "0px"};
  text-align: ${(props) => props.align || "left"};
`;

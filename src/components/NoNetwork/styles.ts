import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { AnimationContainer } from "../Loading/styles";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").height}px;
  background: ${props => props.theme.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Animation = styled(AnimationContainer)``;

export const MainMessage = styled.Text`
  font-size: 25px;
  font-family: ${fonts.semiBold};
  color: ${props => props.theme.colors.gray};
  text-align: center;
  margin-top: 5px;
`;

export const Message = styled.Text`
  text-align: center;
  font-size: 20px;
  font-family: ${fonts.text};
`;

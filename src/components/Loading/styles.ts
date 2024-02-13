import { Dimensions } from "react-native";
import styled from "styled-components/native";
import Lottie from "lottie-react-native";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.background};
  padding: 12px;
`;

export const AnimationContainer = styled(Lottie)`
  width: 350px;
  height: 350px;
`;

export const MessageText = styled.Text`
  font-family: ${fonts.semiBold};
  font-size: 22px;
  color: ${props => props.theme.colors.gray};
  text-align: center;
`;

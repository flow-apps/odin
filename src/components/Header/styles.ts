import { Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";

export const Container = styled.SafeAreaView`
  width: ${Dimensions.get("screen").width}px;
  height: 70px;
  background: ${(props) => props.theme.colors.background};
  padding: 10px;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.bold};
  font-size: 20px;
`;
export const Button = styled(RectButton)``;

export const HeaderContent = styled.View`
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: flex-end;
`;

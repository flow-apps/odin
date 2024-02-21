import styled from "styled-components/native";
import { fonts } from "../../../styles/fonts";

export const Container = styled.View`
  flex-direction: row;
`;

export const RadioButtonWrapper = styled.TouchableOpacity`
  padding: 5px 0px;
  background-color: ${(props) => props.theme.colors.shape};
  width: 60px;
`;

export const RadioLabel = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.semiBold};
  font-size: 15px;
  text-align: center;
`;

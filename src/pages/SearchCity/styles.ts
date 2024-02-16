import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";

interface IButtonText {
  color?: string;
}

export const Container = styled.View`
  width: ${Dimensions.get("screen").width}px;
  height: ${Dimensions.get("screen").height}px;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.background};
`;

export const SearchContainer = styled.View`
  width: ${Dimensions.get("screen").width - 20}px;
  border-radius: 20px;
  padding: 12px;
  `;

export const Label = styled.Text`
  font-size: 18px;
  font-family: ${fonts.text};
  margin-bottom: 5px;
  color: ${props => props.theme.colors.black};
`;

export const InputContainer = styled.View`
  width: 100%;
  padding: 10px;
  margin: 10px 0px;
`;

export const Input = styled.TextInput`
  color: #444;
  background-color: #fff;
  border: 1px solid #5773ff;
  border-radius: 12px;
  font-size: 18px;
  font-family: ${fonts.text};
  width: 100%;
  padding: 16px;
  text-align: center;
`;

export const Button = styled(TouchableOpacity)`
  padding: 20px;
  text-align: center;
  background: #5773ff;
  color: #fff;
  margin-top: 15px;
  border-radius: 12px;
`;

export const FormContainer = styled.View`
  margin-top: 10px;
`;

export const ButtonText = styled.Text<IButtonText>`
  text-align: center;
  color: ${(props) => props.color || "#fff"};
  font-size: 18px;
  font-family: Raleway-SemiBold;
`;

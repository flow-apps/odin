import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";

export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px 15px;
`;

export const ConfigsTitle = styled.Text`
  font-size: 30px;
  font-family: ${fonts.bold};
  color: ${(props) => props.theme.colors.black};
  margin-top: 50px;
  margin-bottom: 30px;
`;

export const ConfigsContainer = styled.View`
  margin-top: 30px;
`

export const ConfigWrapper = styled.View`
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: space-between;
`

export const ConfigLabel = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${props => props.theme.colors.black};
`

export const ConfigInputContainer = styled.View``

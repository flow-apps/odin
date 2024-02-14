import LottieView from "lottie-react-native";
import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
`;

export const AnimationContainer = styled.View`
  width: 100%;
  height: 250px;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
`;

export const Animation = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

export const GetPermissionTitle = styled.Text`
  font-family: ${fonts.semiBold};
  font-size: 25px;
  color: ${props => props.theme.colors.black};
  text-align: center;
  margin-top: 25px;
`

export const GetPermissionDesc = styled.Text`
  font-family: ${fonts.text};
  font-size: 18px;
  color: ${props => props.theme.colors.black};
  text-align: center;
  margin-top: 5px;
`

export const GetPermissionButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 50px;
  margin-left: 15px;
  align-items: center;
  justify-content: center;
`;

export const GetPermissionButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.primary};
  padding: 10px 20px;
  border-radius: 8px;
`;

export const GetPermissionButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 20px;
`;

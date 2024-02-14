import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";
import FastImage from "react-native-fast-image";
import LottieView from "lottie-react-native";

export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.background};
`;

export const CurrentForecastContainer = styled.View`
  margin-top: 50px;
`;

export const CurrentForecastTitle = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 16px;
  margin-bottom: -10px;
`;

export const CurrentForecastCountryTitle = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.text};
`;

export const CurrentForecastImageContainer = styled.View`
  width: 100%;
  height: 250px;
  align-items: center;
  justify-content: center;
  margin: 30px 0px;
`;

export const CurrentForecastImage = styled(LottieView)`
  width: 100%;
  height: 100%;
`;

export const CurrentForecastTemperatureContainer = styled.View``;

export const CurrentForecastTemperatureText = styled.Text`
  color: ${(props) => props.theme.colors.black};
  text-align: center;
  font-size: 45px;
  font-family: ${fonts.bold};
`;

export const TextSup = styled.Text``;

export const CurrentForecastInfoContainer = styled.View``;

export const CurrentForecastInfoText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  font-size: 18px;
  font-family: ${fonts.text};
`

export const CurrentForecastExtrasContainer = styled.View``;

export const CurrentForecastExtraWrapper = styled.View``

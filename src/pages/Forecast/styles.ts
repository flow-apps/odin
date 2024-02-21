import styled from "styled-components/native";
import { fonts } from "../../styles/fonts";
import LottieView from "lottie-react-native";

export const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.colors.background};
`;

export const ShowCurrentLocationButton = styled.TouchableOpacity``;

export const ShowCurrentLocationText = styled.Text`
  margin-bottom: -10px;
  text-align: center;
  margin-top: 15px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${fonts.text};
  font-size: 18px;
`;

export const CurrentForecastContainer = styled.View`
  margin-top: 50px;
`;

export const CurrentForecastTitle = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-family: ${fonts.bold};
  text-align: center;
  font-size: 18px;
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

export const CurrentForecastFeelsLikeContainer = styled.View``;

export const CurrentForecastFeelsLikeText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.gray};
  font-family: ${fonts.text};
  margin-bottom: 15px;
`;

export const TextSup = styled.Text``;

export const CurrentForecastInfoContainer = styled.View``;

export const CurrentForecastInfoText = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  font-size: 18px;
  font-family: ${fonts.semiBold};
`;

export const CurrentForecastExtrasContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 45px 0px;
`;

export const CurrentForecastExtraWrapper = styled.View`
  align-items: center;
`;

export const CurrentForecastExtraText = styled.Text`
  color: ${(props) => props.theme.colors.black};
  font-size: 18px;
  font-family: ${fonts.text};
  margin-top: 10px;
`;

export const ForecastHourByHourContainer = styled.ScrollView`
  margin-bottom: 35px;
`;

export const ForecastHourByHourTitle = styled.Text`
  font-family: ${fonts.semiBold};
  font-size: 22px;
  color: ${(props) => props.theme.colors.black};
  margin-bottom: 20px;
  margin-left: 12px;
`;

export const ForecastExtraInfosContainer = styled(
  ForecastHourByHourContainer
)``;

export const ForecastExtraInfosTitle = styled(ForecastHourByHourTitle)``;

export const ForecastExtraInfoCard = styled.View`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.shape};
  padding: 12px;
  margin-right: 10px;
`;

export const ForecastExtraInfoWrapper = styled.View`
  justify-content: center;
  flex: 1;
`;

export const ForecastExtraInfoIcon = styled.View``;

export const ForecastExtraInfoTitle = styled.Text`
  font-size: 16px;
  font-family: ${fonts.text};
  color: ${(props) => props.theme.colors.gray};
`;

export const ForecastExtraInfoValue = styled.Text`
  font-size: 24px;
  font-family: ${fonts.bold};
  color: ${(props) => props.theme.colors.black};
`;

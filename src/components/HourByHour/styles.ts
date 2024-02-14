import styled from "styled-components/native";
import LottieView from "lottie-react-native";
import { fonts } from "../../styles/fonts";
import { darken, lighten } from "polished";

export const HourByHourChanceRain = styled.Text`
  text-align: center;
  font-family: ${fonts.semiBold};
  font-size: 12px;
  color: #5773ff;
  margin-top: 6px;
`;

export const HourByHourCard = styled.View`
  margin-right: 15px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.shape};
`;

export const HourByHourIcon = styled(LottieView)`
  width: 75px;
  height: 75px;
  margin: 10px auto;
`;

export const HourByHourTemperature = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: ${fonts.semiBold};
  color: ${(props) => props.theme.colors.black};
  margin-top: 5px;
`;

export const HourByHourTime = styled.Text`
  text-align: center;
  color: ${(props) => props.theme.colors.black};
  font-size: 12px;
  font-family: ${fonts.text};
  margin-bottom: 10px;
`;

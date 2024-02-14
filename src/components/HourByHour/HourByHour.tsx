import { format, getHours, isBefore, isTomorrow, parseISO } from "date-fns";
import React, { memo, useRef } from "react";
import Feather from "react-native-vector-icons/Feather";
import {
  HourByHourCard,
  HourByHourChanceRain,
  HourByHourIcon,
  HourByHourTemperature,
  HourByHourTime,
} from "./styles";
import { getWeatherAnimation } from "../../utils/icon";
import LottieView from "lottie-react-native";

interface IHourByHour {
  fore: any;
  date: string;
}

const HourByHour = ({ fore, date }: IHourByHour) => {
  const animationRef = useRef<LottieView>(null);
  const isValidHour =
    !isTomorrow(parseISO(date)) &&
    !isBefore(parseISO(fore.time), new Date()) &&
    getHours(parseISO(fore.time)) !== new Date().getHours();
  const isNight =
    parseISO(fore.time).getHours() < 6 && parseISO(fore.time).getHours() >= 18;

  if (!isValidHour || !fore) return null;

  const handleStopAnimationOnLastFrame = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  return (
    <HourByHourCard>
      <HourByHourIcon
        ref={animationRef}
        source={getWeatherAnimation(fore.condition.code, isNight)}
        autoPlay
        loop={false}
        onAnimationFinish={handleStopAnimationOnLastFrame}
        speed={0.2}
      />
      <HourByHourTime>{format(parseISO(fore.time), "HH:mm")}</HourByHourTime>
      <HourByHourTemperature>{Math.round(fore.temp_c)}°C</HourByHourTemperature>
      <HourByHourChanceRain>
        <Feather name="cloud-rain" size={18} /> {fore.chance_of_rain}%
      </HourByHourChanceRain>
    </HourByHourCard>
  );
};

export default HourByHour;

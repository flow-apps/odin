import { format, getHours, isBefore, isTomorrow, parseISO } from "date-fns";
import React, { useRef } from "react";
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
import { getTemperatureUnit } from "../../utils/unit";
import { useConfigs } from "../../contexts/configs";
import { TemperatureConfigUnit } from "../../contexts/configs/types";

interface IHourByHour {
  fore: any;
  date: string;
}

const HourByHour = ({ fore, date }: IHourByHour) => {
  const { userConfigs } = useConfigs();
  const animationRef = useRef<LottieView>(null);
  const isValidHour =
    !isTomorrow(parseISO(date)) &&
    !isBefore(parseISO(fore.time), new Date()) &&
    getHours(parseISO(fore.time)) !== new Date().getHours();
  const hours = new Date(fore.time).getHours();
  const isDayTime = hours > 6 && hours < 18;

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
        source={getWeatherAnimation(fore.condition.code, !isDayTime)}
        autoPlay
        loop={false}
        onAnimationFinish={handleStopAnimationOnLastFrame}
        speed={0.2}
      />
      <HourByHourTime>{format(parseISO(fore.time), "HH:mm")}</HourByHourTime>
      <HourByHourTemperature>
        {Math.round(
          getTemperatureUnit(userConfigs) === TemperatureConfigUnit.CELSIUS
            ? fore.temp_c
            : fore.temp_f
        )}
        {getTemperatureUnit(userConfigs) === TemperatureConfigUnit.CELSIUS
          ? "°C"
          : "°F"}
      </HourByHourTemperature>
      <HourByHourChanceRain>
        <Feather name="cloud-rain" size={18} /> {fore.chance_of_rain}%
      </HourByHourChanceRain>
    </HourByHourCard>
  );
};

export default HourByHour;

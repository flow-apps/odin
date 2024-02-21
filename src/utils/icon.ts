const cloudy = [1006, 1009];
const mist = [1030, 1135, 1147];
const rain = [1063, 1150, 1153, 1180, 1183, 1195, 1189, 1186, 1243, 1246, 1240];
const storm = [1192, 1273, 1276, 1087];
const snow = [
  1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282, 1117,
];
const sleet = [
  1204, 1207, 1237, 1249, 1252, 1261, 1264, 1069, 1072, 1168, 1171, 1198, 1201,
];

import sunnyIcon from "../animations/weather/sunny.json";
import moonIcon from "../animations/weather/sunny.json";
import cloudyIcon from "../animations/weather/cloudy.json";
import partlyCloudyDayIcon from "../animations/weather/partly-cloudy-day.json";
import partlyCloudyNightIcon from "../animations/weather/partly-cloudy-night.json";
import mistIcon from "../animations/weather/mist.json";
import rainIcon from "../animations/weather/rain.json";
import stormIcon from "../animations/weather/storm.json";
import snowIcon from "../animations/weather/snow.json";
import sleetIcon from "../animations/weather/sleet.json";

export const getWeatherAnimation = (iconCode: number, isNight: boolean) => {
  if (iconCode === 1000) {
    if (isNight) {
      return moonIcon;
    }
    return sunnyIcon;
  }

  if (iconCode === 1003) {
    if (isNight) {
      return partlyCloudyNightIcon;
    }
    return partlyCloudyDayIcon;
  }

  if (cloudy.includes(iconCode)) {
    return cloudyIcon;
  }

  if (mist.includes(iconCode)) {
    return mistIcon;
  }

  if (rain.includes(iconCode)) {
    return rainIcon;
  }

  if (storm.includes(iconCode)) {
    return stormIcon;
  }

  if (snow.includes(iconCode)) {
    return snowIcon;
  }

  if (sleet.includes(iconCode)) {
    return sleetIcon;
  }

  return "";
};

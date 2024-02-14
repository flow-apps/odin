const cloudy = [1006, 1009];
const mist = [1030, 1135, 1147];
const rain = [1063, 1150, 1153, 1180, 1183, 1195, 1189, 1186, 1243, 1246, 1240];
const storm = [1192, 1273, 1276, 1087];
const snow = [
  1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282, 1117,
];
const sleet = [
  1204, 1207, 1237, 1249, 1252, 1261, 1264, 1069, 1072, 1168, 1171, 1198, 1201
];

export const getWeatherAnimation = (iconCode: number, isNight: boolean) => {


  if (iconCode === 1000) {
    if (isNight) {
      return require("../animations/weather/moon.json");
    }
    return require("../animations/weather/sunny.json");
  }

  if (iconCode === 1003) {
    if (isNight) {
      return require("../animations/weather/partly-cloudy-night.json");
    }
    return require("../animations/weather/partly-cloudy-day.json");
  }

  if (cloudy.includes(iconCode)) {
    return require("../animations/weather/cloudy.json");
  }

  if (mist.includes(iconCode)) {
    return require("../animations/weather/mist.json");
  }

  if (rain.includes(iconCode)) {
    return require("../animations/weather/rain.json");
  }

  if (storm.includes(iconCode)) {
    return require("../animations/weather/storm.json");
  }

  if (snow.includes(iconCode)) {
    return require("../animations/weather/snow.json");
  }

  if (sleet.includes(iconCode)) {
    return require("../animations/weather/sleet.json");
  }

  return "";
};

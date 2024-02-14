/* 
  1000 = Ensolarado / Céu limpo
  1003 = Parcialmente nublado
  1006/1009 = Nublado
  1030/1135/1147 = Névoa
  1063/1150/1153/1180/1183/1195/1189/1186/1243/1246 = Chuva Fraca
  1192/1195/1273/1276 = Chuva forte
  1066/1114/1210/1213/1216/1219/1222/1225/1255/1258/1279/1282 = Neve
  1204/1207/1237/1249/1252/1261/1264/ = Granizo
*/

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

  if ([1006, 1009].includes(iconCode)) {
    return require("../animations/weather/cloudy.json");
  }

  if ([1030, 1135, 1147].includes(iconCode)) {
    return require("../animations/weather/mist.json");
  }

  if (
    [1063, 1150, 1153, 1180, 1183, 1195, 1189, 1186, 1243, 1246].includes(
      iconCode
    )
  ) {
    return require("../animations/weather/rain.json");
  }

  if ([1192, 1195, 1273, 1276].includes(iconCode)) {
    return require("../animations/weather/storm.json");
  }

  if (
    [
      1066, 1114, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1279, 1282,
    ].includes(iconCode)
  ) {
    return require("../animations/weather/snow.json");
  }

  if ([1204, 1207, 1237, 1249, 1252, 1261, 1264].includes(iconCode)) {
    return require("../animations/weather/sleet.json");
  }
};

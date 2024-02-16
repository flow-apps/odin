import { SpeedConfigUnit, TemperatureConfigUnit, UserConfigs } from "../contexts/configs/types";
import { getLocales } from 'expo-localization';

const { temperatureUnit, measurementSystem } = getLocales()[0]

export const getTemperatureUnit = (userConfig: UserConfigs) => {
  if (userConfig.temperatureUnit === TemperatureConfigUnit.AUTO) {
    if (temperatureUnit === "celsius") {
      return TemperatureConfigUnit.CELSIUS
    } else {
      return TemperatureConfigUnit.FAHRENHEIT
    }
  }

  return userConfig.temperatureUnit
}

export const getSpeedUnit = (userConfig: UserConfigs) => {
  if (userConfig.speedUnit === SpeedConfigUnit.AUTO) {
    if (measurementSystem === "us") {
      return SpeedConfigUnit.MILE
    } else {
      return SpeedConfigUnit.KM
    }
  }

  return userConfig.speedUnit
}

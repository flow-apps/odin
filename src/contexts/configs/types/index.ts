export enum TemperatureConfigUnit {
  AUTO = 0,
  CELSIUS = 1,
  FAHRENHEIT = 2,
}

export enum SpeedConfigUnit {
  AUTO = 0,
  KM = 1,
  MILE = 2,
}

export enum ForecastNotify {
  NO = 0,
  YES = 1,
}

export interface UserConfigs {
  speedUnit: SpeedConfigUnit;
  temperatureUnit: TemperatureConfigUnit;
  forecastNotify: ForecastNotify;
}

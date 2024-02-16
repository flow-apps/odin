export enum TemperatureConfigMetrics {
  AUTO = 0,
  CELSIUS = 1,
  FAHRENHEIT = 2,
}

export enum SpeedConfigMetrics {
  AUTO = 0,
  KM = 1,
  MILE = 2,
}

export interface UserConfigs {
  speedMetric: SpeedConfigMetrics;
  temperatureMetric: TemperatureConfigMetrics;
}

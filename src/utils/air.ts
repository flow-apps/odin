export enum AirType {
  CO = "CO",
  NO2 = "NO2",
  O3 = "O3",
  SO2 = "SO2",
  PM10 = "PM10",
  PM25 = "PM2.5"
}

export const airQualityColorSelect = (airType: AirType, amount: number) => {
  switch (airType) {
    case AirType.CO:
      if (amount <= 600) {
        return "#1dbb08"
      } else if (amount > 600 && amount <= 1500) {
        return "#fcca27"
      } else {
        return "#f00000"
      }
    case AirType.NO2:
      if (amount <= 200) {
        return "#1dbb08"
      } else if (amount > 200 && amount <= 320) {
        return "#fcca27"
      } else {
        return "#f00000"
      }
    default:
      break;
  }
}
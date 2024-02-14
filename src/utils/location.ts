import { PERMISSIONS } from "react-native-permissions"
import { checkPermission } from "./permissions"
import GetLocation from "react-native-get-location";

export const getCoordinates = async () => {
  const { granted } = await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

  if (granted) {
    const { latitude, longitude } = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000
    })

    return {
      lat: latitude,
      lng: longitude
    }
  }
}
import { TestIds } from "react-native-google-mobile-ads";
import { BANNER_ID, INTERSTITIAL_ID } from "../secrets";

enum AdTypes {
  BANNER = "BANNER",
  INTERSTITIAL = "INTERSTITIAL",
}

function GetAdId(adType: AdTypes): string {
  if (__DEV__) {
    return TestIds[adType];
  }

  if (adType === AdTypes.BANNER) {
    return BANNER_ID;
  } else if (adType === AdTypes.INTERSTITIAL) {
    return INTERSTITIAL_ID;
  }

  return TestIds[adType];
}

export { GetAdId, AdTypes };

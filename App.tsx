import storage from "@react-native-async-storage/async-storage";
import admob from "react-native-google-mobile-ads";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import OnBoarding from "./src/components/OnBoarding/OnBoarding";
import AppRoutes from "./src/routes";
import * as RNLocalize from "react-native-localize";
import RNRestart from "react-native-restart";
import { setI18nConfig } from "./src/translations/index";
import { ThemeControllerProvider } from "./src/contexts/theme";
import {
  Cabin_400Regular,
  Cabin_600SemiBold,
  Cabin_700Bold,
  useFonts
} from "@expo-google-fonts/cabin";
import { ConfigsControllerProvider } from "./src/contexts/configs";
import {
  reloadAsync,
  fetchUpdateAsync,
  checkForUpdateAsync,
} from "expo-updates";

import * as Constants from "expo-constants";

SplashScreen.show();

export default function App() {
  const [showBoarding, setShowBoarding] = useState<boolean>();
  const [readyApp, setReadyApp] = useState(false);
  const [fontsLoaded] = useFonts({
    Cabin_400Regular,
    Cabin_600SemiBold,
    Cabin_700Bold,
  });

  const handleUpdateLocale = () => {
    setI18nConfig();
    RNLocalize.addEventListener("change", () => RNRestart.restart());
  };

  const handleDone = async () => {
    await storage.setItem(
      "@Odin:ShowBoarding",
      JSON.stringify({ show: false })
    );
    return setShowBoarding(false);
  };

  useEffect(() => {
    setI18nConfig();
    handleUpdateLocale();

    admob().setRequestConfiguration({
      tagForChildDirectedTreatment: false,
    });

    storage.getItem("@Odin:ShowBoarding", (err, result) => {
      if (err) {
        return setShowBoarding(true);
      }
      const boarding = JSON.parse(result);

      if (!boarding) {
        return setShowBoarding(true);
      }
      setShowBoarding(boarding.show);
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (__DEV__ || Constants.default.debugMode) {
        setReadyApp(true);
        return;
      }

      const { isAvailable } = await checkForUpdateAsync()
        .then((result) => result)
        .catch(() => {
          return { isAvailable: false };
        });

      if (isAvailable) {
        await fetchUpdateAsync().then(async (value) => {
          if (value.isNew) {
            await reloadAsync();
            return;
          } else {
            setReadyApp(true);
          }
        });
      } else {
        setReadyApp(true);
      }
    })();
  }, []);


  if (fontsLoaded && readyApp) {
    SplashScreen.hide();
  }

  return (
    <ThemeControllerProvider>
      <ConfigsControllerProvider>
        {showBoarding ? (
          <OnBoarding done={handleDone} skip={handleDone} />
        ) : (
          <AppRoutes />
        )}
      </ConfigsControllerProvider>
    </ThemeControllerProvider>
  );
}

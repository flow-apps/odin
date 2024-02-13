import storage from "@react-native-async-storage/async-storage";
import admob, { MaxAdContentRating } from "react-native-google-mobile-ads";
import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import SplashScreen from "react-native-splash-screen";
import OnBoarding from "./src/components/OnBoarding/OnBoarding";
import AppRoutes from "./src/routes";
import * as RNLocalize from "react-native-localize";
import RNRestart from "react-native-restart";
import { setI18nConfig } from "./src/translations/index";
import { ThemeControllerProvider } from "./src/contexts/theme";
import { useFonts } from "expo-font";
import {
  Cabin_400Regular,
  Cabin_600SemiBold,
  Cabin_700Bold
} from "@expo-google-fonts/cabin"

SplashScreen.show();

export default function App() {
  const [showBoarding, setShowBoarding] = useState<boolean>();
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
    await storage.setItem("@ShowBoarding", JSON.stringify({ show: false }));
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

  if (fontsLoaded) {
    SplashScreen.hide();
  }

  if (showBoarding) {
    return <OnBoarding done={handleDone} skip={handleDone} />;
  }

  return (
    <ThemeControllerProvider>
      <AppRoutes />
    </ThemeControllerProvider>
  );
}

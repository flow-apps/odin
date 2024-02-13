import { API_KEY } from "../../secrets";
import {
  AdEventType,
  InterstitialAd,
} from "react-native-google-mobile-ads";
import { useNavigation, useRoute } from "@react-navigation/core";
import React, { memo, useEffect, useState } from "react";
import { Alert } from "react-native";
import Loading from "../../components/Loading/Loading";
import api from "../../services/api";
import { IForecast } from "../../ts/interfaces/IForecast";
import { AdTypes, GetAdId } from "../../utils/ads";
import { Container } from "./styles";
import { translate } from "../../translations";
import I18n from "i18n-js";

const Forecast: React.FC = () => {
  const [showedAd, setShowedAd] = useState(false);
  const [forecast, setForecast] = useState<IForecast>();

  const route = useRoute();
  const navigation = useNavigation<any>();
  const { city } = route.params as { city: string };
  const interstitial = InterstitialAd.createForAdRequest(
    GetAdId(AdTypes.INTERSTITIAL)
  );

  
  useEffect(() => {
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      if (!showedAd) {
        interstitial.show({
          immersiveModeEnabled: true,
        });
      }
  
      return setShowedAd(true);
    });
    api.get(
        `/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=yes&alerts=no&lang=${I18n.currentLocale()}`
      )
      .then((response) => {
        interstitial.load();
        setForecast(response.data);
      })
      .catch((err) => {
        Alert.alert(
          translate("forecast.alerts.cityNotFound.title"),
          translate("forecast.alerts.cityNotFound.content", { city })
        );
        console.log("Erro ao buscar cidade -----> ", err);
        
        return navigation.navigate("Home");
      });
  }, []);

  if (!forecast) {
    return (
      <Loading
        message={translate("loadings.getCityForecast", { city })}
        showInterstitialAd
      />
    );
  }

  return (
    <Container>
      
    </Container>
  );
};

export default memo(Forecast);

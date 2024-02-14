import React, { useEffect, useState } from "react";
import Feather from "react-native-vector-icons/Feather";
import Loading from "../../components/Loading/Loading";
import I18n from "i18n-js";
import api from "../../services/api";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";
import { useNavigation, useRoute } from "@react-navigation/core";
import { API_KEY } from "../../secrets";
import { Alert, StyleSheet } from "react-native";
import { IForecast } from "../../ts/interfaces/IForecast";
import { AdTypes, GetAdId } from "../../utils/ads";
import { translate } from "../../translations";
import { getWeatherAnimation } from "../../utils/icon";
import { BlurView } from "@react-native-community/blur";
import { useTheme } from "styled-components";
import {
  Container,
  CurrentForecastContainer,
  CurrentForecastCountryTitle,
  CurrentForecastExtraText,
  CurrentForecastExtraWrapper,
  CurrentForecastExtrasContainer,
  CurrentForecastImage,
  CurrentForecastImageContainer,
  CurrentForecastInfoContainer,
  CurrentForecastInfoText,
  CurrentForecastTemperatureContainer,
  CurrentForecastTemperatureText,
  CurrentForecastTitle,
  TextSup,
} from "./styles";

const Forecast: React.FC = () => {
  const [showedAd, setShowedAd] = useState(false);
  const [forecast, setForecast] = useState<IForecast>();

  const route = useRoute();
  const navigation = useNavigation<any>();
  const { title } = useTheme();

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
    api
      .get(
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
      <BlurView
        blurType={title === "light" ? "light" : "dark"}
        blurAmount={5}
        style={StyleSheet.absoluteFillObject}
      />
      <CurrentForecastContainer>
        <CurrentForecastTitle>
          {forecast.location.name}
          <CurrentForecastCountryTitle>
            , {forecast.location.country}
          </CurrentForecastCountryTitle>
        </CurrentForecastTitle>
        <CurrentForecastImageContainer>
          <CurrentForecastImage
            source={getWeatherAnimation(
              forecast.current.condition.code,
              !Boolean(forecast.current.is_day)
            )}
            resizeMode="contain"
            autoPlay
            speed={0.4}
          />
        </CurrentForecastImageContainer>
      </CurrentForecastContainer>
      <CurrentForecastTemperatureContainer>
        <CurrentForecastTemperatureText>
          {Math.round(forecast.current.temp_c)}
          <TextSup>°</TextSup> C
        </CurrentForecastTemperatureText>
      </CurrentForecastTemperatureContainer>
      <CurrentForecastInfoContainer>
        <CurrentForecastInfoText>
          {forecast.current.condition.text}
        </CurrentForecastInfoText>
      </CurrentForecastInfoContainer>
      <CurrentForecastExtrasContainer>
        <CurrentForecastExtraWrapper>
          <CurrentForecastExtraText>
            <Feather name="wind" size={18} />{" "}
            {Math.round(forecast.current.wind_kph)} Km/h
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <CurrentForecastExtraText>
            <Feather name="droplet" size={18} /> {forecast.current.humidity}%
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <CurrentForecastExtraText>
            <Feather name="sun" size={18} /> {forecast.current.uv}
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
      </CurrentForecastExtrasContainer>
    </Container>
  );
};

export default Forecast;

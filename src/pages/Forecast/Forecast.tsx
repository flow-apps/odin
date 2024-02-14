import React, { useEffect, useRef, useState } from "react";
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
  CurrentForecastFeelsLikeContainer,
  CurrentForecastFeelsLikeText,
  CurrentForecastImage,
  CurrentForecastImageContainer,
  CurrentForecastInfoContainer,
  CurrentForecastInfoText,
  CurrentForecastTemperatureContainer,
  CurrentForecastTemperatureText,
  CurrentForecastTitle,
  ForecastHourByHourContainer,
  ForecastHourByHourTitle,
  TextSup,
} from "./styles";
import HourByHour from "../../components/HourByHour/HourByHour";
import LottieView from "lottie-react-native";

const Forecast: React.FC = () => {
  const [showedAd, setShowedAd] = useState(false);
  const [forecast, setForecast] = useState<IForecast>();

  const route = useRoute();
  const navigation = useNavigation<any>();
  const { title, colors } = useTheme();
  const animationRef = useRef<LottieView>(null);

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

  const handleStopAnimationOnLastFrame = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  return (
    <Container>
      <BlurView
        blurType={title === "light" ? "light" : "dark"}
        blurAmount={3}
        style={StyleSheet.absoluteFillObject}
      />
      <CurrentForecastContainer>
        <CurrentForecastTitle>
          <Feather name="map-pin" size={18} /> {forecast.location.name}
          <CurrentForecastCountryTitle>
            , {forecast.location.country}
          </CurrentForecastCountryTitle>
        </CurrentForecastTitle>
        <CurrentForecastImageContainer>
          <CurrentForecastImage
            ref={animationRef}
            source={getWeatherAnimation(
              forecast.current.condition.code,
              !Boolean(forecast.current.is_day)
            )}
            resizeMode="contain"
            autoPlay
            speed={0.4}
            loop={false}
            onAnimationFinish={handleStopAnimationOnLastFrame}
          />
        </CurrentForecastImageContainer>
      </CurrentForecastContainer>
      <CurrentForecastTemperatureContainer>
        <CurrentForecastTemperatureText>
          {Math.round(forecast.current.temp_c)}
          <TextSup>°</TextSup> C
        </CurrentForecastTemperatureText>
      </CurrentForecastTemperatureContainer>
      <CurrentForecastFeelsLikeContainer>
        <CurrentForecastFeelsLikeText>
          {translate("forecast.feelsLike", {
            temp: `${Math.round(forecast.current.feelslike_c)}°C`,
          })}
        </CurrentForecastFeelsLikeText>
      </CurrentForecastFeelsLikeContainer>
      <CurrentForecastInfoContainer>
        <CurrentForecastInfoText>
          {forecast.current.condition.text}
        </CurrentForecastInfoText>
      </CurrentForecastInfoContainer>
      <CurrentForecastExtrasContainer>
        <CurrentForecastExtraWrapper>
          <Feather name="wind" size={22} color={colors.black} />
          <CurrentForecastExtraText>
            {Math.round(forecast.current.wind_kph)} Km/h
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <Feather name="cloud-rain" size={22} color={colors.black} />
          <CurrentForecastExtraText>
            {forecast.forecast.forecastday[0].day.daily_chance_of_rain}%
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <Feather name="droplet" size={22} color={colors.black} />
          <CurrentForecastExtraText>
            {forecast.current.humidity}%
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <Feather name="sun" size={22} color={colors.black} />
          <CurrentForecastExtraText>
            {forecast.current.uv}
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
      </CurrentForecastExtrasContainer>
      <ForecastHourByHourTitle>
        <Feather name="clock" size={22} />{" "}
        {translate("forecast.hourly_forecast")}
      </ForecastHourByHourTitle>
      <ForecastHourByHourContainer
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: 15 }}
      >
        {forecast.forecast.forecastday.map((fore) => {
          const date = fore.date;

          return fore.hour.map((_fore, index) => {
            return <HourByHour key={index} date={date} fore={_fore} />;
          });
        })}
      </ForecastHourByHourContainer>
    </Container>
  );
};

export default Forecast;

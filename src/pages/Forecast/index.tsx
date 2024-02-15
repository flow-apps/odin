import React, { useEffect, useRef, useState } from "react";
import { Feather, AntDesign } from "@expo/vector-icons";
import Loading from "../../components/Loading/Loading";
import I18n from "i18n-js";
import api from "../../services/api";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";
import { useRoute } from "@react-navigation/core";
import { API_KEY } from "../../secrets";
import { Alert } from "react-native";
import { IForecast } from "../../ts/interfaces/IForecast";
import { AdTypes, GetAdId } from "../../utils/ads";
import { translate } from "../../translations";
import { getWeatherAnimation } from "../../utils/icon";
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
  ForecastExtraInfoCard,
  ForecastExtraInfoIcon,
  ForecastExtraInfoTitle,
  ForecastExtraInfoValue,
  ForecastExtraInfoWrapper,
  ForecastExtraInfosContainer,
  ForecastExtraInfosTitle,
  ForecastHourByHourContainer,
  ForecastHourByHourTitle,
  TextSup,
} from "./styles";
import HourByHour from "../../components/HourByHour/HourByHour";
import LottieView from "lottie-react-native";
import { getCoordinates } from "../../utils/location";
import { isLocationEnabled } from "react-native-android-location-enabler";
import { StorageService } from "../../services/storage";
import { isObjectEmpty } from "../../utils/objects";
import { format } from "date-fns";

const Forecast: React.FC = () => {
  const [showedAd, setShowedAd] = useState(false);
  const [forecast, setForecast] = useState<IForecast>();

  const route = useRoute();
  const { colors } = useTheme();
  const animationRef = useRef<LottieView>(null);

  const params = route.params as { city?: string };
  const storage = new StorageService();

  const interstitial = InterstitialAd.createForAdRequest(
    GetAdId(AdTypes.INTERSTITIAL)
  );

  const handleGetForecast = async (query: string) => {
    api
      .get(
        `/forecast.json?key=${API_KEY}&q=${query}&days=3&aqi=yes&alerts=no&lang=${I18n.currentLocale()}`
      )
      .then((response) => {
        interstitial.load();
        setForecast(response.data);
      })
      .catch((err) => {
        Alert.alert(
          translate("forecast.alerts.cityNotFound.title"),
          translate("forecast.alerts.cityNotFound.content")
        );
        console.log("Erro ao buscar cidade -----> ", err);
      });
  };

  const handleOpenForecast = async () => {
    interstitial.addAdEventListener(AdEventType.LOADED, () => {
      if (!showedAd) {
        interstitial.show({
          immersiveModeEnabled: true,
        });
      }

      return setShowedAd(true);
    });

    if (!isObjectEmpty(params) && params.city) {
      await handleGetForecast(params.city);
    } else {
      if (await isLocationEnabled()) {
        const { lat, lng } = await getCoordinates();
        await storage.saveItem(
          "@Odin:LastLocation",
          JSON.stringify({ lat, lng })
        );
        await handleGetForecast(`${lat},${lng}`);
      } else {
        let lastLocation = (await storage.getItem("@Odin:LastLocation")) as any;
        if (lastLocation) {
          lastLocation = JSON.parse(lastLocation);
          await handleGetForecast(`${lastLocation.lat},${lastLocation.lng}`);
        }
      }
    }
  };

  useEffect(() => {
    handleOpenForecast();
  }, []);

  if (!forecast) {
    return (
      <Loading
        message={translate("loadings.getCityForecast")}
        showInterstitialAd
      />
    );
  }

  const handleStopAnimationOnLastFrame = () => {
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const getUVText = (uv: number) => {
    if (uv <= 2) {
      return "Baixo";
    } else if (uv > 2 && uv <= 5) {
      return "Moderado";
    } else if (uv > 5 && uv <= 7) {
      return "Alto";
    } else {
      return "Extremo";
    }
  };

  const getAQIText = (aqi: number) => {
    if (aqi <= 50) {
      return "Boa";
    } else if (aqi > 50 && aqi <= 100) {
      return "Moderada";
    } else if (aqi > 100 && aqi <= 300) {
      return "Ruim";
    } else {
      return "Perigosa";
    }
  };

  return (
    <Container>
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
            loop
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
          {`${Math.round(
            forecast.forecast.forecastday[0].day.mintemp_c
          )}° / ${Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}°`}
          {"\n"}
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
          <Feather name="cloud-rain" size={22} color={"#5773ff"} />
          <CurrentForecastExtraText>
            {forecast.forecast.forecastday[0].day.daily_chance_of_rain}%
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <Feather name="droplet" size={22} color={"#8599ff"} />
          <CurrentForecastExtraText>
            {forecast.current.humidity}%
          </CurrentForecastExtraText>
        </CurrentForecastExtraWrapper>
        <CurrentForecastExtraWrapper>
          <Feather name="sun" size={22} color={"#9900ff"} />
          <CurrentForecastExtraText>
            {getUVText(forecast.current.uv)}
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
        contentContainerStyle={{ marginLeft: 15, paddingRight: 15 }}
      >
        {forecast.forecast.forecastday.map((fore) => {
          const date = fore.date;

          return fore.hour.map((_fore, index) => {
            return <HourByHour key={index} date={date} fore={_fore} />;
          });
        })}
      </ForecastHourByHourContainer>
      <ForecastExtraInfosTitle>
        <Feather name="info" size={22} /> Mais informações
      </ForecastExtraInfosTitle>
      <ForecastExtraInfosContainer
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginLeft: 15, paddingRight: 18 }}
      >
        <ForecastExtraInfoCard>
          <ForecastExtraInfoIcon>
            <Feather name="clock" size={30} color={colors.primary} />
          </ForecastExtraInfoIcon>
          <ForecastExtraInfoWrapper>
            <ForecastExtraInfoTitle>Última atualização</ForecastExtraInfoTitle>
            <ForecastExtraInfoValue>
              {format(new Date(forecast.current.last_updated), "HH:mm")}
            </ForecastExtraInfoValue>
          </ForecastExtraInfoWrapper>
        </ForecastExtraInfoCard>

        <ForecastExtraInfoCard>
          <ForecastExtraInfoIcon>
            <Feather name="cloud-rain" size={30} color={colors.primary} />
          </ForecastExtraInfoIcon>
          <ForecastExtraInfoWrapper>
            <ForecastExtraInfoTitle>Total de chuva</ForecastExtraInfoTitle>
            <ForecastExtraInfoValue>
              {forecast.forecast.forecastday[0].day.totalprecip_mm
                .toFixed(2)
                .replace(".", ",")}{" "}
              mm
            </ForecastExtraInfoValue>
          </ForecastExtraInfoWrapper>
        </ForecastExtraInfoCard>

        <ForecastExtraInfoCard>
          <ForecastExtraInfoIcon>
            <Feather name="activity" size={30} color={colors.primary} />
          </ForecastExtraInfoIcon>
          <ForecastExtraInfoWrapper>
            <ForecastExtraInfoTitle>Qualidade do ar</ForecastExtraInfoTitle>
            <ForecastExtraInfoValue>
              {getAQIText(forecast.current.air_quality["us-epa-index"])}
            </ForecastExtraInfoValue>
          </ForecastExtraInfoWrapper>
        </ForecastExtraInfoCard>

        <ForecastExtraInfoCard>
          <ForecastExtraInfoIcon>
            <Feather name="eye" size={30} color={colors.primary} />
          </ForecastExtraInfoIcon>
          <ForecastExtraInfoWrapper>
            <ForecastExtraInfoTitle>Visibilidade</ForecastExtraInfoTitle>
            <ForecastExtraInfoValue>
              {forecast.current.vis_km} Km
            </ForecastExtraInfoValue>
          </ForecastExtraInfoWrapper>
        </ForecastExtraInfoCard>

        <ForecastExtraInfoCard>
          <ForecastExtraInfoIcon>
            <AntDesign name="dashboard" size={30} color={colors.primary} />
          </ForecastExtraInfoIcon>
          <ForecastExtraInfoWrapper>
            <ForecastExtraInfoTitle>Pressão</ForecastExtraInfoTitle>
            <ForecastExtraInfoValue>
              {forecast.current.pressure_mb} mBar
            </ForecastExtraInfoValue>
          </ForecastExtraInfoWrapper>
        </ForecastExtraInfoCard>
      </ForecastExtraInfosContainer>
    </Container>
  );
};

export default Forecast;

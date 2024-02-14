import React, { useEffect, useState } from "react";

import {
  Animation,
  AnimationContainer,
  Container,
  GetPermissionButton,
  GetPermissionButtonContainer,
  GetPermissionButtonText,
  GetPermissionDesc,
  GetPermissionTitle,
} from "./styles";
import { usePersistedState } from "../../hooks/usePersistedState";
import { checkPermission, requestPermission } from "../../utils/permissions";
import { PERMISSIONS, openSettings } from "react-native-permissions";
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from "react-native-android-location-enabler";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getCoordinates } from "../../utils/location";

interface GetLocationPermissionProps {}

const GetLocationPermission: React.FC<GetLocationPermissionProps> = () => {
  const [lastLocation, setLastLocation] = usePersistedState<{
    lat: number;
    lng: number;
  }>("@Odin:lastLocation", {});

  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isRequestablePermission, setIsRequestablePermission] = useState(false);
  const [isEnabledGPS, setIsEnabledGPS] = useState(false);

  const navigation = useNavigation<any>();

  const renderScreen = () => {
    if (!hasLocationPermission) {
      if (isRequestablePermission) {
        return (
          <>
            <GetPermissionTitle>
              Precisamos de sua localização
            </GetPermissionTitle>
            <GetPermissionDesc>
              Usamos sua localização para encontrar a previsão do tempo do local
              exato que você está. Não se preocupe, seus dados serão usados
              apenas para esse fim.
            </GetPermissionDesc>
            <GetPermissionButtonContainer>
              <GetPermissionButton onPress={handleGetPermission}>
                <GetPermissionButtonText>
                  Permitir uso da localização
                </GetPermissionButtonText>
              </GetPermissionButton>
            </GetPermissionButtonContainer>
          </>
        );
      } else {
        return (
          <>
            <GetPermissionTitle>
              Precisamos de sua localização
            </GetPermissionTitle>
            <GetPermissionDesc>
              Usamos sua localização para encontrar a previsão do tempo do local
              exato que você está. Não se preocupe, seus dados serão usados
              apenas para esse fim. Abra as configurações e autorize o uso da
              localização.
            </GetPermissionDesc>
            <GetPermissionButtonContainer>
              <GetPermissionButton onPress={() => openSettings()}>
                <GetPermissionButtonText>
                  Abrir configurações
                </GetPermissionButtonText>
              </GetPermissionButton>
            </GetPermissionButtonContainer>
          </>
        );
      }
    } else {
      if (!lastLocation && !isEnabledGPS) {
        return (
          <>
            <GetPermissionTitle>
              Precisamos que você ative sua localização
            </GetPermissionTitle>
            <GetPermissionDesc>
              Parece que a primeira vez que você abre o app. Precisamos
              registrar sua localização para mostrar a primeira previsão do
              tempo.
            </GetPermissionDesc>
            <GetPermissionButtonContainer>
              <GetPermissionButton onPress={handleEnabledPressed}>
                <GetPermissionButtonText>
                  Ativar localização
                </GetPermissionButtonText>
              </GetPermissionButton>
            </GetPermissionButtonContainer>
          </>
        );
      } else {
        return <></>;
      }
    }
  };

  const handleEnabledPressed = async () => {
    if (Platform.OS === "android") {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log("enableResult", enableResult);

        if (enableResult === "enabled") {
          setIsEnabledGPS(true);
          return;
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setIsEnabledGPS(false);
        }
      }
    }
  };

  const handleGetPermission = async () => {
    const { granted, requestable } = await requestPermission(
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    setHasLocationPermission(granted);
    setIsRequestablePermission(requestable);
  };

  useEffect(() => {
    checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(
      async (res) => {
        if (res.granted) {
          const GPSState = await isLocationEnabled();

          setHasLocationPermission(true);
          setIsEnabledGPS(GPSState);
        } else {
          setHasLocationPermission(false);
          if (res.requestable) {
            setIsRequestablePermission(true);
          } else {
            setIsRequestablePermission(false);
          }
        }
      }
    );
  }, []);

  useEffect(() => {
    if (hasLocationPermission) {
      if (isEnabledGPS || lastLocation) {
        navigation.navigate("Home");
      }
    }
  }, [isEnabledGPS, hasLocationPermission, lastLocation]);

  return (
    <Container>
      <AnimationContainer>
        <Animation
          source={require("../../animations/location.json")}
          autoPlay
          loop={false}
        />
      </AnimationContainer>
      {renderScreen()}
    </Container>
  );
};

export default GetLocationPermission;

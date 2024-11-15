import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import NoNetwork from "../components/NoNetwork/NoNetwork";
import GetLocationPermission from "../pages/GetLocationPermission";
import { HomeRoutes } from "./tabRoutes/home.routes";
import { useTheme } from "styled-components";

const { Screen, Navigator } = createStackNavigator();

const AppRoutes: React.FC = () => {
  const [connected, setConnected] = useState(true);
  const { title, colors } = useTheme();

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnected(state.isConnected && state.isInternetReachable);

      NetInfo.addEventListener((state) => {
        setConnected(state.isConnected && state.isInternetReachable);
      });
    });
  }, []);

  if (!connected) {
    return <NoNetwork />;
  }

  return (
    <NavigationContainer
      theme={
        title === "dark"
          ? {
              ...DarkTheme,
              colors: { ...DarkTheme.colors, background: colors.background },
            }
          : undefined
      }
    >
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="GetLocationPermisson" component={GetLocationPermission} />
        <Screen name="Home" component={HomeRoutes} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

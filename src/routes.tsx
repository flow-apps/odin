import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import NoNetwork from "./components/NoNetwork/NoNetwork";
import Forecast from "./pages/Forecast/Forecast";
import Home from "./pages/Home/Home";
import { translate } from "./translations";
import GetLocationPermission from "./pages/GetLocationPermission";

const { Screen, Navigator } = createStackNavigator();

const AppRoutes: React.FC = () => {
  const [connected, setConnected] = useState(true);

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
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="GetLocationPermisson" component={GetLocationPermission} />
        <Screen name="Search" component={Home} />
        <Screen name="Home" component={Forecast} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;

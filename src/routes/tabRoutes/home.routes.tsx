import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { fonts } from "../../styles/fonts";
import Home from "../../pages/Forecast"
import { darken } from "polished";
import SearchCity from "../../pages/SearchCity";
import Configurations from "../../pages/Configurations";

const tabRoutes = createBottomTabNavigator();

const HomeRoutes = () => {
  const { colors } = useTheme();

  return (
    <tabRoutes.Navigator
      screenOptions={{
        // @ts-ignore
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.black,
        tabBarLabelPosition: "below-icon",
        // @ts-ignore
        tabBarKeyboardHidesTabBar: true,
        tabBarIconStyle: {
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: fonts["bold"],
        },
        tabBarStyle: {
          position: "absolute",
          bottom: 15,
          borderRadius: 35,
          width: "92%",
          left: "5%",
          padding: 15,
          elevation: 10,
          height: 65,
          zIndex: 90,
          backgroundColor: darken(0.065, colors.shape),
          paddingBottom: 5,
        },
      }}
    >
      <tabRoutes.Screen
        component={Home}
        name="HomeTab"
        options={{
          tabBarShowLabel: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <tabRoutes.Screen
        component={SearchCity}
        name="SearchCity"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <tabRoutes.Screen
        component={Home}
        name="Notifications"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" size={size - 2} color={color} />
          ),
        }}
      />
      <tabRoutes.Screen
        component={Configurations}
        name="Configurations"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="cog" size={size - 2} color={color} />
          ),
        }}
      />
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes };
import React from "react";
import { MaterialIcons, Entypo, Feather } from "@expo/vector-icons";
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
          height: 80,
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
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size + 10} color={color} />
          ),
        }}
      />
      <tabRoutes.Screen
        component={SearchCity}
        name="SearchCity"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" size={size + 10} color={color} />
          ),
        }}
      />
      <tabRoutes.Screen
        component={Home}
        name="Notifications"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="bell" size={size + 4} color={color} />
          ),
        }}
      />
      <tabRoutes.Screen
        component={Configurations}
        name="Configurations"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="cog" size={size + 6} color={color} />
          ),
        }}
      />
    </tabRoutes.Navigator>
  );
};

export { HomeRoutes };
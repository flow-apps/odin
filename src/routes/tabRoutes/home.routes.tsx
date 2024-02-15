import React from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { fonts } from "../../styles/fonts";
import Home from "../../pages/Forecast"

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
          transform: [{ scale: 0.9 }],
          marginBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: fonts["bold"],
        },
        tabBarStyle: {
          padding: 15,
          elevation: 10,
          height: 70,
          zIndex: 90,
          backgroundColor: `${colors.shape}`,
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
        component={Home}
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
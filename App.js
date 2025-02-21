import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import { View, ActivityIndicator } from "react-native";

import OnboardingScreen from "@screens/OnboardingScreen/OnboardingScreen";
import Home from "@screens/Home/Home";
import Login from "@screens/Login/Login";
import Profile from "@screens/Profile/Profile";
import InventoryDetails from "@screens/Inventory/InventoryDetails/InventoryDetails";
import Settings from "@screens/Settings/Settings";
import CreateAccount from "@screens/Login/CreateAccount/CreateAccount";
import RecoverPassword from "@screens/Login/RecoverPassword/RecoverPassword";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_Light: Montserrat_300Light,
    Montserrat_Regular: Montserrat_400Regular,
    Montserrat_Medium: Montserrat_500Medium,
    Montserrat_SemiBold: Montserrat_600SemiBold,
    Montserrat_Bold: Montserrat_700Bold,
  });

  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkOnboardingScreen() {
      try {
        const onboardingScreen = await AsyncStorage.getItem("isOnboarding");
        setInitialRoute(
          onboardingScreen === "true" ? "Home" : "OnboardingScreen"
        );
      } catch (error) {
        console.error(error);
        setInitialRoute("Login");
      } finally {
        setIsLoading(false);
      }
    }

    checkOnboardingScreen();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="InventoryDetails"
          component={InventoryDetails}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

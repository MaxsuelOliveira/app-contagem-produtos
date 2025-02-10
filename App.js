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

import OnboardingScreen from "./src/screens/OnboardingScreen/OnboardingScreen";
import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Login/Login";
import Profile from "./src/screens/Profile/Profile";
import InventoryDetails from "./src/screens/Inventory/InventoryDetails/InventoryDetails";
import SpreadSheetsImport from "./src/screens/SpreadSheetsImport/SpreadSheetsImport";
import SpreadSheets from "./src/screens/SpreadSheets/SpreadSheets";
import Settings from "./src/screens/Settings/Settings";
import CreateAccount from "./src/screens/Login/CreateAccount/CreateAccount";
import RecoverPassword from "./src/screens/Login/RecoverPassword/RecoverPassword";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_Light: Montserrat_300Light,
    Montserrat_Regular: Montserrat_400Regular,
    Montserrat_Medium: Montserrat_500Medium,
    Montserrat_SemiBold: Montserrat_600SemiBold,
    Montserrat_Bold: Montserrat_700Bold,
  });

  // const [initialRoute, setInitialRoute] = useState(null);
  // useEffect(() => {
  //   async function checkLogin() {
  //     try {
  //       const token = await AsyncStorage.getItem("token");
  //       setInitialRoute(token ? "Home" : "Login");
  //     } catch (error) {
  //       console.error("Erro ao recuperar o token:", error);
  //       setInitialRoute("Login");
  //     }
  //   }

  //   checkLogin();
  // }, []);

  // if (initialRoute === null) {
  //   return null;
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"OnboardingScreen"}>
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="InventoryDetails"
          component={InventoryDetails}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPassword}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SpreadSheets"
          component={SpreadSheets}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="SpreadSheetsImport"
          component={SpreadSheetsImport}
          options={{
            headerTitle: () => null,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

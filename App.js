import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_300Light,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import Login from "./src/screens/Login/Login";
import Home from "./src/screens/Home/Home";
import Profile from "./src/screens/Profile/Profile";
import Settings from "./src/screens/Settings/Settings";
import InventoryDetails from "./src/screens/Inventory/InventoryDetails/InventoryDetails";
import SpreadSheets from "./src/screens/SpreadSheets/SpreadSheets";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: Montserrat_400Regular,
    Montserrat_SemiBold: Montserrat_600SemiBold,
    Montserrat_Bold: Montserrat_700Bold,
    Montserrat_Light: Montserrat_300Light,
    Montserrat_Medium: Montserrat_500Medium,
  });

  if (fontsLoaded === false) {
    console.error("Erro ao carregar as fontes:", fontsLoaded);
  }

  const [initialRoute, setInitialRoute] = useState(null);
  useEffect(() => {
    async function checkLogin() {
      try {
        const token = await AsyncStorage.getItem("token");
        setInitialRoute(token ? "Home" : "Login");
      } catch (error) {
        console.error("Erro ao recuperar o token:", error);
        setInitialRoute("Login");
      }
    }

    checkLogin();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

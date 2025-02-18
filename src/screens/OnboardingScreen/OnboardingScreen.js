import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Swiper from "react-native-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonts
import { useFonts } from "expo-font";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

// Styles
import { colors } from "@styles/GlobalStyles";
import { styles } from "./Styles";

const slides = [
  {
    title: "Controle Total do Seu Estoque",
    description:
      "Gerencie seus produtos sem limites! Adicione, edite e acompanhe seu estoque com facilidade e precisão.",
  },
  {
    title: "Verificação Rápida e Precisa",
    description:
      "Escaneie e confira produtos em segundos. Importação e exportação ilimitadas para manter seu estoque sempre atualizado!",
  },
  {
    title: "Automação Inteligente",
    description:
      "Importe planilhas para conferência automática e evite erros manuais. Agilize seu controle de estoque com tecnologia de ponta!",
  },
  {
    title: "Teste o App!",
    description:
      "Experimente todas as funcionalidades. Se gostar, faça seu cadastro e tenha acesso completo!",
  },
];

const OnboardingScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    Montserrat_Light: Montserrat_300Light,
    Montserrat_Regular: Montserrat_400Regular,
    Montserrat_Medium: Montserrat_500Medium,
    Montserrat_SemiBold: Montserrat_600SemiBold,
    Montserrat_Bold: Montserrat_700Bold,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef(null);
  const navigation = useNavigation();

  async function nextHome() {
    await AsyncStorage.setItem("OnboardingScreen", "true");
    navigation.navigate("Home");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor={colors.primaryBackground} />

      <Swiper
        loop={false}
        ref={swiperRef}
        onIndexChanged={(index) => setCurrentIndex(index)}
        dotStyle={{ backgroundColor: "#ccc", width: 10, height: 10 }}
        activeDotStyle={{ backgroundColor: "#007AFF", width: 10, height: 10 }}
      >
        {slides.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Swiper>

      <TouchableOpacity
        onPress={() =>
          currentIndex === slides.length - 1
            ? nextHome()
            : swiperRef.current.scrollBy(1)
        }
        style={styles.button}
      >
        <Text style={styles.buttonText}>
          {currentIndex === slides.length - 1 ? "Começar" : "Próximo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen;

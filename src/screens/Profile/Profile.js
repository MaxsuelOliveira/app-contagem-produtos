import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import SignupBanner from "../../components/Banner/Banner";


// Styles
import { GlobalStyles } from "@styles/GlobalStyles";
import { styles } from "./styles";

import { decodeToken, isTokenExpired } from "@utils/token";

const Profile = () => {
  const navigation = useNavigation();
  const [company, setCompany] = useState({});
  const [isNotLogin, setIsNotLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      
      if (isTokenExpired(token)) {
        Alert.alert("Sessão expirada", "Faça login novamente");
        setIsNotLogin(true);
        return;
      }

      if (!token) {
        const decoded = decodeToken(token);
        setCompany(decoded);
        setIsNotLogin(false);
        setOnboardingScreen(true);
      } else {
        setIsNotLogin(true);
        setOnboardingScreen(false);
      }
    })();
  }, []);

  return (
    <View style={styles.profileContainer}>
      <StatusBar style="dark" backgroundColor="transparent" />

      {company.email ? (
        <>
          <Text>Login realizado com sucesso!</Text>
          <View style={GlobalStyles.cardHeader}>
            <Text style={GlobalStyles.cardTitle}>Seu perfil</Text>
          </View>

          <View>
            <Image
              source={{ uri: "https://placehold.co/150x150" }}
              style={styles.profileImage}
            />
            <ProfileItem label="Nome Fantasia" value={company.nome} />
            <ProfileItem label="CNPJ" value={company.cpf_cnpj} />
            <ProfileItem label="Email" value={company.email} />
            <ProfileItem label="Telefone" value={company.telefone} />
          </View>
        </>
      ) : (
        <>
          <Text>Login não realizado com sucesso!</Text>
          {isNotLogin ? (
            <View style={styles.SignupBanner}>
              <SignupBanner
                onLogin={() => navigation.navigate("Login")}
                createAccount={() => navigation.navigate("CreateAccount")}
              />
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

const ProfileItem = ({ label, value }) => {
  return (
    <View style={styles.profileItem}>
      <Text style={GlobalStyles.label}>{label}</Text>
      <Text style={GlobalStyles.value}>{value}</Text>
    </View>
  );
};

export default Profile;

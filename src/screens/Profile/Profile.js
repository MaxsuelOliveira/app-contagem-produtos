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
  const [profile, setProfile] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  async function getToken() {
    const isToken = await AsyncStorage.getItem("isToken");

    if (isToken) {
      const decoded = decodeToken(isToken);
      setProfile(decoded);
      setIsLogin(true);
      return;
    }
    setIsLogin(false);
  }

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.profileContainer}>
      <StatusBar style="dark" backgroundColor="transparent" />

      {isLogin ? (
        <View>
          <View style={GlobalStyles.cardHeader}>
            <Text style={GlobalStyles.cardTitle}>Seu perfil</Text>
          </View>

          <Image
            source={{ uri: "https://placehold.co/150x150" }}
            style={styles.profileImage}
          />
          <ProfileItem label="Nome Fantasia" value={profile.nome} />
          <ProfileItem label="CNPJ" value={profile.cpf_cnpj} />
          <ProfileItem label="Email" value={profile.email} />
          <ProfileItem label="Telefone" value={profile.telefone} />
        </View>
      ) : (
        <View style={styles.SignupBanner}>
          <SignupBanner
            onLogin={() => navigation.navigate("Login")}
            createAccount={() => navigation.navigate("CreateAccount")}
          />
        </View>
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

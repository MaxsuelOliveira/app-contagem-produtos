import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import SignupBanner from "../../components/Banner/Banner";

// Styles
import { colors, GlobalStyles } from "@styles/GlobalStyles";
import { styles } from "./styles";

import { decodeToken, isTokenExpired } from "@utils/utils";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState({});
  const [device, setDevice] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  async function getToken() {
    const isToken = await AsyncStorage.getItem("isToken");
    const isDevice = await AsyncStorage.getItem("isDevice");

    if (isToken) {
      const decoded = decodeToken(isToken);
      setProfile(decoded);
      setIsLogin(true);

      if (isDevice) {
        setDevice(JSON.parse(isDevice));
      }
      return;
    }
    setIsLogin(false);
  }

  useEffect(() => {
    getToken();
  }, [isLogin]);

  return (
    <View>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={styles.card}>
        <View style={{ ...GlobalStyles.cardHeader, marginTop: 10 }}>
          <TouchableOpacity
            style={GlobalStyles.btnHeader}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={28} color={colors.colorIcons} />
          </TouchableOpacity>
          <Text style={{ ...styles.cardTitle, marginLeft: -50 }}>Perfil</Text>
        </View>

        {isLogin ? (
          <ScrollView style={{ flex: 1 }}>
            <Image
              source={{ uri: "https://placehold.co/150x150" }}
              style={styles.profileImage}
            />

            <ProfileItem label="Nome Fantasia" value={profile.nome} />
            <ProfileItem label="CNPJ" value={profile.cpf_cnpj} />
            <ProfileItem label="Email" value={profile.email} />
            <ProfileItem label="Telefone" value={profile.telefone} />

            <View style={styles.hr}></View>

            <ProfileItem label="UUID" value={device.uuid} />
            <ProfileItem label="Dispositivo" value={device.describe} />

            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={GlobalStyles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={styles.SignupBanner}>
            <SignupBanner
              onLogin={() => navigation.navigate("Login")}
              createAccount={() => navigation.navigate("CreateAccount")}
            />
          </View>
        )}
      </View>
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

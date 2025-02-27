import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Components
import SignupBanner from "../../components/Banner/Banner";

import { getDateExpire, isExpired } from "@utils/utils";

// Styles
import { colors, GlobalStyles } from "@styles/GlobalStyles";
import { styles } from "./styles";

import { decodeToken, isTokenExpired } from "@utils/utils";
import { AntDesign } from "@expo/vector-icons";

const Profile = () => {
  useEffect(() => {
    const fetchToken = async () => {
      const isDevice = await AsyncStorage.getItem("isDevice");
      if (isDevice) {
        const { expires_in } = JSON.parse(isDevice);
        if (isExpired(expires_in)) {
          Alert.alert("Sessão expirada", "Faça login novamente.");
          return;
        }
      }

      const token = await AsyncStorage.getItem("isToken");
      if (token) {
        const decoded = decodeToken(token);
        setLoading(false);
        setProfile(decoded);

        if (isDevice) {
          setDevice(JSON.parse(isDevice));
        }

        return;
      }
    };

    fetchToken();
  }, []);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const [device, setDevice] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  return (
    <View>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={styles.card}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color={colors.colorPrimary} />
            <Text style={GlobalStyles.label}>Carregando...</Text>
          </>
        ) : (
          <>
            <View style={{ ...GlobalStyles.cardHeader, marginTop: 10 }}>
              <TouchableOpacity
                style={GlobalStyles.btnHeader}
                onPress={() => navigation.goBack()}
              >
                <AntDesign
                  name="arrowleft"
                  size={28}
                  color={colors.colorIcons}
                />
              </TouchableOpacity>
              <Text style={{ ...styles.cardTitle, marginLeft: -50 }}>
                Perfil
              </Text>
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
          </>
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

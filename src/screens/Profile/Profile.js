import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles
import { GlobalStyles } from "../../styles/GlobalStyles";
import { styles } from "./styles";

import { decodeToken } from "../../utils/token";

const Profile = () => {
  const [company, setCompany] = useState({});
  const [token, setToken] = useState("");
  // const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        setCompany(decoded);
        return;
      }
    };

    fetchToken();
  }, []);

  console.log(company);

  return (
    <View style={styles.profileContainer}>
      <StatusBar style="dark" />

      {company.email ? (
        <>
          <View style={GlobalStyles.cardHeader}>
            <Text style={GlobalStyles.cardTitle}>Perfil</Text>
          </View>

          <View>
            <Image
              source={{ uri: "https://placehold.co/150x150" }}
              style={{
                width: 80,
                height: 80,
                resizeMode: "contain",
                backgroundColor: "#f0f0f0",
                borderRadius: 50,
                margin: "auto",
                marginBottom: 20,
              }}
            />
            <ProfileItem label="Nome Fantasia" value={company.nome} />
            <ProfileItem label="CNPJ" value={company.cpf_cnpj} />
            <ProfileItem label="Email" value={company.email} />
            <ProfileItem label="Telefone" value={company.telefone} />
          </View>
        </>
      ) : (
        <Text>Login não realizado !</Text>
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

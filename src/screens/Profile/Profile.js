import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const [company, setCompany] = useState({});
  useEffect(() => {
    console.log("Carregando informações da empresa ...");
    setCompany({
      nomeFantasia: "Semprelar",
      cnpj: "00.000.000/0000-00",
      email: "Email@contato.com",
      telefone: "(00) 0000-0000",
      dispositivosLogados: 1,
      acessos: 5,
    });
  }, []);

  return (
    <View style={styles.profileContainer}>
      <StatusBar style="dark" />

      <View style={GlobalStyles.cardHeader}>
        <Text style={GlobalStyles.cardTitle}>Perfil</Text>
      </View>

      <View>
        <Image
          source={{ uri: "https://placehold.co/150x150" }}
          style={{ width: 80, height: 80, resizeMode: "contain", backgroundColor: "#f0f0f0", borderRadius: 50 , margin: "auto" , marginBottom: 20}}
        />
        <ProfileItem label="Nome Fantasia" value={company.nomeFantasia} />
        <ProfileItem label="CNPJ" value={company.cnpj} />
        <ProfileItem label="Email" value={company.email} />
        <ProfileItem label="Telefone" value={company.telefone} />
        <ProfileItem
          label="Dispositivos logados"
          value={`${company.dispositivosLogados} / ${company.acessos}`}
        />
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

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "column",
    gap: 12,
    padding: 16,
    borderRadius: 10,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    flex: 1,
  },

  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Profile;

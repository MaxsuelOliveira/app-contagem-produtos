import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { GlobalStyles, lightTheme } from "../../styles/GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native-gesture-handler";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.settingsContainer}>
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <View style={GlobalStyles.cardHeader}>
        <Text style={GlobalStyles.cardTitle}>Configurações</Text>
      </View>

      <ScrollView>
        {/* Tema */}
        <View style={styles.settingsItem}>
          <Text style={[styles.title]}>Tema do app</Text>

          <View>
            <SettingsItem label="Dark" value="Não" />
          </View>
        </View>

        {/* Importar dados */}
        <View style={styles.settingsItem}>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.title]}>Importar planilha</Text>
            <Text style={[GlobalStyles.small]}>
              Importe uma planilha com os dados dos produtos, para habilitar a
              comparação. Evite erros de digitação e agilize o processo. Seu ERP
              agradece :)
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SpreadSheets");
            }}
            style={{
              ...GlobalStyles.button,
              backgroundColor: "transparent",
              borderColor: lightTheme.borderColor,
              borderWidth: 1,
            }}
          >
            {/* <AntDesign name="close" size={28} color={lightTheme.colorIcons} /> */}
            <Text
              style={{
                ...GlobalStyles.buttonText,
                color: lightTheme.textPrimary,
              }}
            >
              Importar planilha
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const SettingsItem = ({ label, value }) => {
  return (
    <View style={styles.settingsBox}>
      <Text style={GlobalStyles.label}>{label}</Text>
      <Text style={GlobalStyles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    flexDirection: "column",
    gap: 12,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    flex: 1,
  },
  settingsItem: {
    marginBottom: 30,
  },
  settingsBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  label: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Regular",
    marginBottom: 10,
  },
});

export default Settings;

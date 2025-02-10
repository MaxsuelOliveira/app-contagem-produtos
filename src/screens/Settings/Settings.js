import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Switch } from "react-native-gesture-handler";

// Icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Backend
import { Controller } from "../../services/backend/controller";
import { downloadFile } from "../../utils/downloadFile";
import importFileSpreadSheets from "../../utils/importFileSpreadSheets";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";
import { styles } from "./styles";

const Settings = () => {
  const navigation = useNavigation();
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const textLabelTheme = toggleSwitch ? "dark" : "light";

  const [data, setData] = useState([]);
  const [spreadSheetsCount, setSpreadSheetsCount] = useState(0);

  function setTheme() {
    setToggleSwitch(!toggleSwitch);
    textLabelTheme === "dark" ? "light" : "dark";
  }

  useEffect(() => {
    Controller.SpreadSheets.count()
      .then((response) => {
        setSpreadSheetsCount(response);
      })
      .catch((error) => {
        console.error("Erro ao contar as planilhas importadas !");
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.settingsContainer}>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={GlobalStyles.cardHeader}>
        <Text style={styles.cardTilte}>Configurações</Text>
      </View>

      <ScrollView>
        <View style={styles.settingsItem}>
          <Text style={[styles.title]}>Tema do app</Text>
          <View style={styles.settingsBox}>
            <Text style={GlobalStyles.label}>{textLabelTheme}</Text>
            <Switch
              trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
              thumbColor={true ? "#4d8eea" : "#bfbfbf"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setTheme}
              value={toggleSwitch}
            />
          </View>
        </View>

        <View style={styles.settingsItem}>
          <Text style={[styles.title]}>Habilitar camera</Text>
          <View style={styles.settingsBox}>
            <Text style={GlobalStyles.label}>{textLabelTheme}</Text>
            <Switch
              trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
              thumbColor={true ? "#4d8eea" : "#bfbfbf"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setTheme}
              value={toggleSwitch}
            />
          </View>
        </View>

        <View style={styles.settingsItem}>
          <Text style={[styles.title]}>Som de bip</Text>
          <View style={styles.settingsBox}>
            <Text style={GlobalStyles.label}>{textLabelTheme}</Text>
            <Switch
              trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
              thumbColor={true ? "#4d8eea" : "#bfbfbf"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setTheme}
              value={toggleSwitch}
            />
          </View>
        </View>

        <View style={styles.settingsItem}>
          <Text style={[styles.title]}>Cadastro avulso</Text>
          <View style={styles.settingsBox}>
            <Text style={GlobalStyles.label}>{textLabelTheme}</Text>
            <Switch
              trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
              thumbColor={true ? "#4d8eea" : "#bfbfbf"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setTheme}
              value={toggleSwitch}
            />
          </View>
        </View>

        <Text>
          Tamanho do banco de dados: {spreadSheetsCount} planilhas importadas
        </Text>
        <Text>
          Alterar o tamanho das fontes ..
        </Text>

      </ScrollView>
    </View>
  );
};

export default Settings;

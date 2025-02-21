import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Switch } from "react-native-gesture-handler";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

// Backend
import { Controller } from "@services/backend/controller";
import { downloadFile } from "@utils/downloadFile";
import SpreadSheetsImportModal from "../SpreadSheets/SpreadSheetsImportModal/SpreadSheetsImportModal";
import SpreadSheets from "@screens/SpreadSheets/SpreadSheets";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

const Settings = () => {
  const navigation = useNavigation();
  const [themeSwitch, setThemeSwitch] = useState(false);
  const textLabelTheme = themeSwitch ? "Escuro" : "Claro";

  const [cam, setCam] = useState(false);
  const textLabelCamera = cam ? "Ligado" : "Desligado";

  const [data, setData] = useState([]);
  const [spreadSheetsCount, setSpreadSheetsCount] = useState(0);
  const [spreadSheetsImportModal, setSpreadSheetsImportModal] = useState(false);
  const [spreadSheetsModal, setSpreadSheetsModal] = useState([]);
  const [account, setAccount] = useState(false);

  function setTheme() {
    setThemeSwitch(!themeSwitch);
    textLabelTheme === "dark" ? "light" : "dark";
  }

  function setCamera() {
    setCam(!cam);
    textLabelCamera === "Ligado" ? "Desligado" : "Ligado";
  }

  async function getAccount() {
    const isAccount = await AsyncStorage.getItem("isAccount");
    if (isAccount === "premium") {
      setAccount(false);
    } else {
      setAccount(true);
    }
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

  useEffect(() => {
    getAccount();
  }, []);

  return (
    <View style={styles.settingsContainer}>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={GlobalStyles.cardHeader}>
        <TouchableOpacity
          style={GlobalStyles.btnHeader}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={24} color={"black"} />
        </TouchableOpacity>
        <Text style={styles.cardTitle}>Configurações</Text>
      </View>

      <ScrollView>
        <View style={styles.settingsItem}>
          <Text style={styles.title}>Tema do app</Text>

          <View style={styles.settingsBox}>
            <Text style={styles.label}>{textLabelTheme}</Text>
            <Switch
              trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
              thumbColor={true ? "#4d8eea" : "#bfbfbf"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setTheme}
              value={themeSwitch}
            />
          </View>
        </View>

        <View style={styles.settingsItem}>
          <Text style={styles.title}>Habilitar Câmera</Text>
          <View style={styles.settingsBox}>
            <Text style={styles.label}>{textLabelCamera}</Text>
            <Switch
              trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
              thumbColor={true ? "#4d8eea" : "#bfbfbf"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setCamera}
              value={cam}
            />
          </View>
        </View>

        <View style={styles.hr}></View>

        <View style={styles.settingsItem}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSpreadSheetsImportModal(true)}
          >
            <View style={{ width: "90%" }}>
              <Text style={styles.title}>Importar planilha de produtos</Text>
              <Text style={styles.label}>
                Importe uma planilha de produtos para o banco de dados.
              </Text>
            </View>

            <AntDesign name="right" size={22} color={colors.colorIcons} />
          </TouchableOpacity>
        </View>

        <View style={styles.hr}></View>

        <View style={styles.settingsItem}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => setSpreadSheetsModal(true)}
          >
            <View style={{ width: "90%" }}>
              <Text style={styles.title}>Ver planilhas importadas</Text>
              <Text style={styles.label}>
                Importe uma planilha de produtos para o banco de dados.
              </Text>
            </View>

            <AntDesign name="right" size={22} color={colors.colorIcons} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {account && (
        <TouchableOpacity
          style={styles.banner}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.bannerText}>
            Sua conta é gratuita. Para ter acesso a mais recursos, faça um
            upgrade para o plano PRO.
          </Text>
        </TouchableOpacity>
      )}

      <SpreadSheetsImportModal
        isVisible={spreadSheetsImportModal}
        onClose={() => setSpreadSheetsImportModal(false)}
      />

      <SpreadSheets
        isVisible={spreadSheetsModal}
        onClose={() => setSpreadSheetsModal(false)}
      />
    </View>
  );
};

export default Settings;

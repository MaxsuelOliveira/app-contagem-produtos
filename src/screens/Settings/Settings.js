import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Switch } from "react-native-gesture-handler";

// Icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";
import { styles } from "./styles";

const Settings = () => {
  const navigation = useNavigation();
  const [toggleSwitch, setToggleSwitch] = useState(false);

  const textLabelTheme = toggleSwitch ? "dark" : "light";

  function setTheme() {
    setToggleSwitch(!toggleSwitch);
    textLabelTheme === "dark" ? "light" : "dark";
  }

  return (
    <View style={styles.settingsContainer}>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={GlobalStyles.cardHeader}>
        <Text style={GlobalStyles.cardTitle}>Configurações</Text>
      </View>

      <ScrollView>

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
              navigation.navigate("SpreadSheetsImport");
            }}
            style={{
              ...GlobalStyles.button,
              backgroundColor: "transparent",
              borderColor: colors.textDescription,
              borderWidth: 1,
              borderRadius: 10,
              borderStyle: "dashed",
            }}
          >
            <MaterialCommunityIcons
              name="google-spreadsheet"
              size={24}
              color={"green"}
            />
            <Text
              style={{
                ...GlobalStyles.buttonText,
                color: colors.textDescription,
              }}
            >
              Importar planilha
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingsItem}>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.title]}>Suas planilha importadas</Text>
            <Text style={[GlobalStyles.small]}>
              Lista de planilhas importadas. Clique para visualizar as
              informações.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SpreadSheets");
            }}
            style={{
              ...GlobalStyles.button,
              backgroundColor: "transparent",
              borderColor: colors.textDescription,
              borderWidth: 1,
              borderRadius: 10,
              borderStyle: "dashed",
            }}
          >
            <MaterialCommunityIcons
              name="google-spreadsheet"
              size={24}
              color={"green"}
            />
            <Text
              style={{
                ...GlobalStyles.buttonText,
                color: colors.textDescription,
              }}
            >
              Ver planilhas importadas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tema */}
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

      </ScrollView>

    </View>
  );
};


export default Settings;

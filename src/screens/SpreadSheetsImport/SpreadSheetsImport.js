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

const SpreadSheetsImport = () => {
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
        <Text style={styles.cardTilte}>
            Planilhas importadas ({spreadSheetsCount})
        </Text>
      </View>

      <ScrollView>
        <View style={styles.settingsItem}>
          <View style={{ marginBottom: 20 }}>
            <Text style={[styles.title]}>Importar planilha</Text>
            <Text style={[GlobalStyles.small]}>
              Importe uma planilha, para ativar a comparação de produtos no
              inventario. Evite erros de digitação e agilize o processo.
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => importFileSpreadSheets(setData)}
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

            <Text style={GlobalStyles.small}>
              Formatos aceitos: .xls, .xlsx, .csv
            </Text>
          </TouchableOpacity>

          <Text style={{ ...GlobalStyles.label, marginTop: 10 }}>
            Siga o modelo de planilha abaixo para importar os produtos.
            <TouchableOpacity
              onPress={() =>
                downloadFile(
                  "https://estoque.webart3.com/documents/planilha-exemplov1.0.xlsx",
                  "planilha-exemplov1.0.xlsx"
                )
              }
            >
              <Text style={GlobalStyles.link}>
                Clique aqui para baixar o modelo !
              </Text>
            </TouchableOpacity>
          </Text>
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
              Gerenciar planilhas importadas
            </Text>
            <Text style={GlobalStyles.small}>
              {spreadSheetsCount} planilha(s) importadas
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SpreadSheetsImport;

import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Switch } from "react-native-gesture-handler";

// Icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Backend
import { Controller } from "@services/backend/controller";
import { downloadFile } from "@utils/downloadFile";
import importFileSpreadSheets from "@utils/importFileSpreadSheets";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

const SpreadSheetsImportModal = ({ isVisible, onClose }) => {
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
    <Modal
      visible={isVisible}
      animationType={false}
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={colors.modalCover} />

      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={styles.cardTilte}>Importar planilha</Text>
            </View>

            <ScrollView>
              <View style={styles.settingsItem}>
                <View>
                  <Text style={[styles.title]}>
                    Atenção : {""}
                    <Text style={{ ...GlobalStyles.small, fontSize: 14 }}>
                      Antes de importar uma planilha, certifique-se de que ela
                      está no formato correto.
                    </Text>
                  </Text>

                  <Text style={{ ...GlobalStyles.small, fontSize: 14 }}>
                    São 3 colunas, com o seguinte formato: (Código de barras é obrigatório.)
                  </Text>

                  <Text
                    style={{
                      ...GlobalStyles.small,
                      fontSize: 14,
                      color: colors.textPrimary,
                    }}
                  >
                    COD BARRA | NOME | PREÇO
                  </Text>

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
                </View>
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
                  marginBottom: 20,
                  marginTop: -10,
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
                  Clique e selecione a planilha
                </Text>

                <Text style={GlobalStyles.small}>
                  Formatos aceitos: .xls, .xlsx, .csv
                </Text>
              </TouchableOpacity>

              {/* Switch */}
              <View style={{ ...styles.settingsItem, display: "none" }}>
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
        </View>
      </View>
    </Modal>
  );
};

export default SpreadSheetsImportModal;

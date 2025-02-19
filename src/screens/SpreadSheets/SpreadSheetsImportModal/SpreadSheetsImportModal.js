import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
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
import { AntDesign } from "@expo/vector-icons";

const SpreadSheetsImportModal = ({ isVisible, onClose }) => {
  const navigation = useNavigation();
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const textLabelTheme = toggleSwitch ? "dark" : "light";

  const [data, setData] = useState([]);
  const [spreadSheetsCount, setSpreadSheetsCount] = useState(0);
  const [limitAccount, setLimitlimitAccount] = useState("free");

  const [progress, setProgress] = useState(0);
  const [startingImport, setStartingImport] = useState(true);

  function setTheme() {
    setToggleSwitch(!toggleSwitch);
    textLabelTheme === "dark" ? "light" : "dark";
  }

  async function getLimitAccount() {
    const typeAccount = await AsyncStorage.getItem("isAccount");
    if (typeAccount === "premium") {
      setLimitlimitAccount("premium");
    } else {
      setLimitlimitAccount("free");
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
    getLimitAccount();
  }, []);

  return (
    <>
      <Modal
        visible={isVisible}
        animationType={false}
        transparent
        onRequestClose={onClose}
      >
        <StatusBar style="auto" backgroundColor={colors.modalCover} />

        <View style={GlobalStyles.modalOverlay}>
          <View style={GlobalStyles.modalContent}>
            {startingImport ? (
              <View style={GlobalStyles.card}>
                <View
                  style={{
                    ...GlobalStyles.cardHeader,
                    flexDirection: "column",
                    marginBottom: 10,
                    padding: 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Montserrat_Bold",
                      marginBottom: 10,
                      padding: 0,
                    }}
                  >
                    Convertendo seu arquivo
                  </Text>
                  <Text style={GlobalStyles.label}>
                    Esse processo levará algum tempo. Por favor, aguarde...
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    margin: "auto",
                  }}
                >
                  <Text
                    style={{
                      ...GlobalStyles.badge,
                      width: 100,
                      backgroundColor: colors.warrning,
                    }}
                  >
                    A converter
                  </Text>
                  <View
                    style={{
                      ...styles.progressBar,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ActivityIndicator
                      size="large"
                      color={colors.textPrimary}
                    />
                    <Text style={styles.progressText}>{progress}%</Text>
                  </View>
                </View>
              </View>
            ) : (
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
                          Antes de importar uma planilha, certifique-se de que
                          ela está no formato correto.
                        </Text>
                      </Text>

                      <Text style={{ ...GlobalStyles.small, fontSize: 14 }}>
                        São 3 colunas, com o seguinte formato: (Código de barras
                        é obrigatório.)
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
                    onPress={() =>
                      importFileSpreadSheets(setData, limitAccount)
                    }
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
                      <Text style={[styles.title]}>
                        Suas planilha importadas
                      </Text>
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
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default SpreadSheetsImportModal;

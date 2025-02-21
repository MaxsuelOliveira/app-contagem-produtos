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

  // Estados principais
  const [data, setData] = useState([]);
  const [accountType, setAccountType] = useState("free");
  const [importProcessingText , setImportProcessingText] = useState("Selecione um arquivo");
  const [importProcessing, setImportProcessing] = useState(false);
  const [spreadSheetsCount, setSpreadSheetsCount] = useState(0);

  async function getLimitAccount() {
    const typeAccount = await AsyncStorage.getItem("isAccount");
    if (typeAccount === "premium") {
      setAccountType("premium");
    } else {
      setAccountType("free");
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
    <Modal
      visible={isVisible}
      animationType={false}
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={colors.modalCover} />

      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.modalContainer}>
            {importProcessing ? (
              <View style={GlobalStyles.card}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}> {importProcessingText}</Text>
                  <Text style={styles.textDescription}>
                    Esse processo levará algum tempo. Por favor, aguarde...
                  </Text>
                </View>

                <Text style={styles.badge}>A converter</Text>
                <ActivityIndicator size="large" color={colors.textPrimary} />
            
                <Text>
                  {importProcessingText}
                </Text>
              </View>
            ) : (
              <View style={GlobalStyles.card}>
                <View style={GlobalStyles.cardHeader}>
                  <Text style={styles.cardTilte}>Importar</Text>
                  <TouchableOpacity
                    onPress={onClose}
                    style={{ ...GlobalStyles.closeButton }}
                  >
                    <AntDesign
                      name="close"
                      size={28}
                      color={colors.colorIcons}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView>
                  <View style={styles.cardBody}>
                    <Text style={styles.title}>Atenção</Text>

                    <Text style={styles.textDescription}>
                      Antes de importar uma planilha, certifique-se de que ela
                      está no formato correto.
                    </Text>

                    <Text style={styles.textDescription}>
                      São 3 colunas, com o seguinte formato: (Código de barras é
                      obrigatório.)
                    </Text>

                    <Text style={styles.textDescription}>
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
                </ScrollView>

                <View style={styles.cardFooter}>
                  <TouchableOpacity
                    onPress={() => importFileSpreadSheets(setData, accountType , setImportProcessing , setImportProcessingText)}
                    style={styles.buttonImport}
                  >
                    <MaterialCommunityIcons
                      name="google-spreadsheet"
                      size={24}
                      color={"green"}
                    />
                    <Text style={styles.buttonImportText}>
                      Clique e selecione a planilha
                    </Text>

                    <Text style={GlobalStyles.small}>
                      Formatos aceitos: .xls, .xlsx, .csv
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SpreadSheetsImportModal;

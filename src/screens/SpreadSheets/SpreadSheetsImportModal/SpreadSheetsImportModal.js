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
  const [title, setTitle] = useState("Selecione um arquivo");
  const [description, setDescription] = useState(
    "Selecione um arquivo para importar."
  );

  const [fileName, setFileName] = useState("");
  const [fileTamanho, setFileTamanho] = useState("");
  const [fileTimeImporting, setFileTimeImporting] = useState("");

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [accountType, setAccountType] = useState("free");

  const [processing, setProcessing] = useState(false);

  async function getLimitAccount() {
    const typeAccount = await AsyncStorage.getItem("isAccount");
    if (typeAccount === "premium") {
      setAccountType("premium");
    } else {
      setAccountType("free");
    }
  }

  function closeOperating() {
    setProcessing(false);
    setTitle("Selecione um arquivo");
    setDescription("Selecione um arquivo para importar.");
  }

  function FileImport() {
    return (
      <View style={GlobalStyles.card}>
        <View style={GlobalStyles.cardHeader}>
          <Text style={styles.cardTilte}>Importar</Text>
          <TouchableOpacity
            onPress={onClose}
            style={{ ...GlobalStyles.closeButton }}
          >
            <AntDesign name="close" size={28} color={colors.colorIcons} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.cardBody}>
            <Text style={styles.title}>Atenção</Text>

            <Text style={styles.textDescription}>
              Antes de importar uma planilha, certifique-se de que ela está no
              formato correto.
            </Text>

            <Text style={styles.textDescription}>
              São 3 colunas, com o seguinte formato: (Código de barras é
              obrigatório.)
            </Text>

            <Text style={styles.textDescription}>COD BARRA | NOME | PREÇO</Text>

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
            onPress={() =>
              importFileSpreadSheets(
                setData,
                accountType,
                setProcessing,
                setLoading,
                setTitle,
                setDescription
              )
            }
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
    );
  }

  useEffect(() => {
    const fetchAccountType = async () => {
      await getLimitAccount();
    };
    fetchAccountType();
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType="none" // Em vez de false
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={colors.modalCover} />

      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.modalContainer}>
            {processing ? (
              <View style={GlobalStyles.card}>
                <View style={styles.cardHeader}>
                  {loading ? null : (
                    <TouchableOpacity
                      onPress={() => {
                        closeOperating();
                        onClose();
                      }}
                      style={styles.closeButton}
                    >
                      <AntDesign
                        name="close"
                        size={24}
                        color={colors.colorIcons}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.textDescription}>{description}</Text>

                  {loading && (
                    <ActivityIndicator size="large" color={colors.colorIcons} />
                  )}
                </View>
              </View>
            ) : (
              <FileImport />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SpreadSheetsImportModal;

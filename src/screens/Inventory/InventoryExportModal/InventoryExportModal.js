import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect, use } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TouchableOpacity, Button } from "react-native";

import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import * as XLSX from "xlsx";


// import DataTables from "../../../components/Tables";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "../../../services/backend/controller";


// ✅ Passando a navegação como parâmetro
function callbackSuccess(uuid_inventory, navigation) {
  alert(uuid_inventory);

  let date_end = new Date();
  Controller.Inventory.update(uuid_inventory, "done", date_end)
    .then((response) => {
      console.log(response);
      Alert.alert("Inventário finalizado com sucesso!");
      navigation.navigate("Home"); // ✅ Agora a navegação é passada corretamente!
    })
    .catch((error) => {
      console.error("Erro ao atualizar o inventário");
      console.error(error);
    });
}

// Exportar planilha
export const exportSpreadSheets = async (data) => {
  try {
    Alert.alert("Gerando planilha, aguarde...");

    // Criar a planilha
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EstoqueFácil");

    // Converter para um arquivo binário
    const excelBinary = XLSX.write(workbook, {
      type: "base64",
      bookType: "xlsx",
    });

    // Definir o caminho do arquivo
    const fileUri = `${FileSystem.documentDirectory}planilha.xlsx`;

    // Salvar o arquivo
    await FileSystem.writeAsStringAsync(fileUri, excelBinary, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;
  } catch (error) {
    Alert.alert("Erro ao gerar a planilha:", error);
  }
};

// ✅ Atualizado para passar a navegação corretamente
export const downloadSpreadSheet = async (data, uuid_inventory, navigation) => {
  const fileUri = await exportSpreadSheets(data);
  if (fileUri) {
    alert("Arquivo salvo em: " + fileUri);
    callbackSuccess(uuid_inventory, navigation);
  }
};

// ✅ Atualizado para passar a navegação corretamente
export const shareSpreadSheet = async (data, uuid_inventory, navigation) => {
  const fileUri = await exportSpreadSheets(data);
  if (fileUri) {
    await Sharing.shareAsync(fileUri);
    callbackSuccess(uuid_inventory, navigation);
  }
};

const InventoryExportModal = ({ isVisible, onClose, uuidInventory }) => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Controller.Inventory.export(uuidInventory)
      .then((products) => {
        if (products) {
          setProducts(products);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar inventário", error);
      });
  }, [uuidInventory]);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={colors.modalCover} />

      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.card}>
            <View style={{ ...GlobalStyles.cardHeader, marginTop: 0 }}>
              <Text style={{ ...GlobalStyles.cardTitle, marginTop: 0 }}>
                Exportar inventário
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <View style={{ ...styles.grid, width: "100%" }}>
                <Text
                  style={{
                    ...GlobalStyles.value,
                    textAlign: "justify",
                    marginBottom: 10,
                    fontSize: 14,
                  }}
                >
                  A planilha seguira o layout :
                </Text>

                {/* <DataTables /> */}

                <Text
                  style={{
                    ...GlobalStyles.label,
                    textAlign: "justify",
                    marginTop: 10,
                    fontSize: 13,
                  }}
                >
                  Layout da planilha para a exportação, não se preocupe os
                  campos não precisam ser preenchidos totalmente.
                </Text>
              </View>

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
                onPress={() => shareSpreadSheet(products, uuidInventory, navigation)}
              >
                <Text style={GlobalStyles.buttonText}>Exportar inventário</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InventoryExportModal;

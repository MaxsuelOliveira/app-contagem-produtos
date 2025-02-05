import { useNavigation } from "@react-navigation/native";
import React, { useState, useRef, useEffect, use } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TouchableOpacity, Button } from "react-native";

import DataTables from "../../../components/Tables";

import ExportExcel from "../../../utils/exportExcel";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "../../../services/backend/controller";

import { downloadExcel, shareExcel } from "../../../utils/exportExcel"; // Importando a função

const InvetoryExportModal = ({ isVisible, onClose, uuidInventory }) => {
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
  }, []);

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
                  }}
                >
                  A planilha será exportada com o seguinte layout
                </Text>

                <DataTables />

                <Text
                  style={{
                    ...GlobalStyles.label,
                    textAlign: "justify",
                    marginTop: 10,
                  }}
                >
                  Layout da planilha para a exportação, não se preocupe os
                  campos não precisam ser preenchidos totalmente.
                </Text>
              </View>

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
                onPress={() =>
                  exportInventory({
                    uuidInventory,
                  })
                }
              >
                <Text style={GlobalStyles.buttonText}>Exportar inventário</Text>
              </TouchableOpacity>

              <Button
                title="Baixar Planilha"
                onPress={() => downloadExcel(products, uuidInventory)}
              />
              <Button
                title="Compartilhar Planilha"
                onPress={() => shareExcel(products, uuidInventory)}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InvetoryExportModal;

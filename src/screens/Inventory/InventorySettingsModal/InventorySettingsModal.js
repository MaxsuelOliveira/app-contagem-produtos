import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "../../../services/backend/controller";

const InventorySettingssModal = ({ isVisible, onClose, uuidInventory }) => {
  const [isBuyWithSpreadsheet, setIsBuyWithSpreadsheet] = useState(false);
  const toggleSwitchSpreadsheet = () =>
    setIsBuyWithSpreadsheet((previousState) => !previousState);

  useEffect(() => {
    Controller.Inventory.getUUID(uuidInventory)
      .then((inventory) => {
        inventory = inventory[0];
        setIsBuyWithSpreadsheet(inventory.compare_in_spreadsheet);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }, []);

  const updateSettings = () => {
    Alert.alert(isBuyWithSpreadsheet);

    Controller.Inventory.updateCompareInSpreadSheets(
      uuidInventory,
      isBuyWithSpreadsheet
    )
      .then((inventory) => {
        Alert.alert("Inventário atualizado com sucesso!");
        onClose();
      })
      .catch((error) => {
        Alert.alert("Erro atualizar inventorio !" + error);
      });
  };

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
            <View style={GlobalStyles.cardHeader}>
              <Text style={styles.cardTitle}>Configurações do inventário</Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.cardBody}>
              <View style={styles.grid}>
                <Text style={styles.title}>Comparação de produtos.</Text>
                <View style={styles.section}>
                  <Text style={styles.label}>
                    Ao habilitar, Só será possível adicionar produtos que
                    constam nas planilhas importadas.
                  </Text>

                  <View style={styles.settingsItem}>
                    <Text style={styles.value}>
                      {isBuyWithSpreadsheet ? "Habilitado" : "Desabilitado"}
                    </Text>

                    <Switch
                      trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
                      thumbColor={true ? "#4d8eea" : "#bfbfbf"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitchSpreadsheet}
                      value={isBuyWithSpreadsheet}
                    />
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => updateSettings()}
              >
                <Text style={GlobalStyles.buttonText}>
                  Salvar configurações
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InventorySettingssModal;

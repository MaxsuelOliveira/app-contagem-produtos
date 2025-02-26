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
  ActivityIndicator,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "@services/backend/controller";
import { TextInput } from "react-native-gesture-handler";

const InventorySettingsModal = ({ isVisible, onClose, uuidInventory }) => {
  const [loading, setLoading] = useState(false);
  const [SpreadsheetLength, setSpreadsheetLength] = useState(false);

  const [isBuyWithSpreadsheet, setIsBuyWithSpreadsheet] = useState(false);
  const [additionalFields, setAdditionalFields] = useState(false);
  const [defaultQuantity, setDefaultQuantity] = useState(0);
  const [defaultQuantityEnabled, setDefaultQuantityEnabled] = useState(false);

  const toggleSwitchSpreadsheet = () =>
    setIsBuyWithSpreadsheet((previousState) => {
      if (SpreadsheetLength) {
        return false;
      }
      return !previousState;
    });

  const toggleSwitchAdditionalFields = () =>
    setAdditionalFields((previousState) => {
      return !previousState;
    });

  const toggleSwitchQuantity = () =>
    setDefaultQuantityEnabled((previousState) => {
      return !previousState;
    });

  const updateSettings = () => {
    setLoading(true);

    const properties = {
      compare_in_spreadsheet: isBuyWithSpreadsheet,
      compare_price: isBuyWithSpreadsheet,
      compare_quantity: defaultQuantityEnabled,
      quantity_default: parseInt(defaultQuantity),
      inputs_habilitated: additionalFields,
    };

    Controller.Inventory.updateProperties(uuidInventory, properties)
      .then((inventory) => {
        console.log(inventory);

        setTimeout(() => {
          setLoading(false);
        }, 300);

        onClose();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        Alert.alert("Houve um erro ao atualizar inventário !", error);
      });
  };

  function setInventory() {
    Controller.Inventory.getUUID(uuidInventory)
      .then((inventory) => {
        const {
          quantity_default,
          compare_quantity,
          compare_in_spreadsheet,
          inputs_habilitated,
        } = inventory[0].properties;
        setDefaultQuantity(quantity_default);
        setDefaultQuantityEnabled(compare_quantity);
        setIsBuyWithSpreadsheet(compare_in_spreadsheet);
        setAdditionalFields(inputs_habilitated);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    setInventory();
  }, []);

  useEffect(() => {
    Controller.SpreadSheets.count()
      .then((total) => {
        if (total == 0) {
          setSpreadsheetLength(true);
          return;
        }
        setSpreadsheetLength(false);
      })
      .catch((error) => {
        return Promise.reject(error);
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
          <View style={GlobalStyles.modalContainer}>
            <View style={GlobalStyles.card}>
              <View style={GlobalStyles.cardHeader}>
                <Text style={styles.cardTitle}>Configurações</Text>
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

                    <View style={styles.settingsContent}>
                      <Text style={styles.value}>
                        {isBuyWithSpreadsheet ? "Habilitado" : "Desabilitado"}
                      </Text>

                      <Switch
                        trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
                        thumbColor={
                          isBuyWithSpreadsheet ? "#4d8eea" : "#bfbfbf"
                        }
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchSpreadsheet}
                        value={isBuyWithSpreadsheet}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.grid}>
                  <Text style={styles.title}>Edição de produtos.</Text>
                  <View style={styles.section}>
                    <Text style={styles.label}>
                      Ao habilitar, será possível editar campos adicionais dos
                      produtos.
                    </Text>

                    <View style={styles.settingsContent}>
                      <Text style={styles.value}>
                        {additionalFields ? "Editável" : "Não editável"}
                      </Text>

                      <Switch
                        trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
                        thumbColor={additionalFields ? "#4d8eea" : "#bfbfbf"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitchAdditionalFields}
                        value={additionalFields}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.grid}>
                  <Text style={styles.title}>Quantidade padrão.</Text>

                  <View style={styles.section}>
                    <Text style={styles.label}>
                      O valor padrão para quantidade de produtos.
                    </Text>

                    <View
                      style={{
                        ...styles.settingsContent,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={styles.settingsItem}>
                        <Text style={styles.value}>
                          {defaultQuantityEnabled
                            ? "Habilitado"
                            : "Não Habilitado"}
                        </Text>

                        <Switch
                          trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
                          thumbColor={
                            defaultQuantityEnabled ? "#4d8eea" : "#bfbfbf"
                          }
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitchQuantity}
                          value={defaultQuantityEnabled}
                        />
                      </View>
                      {defaultQuantityEnabled && (
                        <View style={{}}>
                          <Text style={styles.label}>Qnt Padrão:</Text>
                          <TextInput
                            style={styles.inputQnt}
                            placeholder="0"
                            value={defaultQuantity}
                            onChangeText={setDefaultQuantity}
                            keyboardType="numeric"
                          />
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={GlobalStyles.cardFooter}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => updateSettings()}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={GlobalStyles.buttonText}>Atualizar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InventorySettingsModal;

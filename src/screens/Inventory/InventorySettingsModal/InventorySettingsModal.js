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
  const [planilhaLength, setPlanilhaLength] = useState(false);
  const [isBuyWithSpreadsheet, setIsBuyWithSpreadsheet] = useState(false);
  const [additionalFields, setAdditionalFields] = useState(false);

  const toggleSwitchSpreadsheet = () =>
    setIsBuyWithSpreadsheet((previousState) => {
      if (planilhaLength) {
        return false;
      }
      return !previousState;
    });

  const toggleSwitchAdditionalFields = () =>
    setAdditionalFields((previousState) => {
      return !previousState;
    });

  const updateSettings = () => {
    setLoading(true);

    Controller.Inventory.updateCompareInSpreadSheets(
      uuidInventory,
      isBuyWithSpreadsheet
    )
      .then((inventory) => {
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

  useEffect(() => {
    Controller.SpreadSheets.count()
      .then((total) => {
        if (total == 0) {
          setPlanilhaLength(true);
          return;
        }
        setPlanilhaLength(false);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }, []);

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

  return (
    <Modal
      visible={isVisible}
      animationType="none"
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

                    <View style={styles.settingsItem}>
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

                    <View style={styles.settingsItem}>
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
                        ...styles.settingsItem,
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "50%",
                          gap: 0,
                          height: 50,
                        }}
                      >
                        <Text style={styles.value}>
                          {additionalFields ? "Habilitado" : "Não Habilitado"}
                        </Text>

                        <Switch
                          trackColor={{ false: "#bfbfbf", true: "#4d8eea" }}
                          thumbColor={additionalFields ? "#4d8eea" : "#bfbfbf"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={toggleSwitchAdditionalFields}
                          value={additionalFields}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "column",
                          alignItems: "flex-end",
                          width: "50%",
                        }}
                      >
                        <Text style={styles.label}>Qnt:</Text>
                        <TextInput
                          style={{
                            ...GlobalStyles.input,
                            width: 55,
                            height: 35,
                            fontSize: 16,
                            textAlign: "center",
                          }}
                          placeholder="0"
                          // value={defaultQuantity}
                          // onChangeText={setDefaultQuantity}
                          keyboardType="numeric"
                        />
                      </View>
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
                    <Text style={GlobalStyles.buttonText}>Salvar</Text>
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

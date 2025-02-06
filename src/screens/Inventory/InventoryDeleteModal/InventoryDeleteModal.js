import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Controller
import { Controller } from "../../../services/backend/controller";

const InventoryDeleteModal = ({ isVisible, onClose, uuidInventory }) => {
  function removerInventory() {
    Controller.Inventory.remover(uuidInventory)
      .then((response) => {
        Alert.alert("Inventário apagado com sucesso !");
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao apagar o inventário. : " + error);
      });
  }

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
          <View style={styles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={styles.cardTitle}>Apagar inventário</Text>
            </View>

            <View style={GlobalStyles.cardBody}>
              <Text style={styles.textConfirm}>
                Deseja realmente apagar o inventário ?
              </Text>
              <Text style={GlobalStyles.label}>
                Atenção ! Essa ação não poderá ser desfeita, todos os produtos
                serão apagados.
              </Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={{ ...styles.button, width: "30%" }}
                  onPress={onClose}
                >
                  <Text style={GlobalStyles.value}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...GlobalStyles.button,
                    backgroundColor: colors.danger,
                    width: "70%",
                  }}
                  onPress={removerInventory}
                >
                  <Text style={GlobalStyles.buttonText}>
                    Sim, apagar o inventário
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default InventoryDeleteModal;

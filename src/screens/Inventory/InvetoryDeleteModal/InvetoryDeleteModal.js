import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

// Controller
import { Controller } from "../../../services/DB/controller";

const InvetoryDeleteModal = ({ isVisible, onClose, uuidInventory }) => {

  function removerInventory() {
    Controller.Inventory.remover(uuidInventory)
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao apagar o inventário !");
        console.error(error);
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

      {/* Fundo semi-transparente para modal */}
      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={[GlobalStyles.card, styles.card]}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={{ ...GlobalStyles.cardTitle, marginTop: 0 }}>
                Apagar inventário
              </Text>
            </View>

            <View style={GlobalStyles.cardBody}>
              <Text style={{ ...GlobalStyles.value, marginBottom: 10 }}>
                Deseja realmente apagar o inventário ?
              </Text>
              <Text style={GlobalStyles.label}>
                Atenção ! Essa ação não poderá ser desfeita, todos os produtos
                serão apagados.
              </Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={{ ...styles.button , width: "30%" }}
                  onPress={onClose}
                >
                  <Text  style={GlobalStyles.value}>Cancelar</Text>
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

const styles = StyleSheet.create({
  card: {
    width: "95%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginTop: "50%",
    borderRadius: 50,
  },

  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  button : {
    ...GlobalStyles.button,
    backgroundColor: colors.light,
    width: "100%"
  }
});

export default InvetoryDeleteModal;

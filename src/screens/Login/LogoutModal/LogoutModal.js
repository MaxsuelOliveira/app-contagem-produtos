import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

const LogoutModal = ({ isVisible, onClose, uuidInventory }) => {
  const navigation = useNavigation();

  async function logout() {
    await AsyncStorage.removeItem("token");
    onClose();
    navigation.navigate("Login");
  }

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
          <View style={styles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={styles.cardTitle}>Sair do EstoqueFácil</Text>
            </View>

            <View style={GlobalStyles.cardBody}>
              <Text style={styles.value}>
                Deseja realmente sair do EstoqueFácil ?
              </Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.buttonCancelar}
                  onPress={onClose}
                >
                  <Text style={styles.value}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDanger} onPress={logout}>
                  <Text style={GlobalStyles.buttonText}>
                    Sair
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

export default LogoutModal;

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

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
                Sair do EstoqueFácil
              </Text>
            </View>

            <View style={GlobalStyles.cardBody}>
              <Text style={{ ...GlobalStyles.value, marginBottom: 10 }}>
                Deseja realmente sair do EstoqueFácil ?
              </Text>
              <Text style={GlobalStyles.label}>
                Atenção ! Você será desconectado e terá que fazer login
                novamente.
              </Text>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={{ ...styles.button, width: "30%" }}
                  onPress={onClose}
                >
                  <Text style={{...GlobalStyles.value , fontSize : 13}}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...GlobalStyles.button,
                    backgroundColor: colors.danger,
                    width: "70%",
                  }}
                  onPress={logout}
                >
                  <Text style={GlobalStyles.buttonText}>
                    Sair do EstoqueFácil
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
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },

  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  button: {
    ...GlobalStyles.button,
    backgroundColor: colors.light,
    width: "100%",
  },
});

export default LogoutModal;

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles, colors } from "../../styles/GlobalStyles";

const add = (params) => {
  const { isBuyWithModeFast, isBuyWithSpreadsheet, isBuyWithPrices } = params;

  console.log(isBuyWithModeFast ? "Modo rápido : Sim " : "Modo rápido : Não");
  console.log(
    isBuyWithSpreadsheet ? "Comparar planilha : Sim" : "Comparar planilha : Não"
  );
  console.log(isBuyWithPrices ? "Comprar preço : Sim" : "Comprar preço : Não");
  // onClose();
};

const ModalInvetorySettings = ({ isVisible, onClose }) => {

  const [isBuyWithSpreadsheet, setIsBuyWithSpreadsheet] = useState(false);

  const toggleSwitchSpreadsheet = () => setIsBuyWithSpreadsheet((previousState) => !previousState);

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
          <View style={GlobalStyles.card}>
            {/* CardHeader */}
            <View style={GlobalStyles.cardHeader}>
              <Text style={GlobalStyles.cardTitle}>
                Configurações do inventário
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
              </TouchableOpacity>
            </View>

            {/* Formulário */}
            <ScrollView style={styles.cardBody}>
              {/* verificar_produto_planilha */}
              <View style={styles.grid}>
                <Text style={styles.title}>
                  Configurações de comparação com a planilha.
                </Text>

                <View style={styles.section}>
                  <Text style={[GlobalStyles.label, styles.label]}>
                    Habilitar a comparação de produtos com a planilha importada
                    ?
                  </Text>
                  <Switch
                    // trackColor={{ false: "#767577", true: "#81b0ff" }}
                    // thumbColor={isBuyWithPrices ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchSpreadsheet}
                    value={isBuyWithSpreadsheet}
                  />
                </View>
                <Text style={GlobalStyles.small}>
                  Ao habilitar, Só será possível adicionar produtos que constam
                  na planilha.
                </Text>
              </View>

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
                onPress={() =>
                  add({
                    isBuyWithModeFast,
                    isBuyWithSpreadsheet,
                    isBuyWithPrices,
                  })
                }
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

const styles = StyleSheet.create({
  grid: {
    width: "100%",
    marginBottom: 10,
    marginTopp: 0,
  },

  section: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  textJustify: {
    textAlign: "justify",
  },

  label: {
    flex: 1,
    color: colors.colorText,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: colors.colorText,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default ModalInvetorySettings;

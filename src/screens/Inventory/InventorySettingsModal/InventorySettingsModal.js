import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

const add = (params) => {
  const { isBuyWithModeFast, isBuyWithSpreadsheet, isBuyWithPrices } = params;

  console.log(isBuyWithModeFast ? "Modo rápido : Sim " : "Modo rápido : Não");
  console.log(
    isBuyWithSpreadsheet ? "Comparar planilha : Sim" : "Comparar planilha : Não"
  );
  console.log(isBuyWithPrices ? "Comprar preço : Sim" : "Comprar preço : Não");
  // onClose();
};

const InventorySettingsModal = ({ isVisible, onClose }) => {
  const [isBuyWithSpreadsheet, setIsBuyWithSpreadsheet] = useState(false);

  const toggleSwitchSpreadsheet = () =>
    setIsBuyWithSpreadsheet((previousState) => !previousState);

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
              <Text style={{...GlobalStyles.cardTitle , marginTop : 0 , fontSize : 17}}>
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
                <Text style={{...GlobalStyles.small , textAlign : "justify"}}>
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

export default InventorySettingsModal;

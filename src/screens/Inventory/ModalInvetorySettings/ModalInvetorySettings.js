import React, { useState } from "react";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
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
import { GlobalStyles, lightTheme } from "../../../styles/GlobalStyles";
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
  // Valores vem do banco de dados do invetário !

  const [codebar, setCodebar] = useState(false);
  const toggleCodebar = () => setCodebar((previousState) => !previousState);

  const [quantity, setQuantity] = useState(false);
  const toggleQuantity = () => setQuantity((previousState) => !previousState);

  const [name, setName] = useState(false);
  const toggleName = () => setName((previousState) => !previousState);

  const [price, setPrice] = useState(false);
  const togglePrice = () => setPrice((previousState) => !previousState);

  const [inconsistency, setInconsistency] = useState(false);
  const toggleInconsistency = () =>
    setInconsistency((previousState) => !previousState);

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
      <StatusBar style="auto" backgroundColor={lightTheme.modalCover} />

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
                <AntDesign
                  name="close"
                  size={28}
                  color={lightTheme.colorIcons}
                />
              </TouchableOpacity>
            </View>

            {/* Formulário */}
            <ScrollView style={styles.cardBody}>
              {/*  DESABILITADO : Campos para o modal de cadastro de produtos */}
              <View style={{ ...styles.grid, width: "100%", display: "none" }}>
                <Text style={styles.title}>
                  Configurações de adição de produtos ao inventário.
                </Text>

                <View>
                  <Text style={[GlobalStyles.label, styles.label]}>
                    Os campos abaixo serão habilitados para adicionar produtos
                    ao invetário.
                  </Text>

                  {/* codebar */}
                  <View style={styles.section}>
                    <Text style={[GlobalStyles.label, styles.label]}>
                      Código de barras
                    </Text>
                    <Switch
                      // trackColor={{ false: "#767577", true: "#81b0ff" }}
                      // thumbColor={isBuyWithPrices ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleCodebar}
                      value={codebar}
                      disabled
                    />
                  </View>

                  {/* quantity */}
                  <View style={styles.section}>
                    <Text style={[GlobalStyles.label, styles.label]}>
                      Quantidade
                    </Text>
                    <Switch
                      // trackColor={{ false: "#767577", true: "#81b0ff" }}
                      // thumbColor={isBuyWithPrices ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleQuantity}
                      value={quantity}
                    />
                  </View>

                  {/* name */}
                  <View style={styles.section}>
                    <Text style={[GlobalStyles.label, styles.label]}>Nome</Text>
                    <Switch
                      // trackColor={{ false: "#767577", true: "#81b0ff" }}
                      // thumbColor={isBuyWithPrices ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleName}
                      value={name}
                    />
                  </View>

                  {/* price */}
                  <View style={styles.section}>
                    <Text style={[GlobalStyles.label, styles.label]}>
                      Preço
                    </Text>
                    <Switch
                      // trackColor={{ false: "#767577", true: "#81b0ff" }}
                      // thumbColor={isBuyWithPrices ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={togglePrice}
                      value={price}
                    />
                  </View>

                  {/* inconsistency */}
                  <View style={styles.section}>
                    <Text style={[GlobalStyles.label, styles.label]}>
                      Inconsistência
                    </Text>
                    <Switch
                      // trackColor={{ false: "#767577", true: "#81b0ff" }}
                      // thumbColor={isBuyWithPrices ? "#f5dd4b" : "#f4f3f4"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleInconsistency}
                      value={inconsistency}
                    />
                  </View>
                </View>

                <Text style={[GlobalStyles.small, styles.textJustify]}>
                  Ao habilitar esta opção, o sistema irá habilitar os campos
                  para adicionar produtos ao inventário.
                </Text>
              </View>

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
    color: lightTheme.colorText,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: lightTheme.colorText,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default ModalInvetorySettings;

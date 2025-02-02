import React, { useState } from "react";
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
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles, lightTheme } from "../../../styles/GlobalStyles";

const update = (params) => {
  const {
    uuidInvetory,
    productCodebar,
    productAmount,
    productName,
    productPrice,
    isChecked,
  } = params;

  Alert.alert("Alterando o produto ...", "");
  console.log("Código de barras: ", productCodebar);
  console.log("Quantidade: ", productAmount);
  console.log("Nome do produto: ", productName);
  console.log("Preço: ", productPrice);
  console.log(isChecked ? "Sim" : "Não");
  console.log("Adicionado ao inventário");
  // onClose();
};

const ModalProductUpdate = ({ isVisible, onClose }) => {
  // Pegando os dados do produto.
  // Preenchendo os campos do formulário com os dados do produto.

  const [productCodebar, setProductCodebar] = useState(0);
  const [productAmount, setProductAmount] = useState(0);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  // const [productInconsistency, setProductInconsistency] = useState(false);
  const [isChecked, setChecked] = useState(false);

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
            <View style={GlobalStyles.cardHeader}>
              <Text style={GlobalStyles.cardTitle}>
                Atualizar produto no inventário
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
            <View style={styles.cardBody}>
              {/* Código de barras */}
              <View style={{ ...styles.grid, width: "60%" }}>
                <View>
                  <Text style={GlobalStyles.label}>Código de barras*</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder=""
                    focusable={true}
                    maxLength={150}
                    value={productCodebar}
                    onChangeText={setProductCodebar}
                    keyboardType="numeric"
                    placeholderTextColor="gray"
                  />
                </View>
              </View>

              {/* Quantidade */}
              <View style={{ ...styles.grid, width: "35%" }}>
                <View>
                  <Text style={GlobalStyles.label}>Quantidade*</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="0"
                    maxLength={255}
                    keyboardType="numeric"
                    placeholderTextColor="gray"
                    value={productAmount}
                    onChangeText={setProductAmount}
                  />
                </View>
              </View>

              {/* Nome do produto */}
              <View style={{ ...styles.grid, width: "60%" }}>
                <View>
                  <Text style={GlobalStyles.label}>Nome do produto</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="..."
                    maxLength={255}
                    keyboardType="default"
                    placeholderTextColor="gray"
                    value={productName}
                    onChangeText={setProductName}
                  />
                </View>
              </View>

              {/* Preço do produto */}
              <View style={{ ...styles.grid, width: "35%" }}>
                <View>
                  <Text style={GlobalStyles.label}>Preço R$</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder="..."
                    maxLength={255}
                    keyboardType="decimal-pad"
                    placeholderTextColor="gray"
                    value={productPrice}
                    onChangeText={setProductPrice}
                  />
                </View>
              </View>

              {/* Inconsistência */}
              <View style={{ ...styles.grid, width: "100%" }}>
                <View style={styles.section}>
                  <Text style={GlobalStyles.label}>
                    Alguma inconsistência no produto?
                  </Text>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                  />
                </View>
                <Text style={GlobalStyles.small}>
                  Exemplo de inconsistência : Produto com valor diferente do que
                  está na etiqueta.
                </Text>
              </View>

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
                onPress={() =>
                  update({
                    productCodebar,
                    productAmount,
                    productName,
                    productPrice,
                    isChecked,
                  })
                }
              >
                <Text style={GlobalStyles.buttonText}>
                  Adicionar ao inventário
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  grid: {
    display: "flex",
    gap: 10,
    marginBottom: 0,
    marginTopp: 0,
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ModalProductUpdate;

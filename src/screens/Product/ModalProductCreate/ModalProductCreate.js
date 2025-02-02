import React, { useState, useEffect, useRef } from "react";
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

const ModalProductCreate = ({ isVisible, onClose, compareInSpreadsheet, inputs }) => {
  const [productCodebar, setProductCodebar] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productInconsistency, setProductInconsistency] = useState(false);
  const [productsInventory, setProductsInventory] = useState([]);
  const [produtoEncontrado, setProdutoEncontrado] = useState(false); // Novo estado
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  // DESABILITADA NESSA VERSÃO
  // const codebar = inputs.codebar;
  // const quantity = inputs.amout;
  // const name = inputs.name;
  // const price = inputs.price;
  // const inconsistency = inputs.inconsistency;

  // **Carregar os produtos ao abrir o modal**
  useEffect(() => {
    if (isVisible) {
      console.log("Carregando produtos do inventário...");
      setProductsInventory([
        { codebar: "123456789", name: "Produto 1", price: 10.0 },
        { codebar: "987654321", name: "Produto 2", price: 20.0 },
      ]);
    }
  }, [isVisible]);

  // **Verifica se o produto existe no inventário**
  const verificarSeOProdutoExiste = (codebar) => {
    // Atualiza o estado do código de barras
    setProductCodebar(codebar);

    if (!codebar.trim()) {
      setProdutoEncontrado(false);
      return;
    }

    if (compareInSpreadsheet) {
      const produto = productsInventory.find(
        (item) => item.codebar.trim() === codebar.trim()
      );

      if (produto) {
        // Se o campo estiver vazio, não precisa verificar
        setDisabledButton(false);
        setVisibleInputs(true);
        setProductName(produto.name);
        setProductPrice(produto.price.toString());
        setProdutoEncontrado(true);
      } else {
        setProductName("");
        setProductPrice("");
        setDisabledButton(true);
        setProdutoEncontrado(false);
        setVisibleInputs(false);
        Alert.alert("Produto não encontrado!");
      }
    } else {
      console.log("Modo rápido ativado. Produto não precisa ser verificado.");
      setVisibleInputs(true);
      setDisabledButton(false);
    }
  };

  const add = () => {
    console.log("Código de barras: ", productCodebar);
    console.log("Quantidade: ", productAmount);
    console.log("Nome do produto: ", productName);
    console.log("Preço: ", productPrice);
    console.log("Inconsistência: ", productInconsistency ? "Sim" : "Não");

    Alert.alert("Produto salvo no inventário!");
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={lightTheme.modalCover} />

      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={GlobalStyles.cardTitle}>Novo produto</Text>
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

            <View style={styles.cardBody}>
              {/* Código de barras */}
              <View
                style={{
                  ...styles.grid,
                  width: visibleInputs ? "60%" : "100%",
                }}
              >
                <Text style={GlobalStyles.label}>Código de barras*</Text>
                <TextInput
                  style={GlobalStyles.input}
                  maxLength={150}
                  value={productCodebar}
                  onChangeText={verificarSeOProdutoExiste}
                  keyboardType="numeric"
                  placeholderTextColor="gray"
                />
              </View>

              {/* Quantidade */}
              {/* // Se o código de barras for preenchido, exibe os campos de quantidade, e inconsistência */}
              {visibleInputs ? (
                <View style={{ ...styles.grid, width: "35%" }}>
                  <Text style={GlobalStyles.label}>Quantidade*</Text>
                  <TextInput
                    autoFocus={true}
                    style={GlobalStyles.input}
                    maxLength={255}
                    keyboardType="numeric"
                    value={productAmount}
                    onChangeText={setProductAmount}
                    placeholderTextColor="gray"
                  />
                </View>
              ) : null}

              {/* Nome e Preço (aparece se comparar estiver ativo) */}
              {produtoEncontrado && (
                <>
                  <View style={{ ...styles.grid, width: "60%" }}>
                    <Text style={GlobalStyles.label}>Nome do produto</Text>
                    <TextInput
                      style={[
                        GlobalStyles.input,
                        !produtoEncontrado && styles.disabledInput,
                      ]}
                      maxLength={255}
                      value={productName}
                      onChangeText={setProductName}
                      keyboardType="default"
                      editable={produtoEncontrado} // Bloqueia se não encontrar o produto
                      placeholderTextColor="gray"
                    />
                  </View>

                  <View style={{ ...styles.grid, width: "35%" }}>
                    <Text style={GlobalStyles.label}>Preço R$</Text>
                    <TextInput
                      style={[
                        GlobalStyles.input,
                        !produtoEncontrado && styles.disabledInput,
                      ]}
                      maxLength={255}
                      keyboardType="decimal-pad"
                      value={productPrice}
                      onChangeText={setProductPrice}
                      editable={produtoEncontrado} // Bloqueia se não encontrar o produto
                      placeholderTextColor="gray"
                    />
                  </View>
                </>
              )}

              {/* Inconsistência */}
              {visibleInputs ? (
                <View style={{ ...styles.grid, width: "100%" }}>
                  <View style={styles.section}>
                    <Text style={GlobalStyles.label}>
                      Alguma inconsistência no produto?
                    </Text>
                    <Checkbox
                      style={styles.checkbox}
                      value={productInconsistency}
                      onValueChange={setProductInconsistency}
                    />
                  </View>
                  <Text style={GlobalStyles.small}>
                    Exemplo de inconsistência: Produto com valor diferente do
                    que está na etiqueta.
                  </Text>
                </View>
              ) : null}

              {/* Botão de adicionar */}
              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
                onPress={add}
                disabled={!produtoEncontrado}
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
    marginBottom: 0,
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
  disabledInput: {
    backgroundColor: "#ddd", // Cinza para indicar que está desativado
    color: "#888", // Cinza escuro para o texto
  },
});

export default ModalProductCreate;

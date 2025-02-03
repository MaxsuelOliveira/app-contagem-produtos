import React, { useState, useEffect, useRef } from "react";
import uuid from "react-native-uuid";
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
import { GlobalStyles, lightTheme } from "../../styles/GlobalStyles";

// Backend
import { Controller } from "../../utils/DB/controller";

const ModalProductCreate = ({
  isVisible,
  onClose,
  compareInSpreadsheet,
  uuidInventory,
  inputs,
}) => {
  const [productsSpreadsheets, setProductsSpreadsheets] = useState([]);

  const [codebar, setCodebar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inconsistency, setInconsistency] = useState(false);

  const [produtoEncontrado, setProdutoEncontrado] = useState(false); // Novo estado
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  // Buscando os produtos da planilha (simulação).
  useEffect(() => {
    if (isVisible) {
      console.log("Carregando produtos do inventário...");
      setProductsSpreadsheets([
        { codebar: "123456789", name: "Produto 1", price: 10.0 },
        { codebar: "987654321", name: "Produto 2", price: 20.0 },
      ]);
    }
  }, [isVisible]);

  const checkProductSpreadsheet = (codebar) => {
    setCodebar(codebar);

    if (!codebar.trim()) {
      setProdutoEncontrado(false);
      return;
    }

    if (compareInSpreadsheet) {
      const produto = productsSpreadsheets.find(
        (item) => item.codebar.trim() === codebar.trim()
      );

      if (produto) {
        setDisabledButton(false);
        setVisibleInputs(true);
        setName(produto.name);
        setPrice(produto.price.toString());
        setProdutoEncontrado(true);
        return;
      } else {
        setName("");
        setPrice("");
        setDisabledButton(true);
        setProdutoEncontrado(false);
        setVisibleInputs(false);
        console.log("Produto não encontrado na planilha importada.");
        return;
      }

      return;
    }
    // Se não for para comparar com a planilha, exibe os campos de quantidade e inconsistência
    setVisibleInputs(true);
    setDisabledButton(false);
  };

  // **Adiciona o produto ao inventário**
  const create = (codebar, quantity, name, price, inconsistency) => {
    const product = {
      uuid: uuid.v4(),
      codebar: codebar,
      quantity: quantity ? parseFloat(quantity) : 0,
      price: price ? parseFloat(price) : 0,
      inconsistency: inconsistency ? true : false,
    };

    Controller.Product.create(uuidInventory, product)
      .then((product) => {
        // Resetando os campos
        setCodebar("");
        setQuantity("");
        setName("");
        setPrice("");
        setInconsistency(false);

        console.log("Produto salvo no inventário:");
        console.log(product);
      })
      .catch((error) => {
        Alert.alert(error);
      });
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
                  value={codebar}
                  onChangeText={checkProductSpreadsheet}
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
                    value={quantity}
                    onChangeText={setQuantity}
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
                      value={name}
                      onChangeText={setName}
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
                      value={price}
                      onChangeText={setPrice}
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
                      value={inconsistency}
                      onValueChange={setInconsistency}
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
                onPress={() => {
                  create(codebar, quantity, name, price, inconsistency);
                }}
                disabled={compareInSpreadsheet === false ? false : true}
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

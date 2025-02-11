import React, { useState, useEffect, useMemo } from "react";
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

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "../../../services/backend/controller";
import { Switch } from "react-native-gesture-handler";

const ProductCreateModal = ({
  isVisible,
  onClose,
  compareInSpreadsheet,
  uuidInventory,
}) => {
  const [loading, setLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const [productsSpreadsheets, setProductsSpreadsheets] = useState([]);

  // Inputs
  const [codebar, setCodebar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inconsistency, setInconsistency] = useState(false);

  // Focus
  const [focusInCodebar, setFocusInCodebar] = useState(true);
  const [focusInQuantity, setFocusInQuantity] = useState(true);

  // Labels
  const [quantityLabel, setQuantityLabel] = useState(false);

  // Buttons
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (compareInSpreadsheet) {
      Controller.SpreadSheets.getAll().then((response) => {
        const produtos = response.flatMap((item) =>
          item.products.map((produto) => ({
            codebar: produto.codebar,
            name: produto.name,
            price: produto.price,
          }))
        );

        setProductsSpreadsheets(produtos);
      });
    }
  }, [isVisible]);

  const checkProductSpreadsheet = (codebarInput) => {
    const trimmedCodebar = codebarInput.trim();
    setCodebar(trimmedCodebar);

    // Foco no campo de quantidade
    setFocusInQuantity(true);

    // Se o código de barras for vazio, reseta os valores
    if (!trimmedCodebar) {
      setError("Código de barras é obrigatório.");
      resetValues();
      return;
    }

    if (compareInSpreadsheet) {
      const produto = productsSpreadsheets.find(
        (item) => item.codebar.trim() === trimmedCodebar
      );

      if (produto) {
        setVisibleInputs(true);
        setName(produto.name);
        setPrice(produto.price.toString());
        setError("Produto encontrado !");
        return;
      }

      setError("Produto não encontrado na planilha importada.");
    } else {
      setVisibleInputs(true);
      setDisabledButton(false);
      setError("Tudo certo!");
    }
  };

  const handleQuantityChange = (text) => {
    if (!text) {
      setQuantityLabel(true);
    }

    const numericValue = text.replace(/[^0-9]/g, "");
    setQuantity(numericValue);
    setQuantityLabel(false);
  };

  const resetValues = () => {
    setFocusInQuantity(false);
    setFocusInCodebar(false);

    setCodebar("");
    setQuantity("");
    setName("");
    setPrice("");

    setInconsistency(false);
    setVisibleInputs(false);
    setDisabledButton(true);
  };

  const createProduct = () => {
    if (!codebar) {
      setError("Código de barras é obrigatório.");
      setFocusInCodebar(true);
      return;
    }

    if (!quantity) {
      setFocusInQuantity(true);
      setQuantityLabel(true);
      return;
    }

    const product = {
      uuid: uuid.v4(),
      codebar,
      quantity: parseFloat(quantity) || 0,
      name,
      price: parseFloat(price) || 0,
      inconsistency,
    };

    setLoading(true);

    Controller.Product.create(uuidInventory, product)
      .then(() => {
        resetValues();
        setError("Produto adicionado com sucesso!");
        setTimeout(() => {
          setFocusInCodebar(true);
        }, 100);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

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
          <View style={GlobalStyles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={{ ...GlobalStyles.cardTitle, marginTop: 0 }}>
                Adicionar produto
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
              </TouchableOpacity>
            </View>

            <View style={styles.cardBody}>
              <View style={{ width: visibleInputs ? "65%" : "100%" }}>
                <Text style={GlobalStyles.label}>Código de barras*</Text>
                <TextInput
                  style={GlobalStyles.input}
                  maxLength={150}
                  value={codebar}
                  autoFocus={focusInCodebar}
                  onChangeText={checkProductSpreadsheet}
                  keyboardType="numeric"
                />
                <Text
                  style={{
                    ...GlobalStyles.label,
                    fontSize: 12,
                    display: error.length ? "block" : "none",
                  }}
                >
                  {error}
                </Text>
              </View>

              {visibleInputs && (
                <>
                  {/* Quantidade */}
                  <View style={{ ...styles.grid, width: "30%" }}>
                    <Text style={GlobalStyles.label}>Quantidade*</Text>
                    <TextInput
                      style={GlobalStyles.input}
                      maxLength={255}
                      keyboardType="numeric"
                      value={quantity}
                      autoFocus={focusInQuantity}
                      onChangeText={handleQuantityChange}
                    />

                    <Text
                      style={{
                        ...GlobalStyles.label,
                        fontSize: 12,
                        display: quantityLabel === true ? "block" : "none",
                      }}
                    >
                      Obrigatório !
                    </Text>
                  </View>

                  {compareInSpreadsheet ? (
                    <>
                      {/* Nome do produto encontrado na planilha importada. */}
                      <View style={{ ...styles.grid, width: "30%" }}>
                        <Text style={GlobalStyles.label}>Preço R$</Text>
                        <TextInput
                          style={GlobalStyles.input}
                          maxLength={255}
                          keyboardType="decimal-pad"
                          value={price}
                          onChangeText={setPrice}
                        />
                      </View>

                      {/* Preço do produto encontrado na planilha importada. */}
                      <View style={{ width: "100%" }}>
                        <Text style={GlobalStyles.label}>Nome do produto</Text>
                        <TextInput
                          style={{
                            ...GlobalStyles.input,
                            height: "auto",
                            minHeight: 50,
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}
                          maxLength={255}
                          value={name}
                          onChangeText={setName}
                          keyboardType="default"
                          editable={compareInSpreadsheet}
                          multiline={true}
                          numberOfLines={4}
                        />
                      </View>
                    </>
                  ) : null}

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "75%" }}>
                      <Text style={GlobalStyles.label}>
                        Alguma inconsistência no produto?
                      </Text>
                      <Text style={GlobalStyles.small}>
                        Exemplo: Produto com valor diferente do que está na
                        etiqueta.
                      </Text>
                    </View>

                    <View
                      style={{ flexDirection: "column", alignItems: "center" }}
                    >
                      <Switch
                        value={inconsistency}
                        onValueChange={setInconsistency}
                      />
                      <Text style={GlobalStyles.small}>
                        {inconsistency ? "Sim" : "Não"}
                      </Text>
                    </View>
                  </View>
                </>
              )}

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 10 }}
                onPress={createProduct}
                disabled={disabledButton}
              >
                <Text style={GlobalStyles.buttonText}>
                  {loading ? "Criando produto ..." : "Adicionar"}
                </Text>
              </TouchableOpacity>
            </View>

       
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ProductCreateModal;

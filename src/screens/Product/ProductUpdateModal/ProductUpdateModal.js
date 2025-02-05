import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "services/DB/controller";

const ProductUpdateModal = ({ isVisible, onClose, product, uuidInventory }) => {
  const [codebar, setCodebar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inconsistency, setInconsistency] = useState(false);

  useEffect(() => {
    if (product) {
      setCodebar(product.codebar.toString() || "");
      setQuantity(product.quantity.toString() || "");
      setName(product.name.toString() || "");
      setPrice(product.price.toString() || "");
      setInconsistency(product.inconsistency || false);
    }
  }, [product]);

  const updateProduct = () => {
    let novoProduto = {
      uuid: product.uuid,
      codebar: codebar,
      quantity: parseInt(quantity),
      name: name,
      price: parseFloat(price) || 0,
      inconsistency: inconsistency || false,
    };

    Controller.Product.update(uuidInventory, novoProduto)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro ao atualizar o produto !");
        console.error(error);
      });
  };

  const deleteProductConfirmed = () => {
    Controller.Product.delete(uuidInventory, product.uuid)
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteProduct = () => {
    // Modal de confirmação
    Alert.alert("Excluir produto", "Deseja realmente excluir o produto ?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => deleteProductConfirmed(),
      },
    ]);
  };

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
            <View style={GlobalStyles.cardHeader}>
              <Text style={GlobalStyles.cardTitle}>
                Atualizar produto no inventário
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
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
                    value={codebar}
                    onChangeText={setCodebar}
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
                    placeholder=""
                    keyboardType="numeric"
                    placeholderTextColor="gray"
                    value={quantity}
                    onChangeText={setQuantity}
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
                    value={name}
                    onChangeText={setName}
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
                    value={price}
                    onChangeText={setPrice}
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
                    value={inconsistency}
                    onValueChange={setInconsistency}
                  />
                </View>
                <Text style={GlobalStyles.small}>
                  Exemplo de inconsistência : Produto com valor diferente do que
                  está na etiqueta.
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 20,
                  width: "100%",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    ...GlobalStyles.button,
                    width: "100",
                    backgroundColor: colors.danger,
                  }}
                  onPress={() => deleteProduct()}
                >
                  <Text style={GlobalStyles.buttonText}>Excluir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ ...GlobalStyles.button, flex: 1 }}
                  onPress={() => updateProduct()}
                >
                  <Text style={GlobalStyles.buttonText}>
                    Adicionar ao inventário
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

export default ProductUpdateModal;

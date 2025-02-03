import React, { useState, useEffect } from "react";
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

import { Controller } from "utils/DB/controller";

const ModalProductUpdate = ({ isVisible, onClose, product, uuidInventory }) => {
  const [codebar, setCodebar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inconsistency, setInconsistency] = useState(false);

  useEffect(() => {
    if (product) {
      setCodebar(product.codebar || "");
      setQuantity(product.quantity || "");
      setName(product.name || "");
      setPrice(product.price || "");
      setInconsistency(product.inconsistency || false);
    }
  }, [product]);

  const updateProduct = () => {
    let novoProduto = {
      uuid: product.uuid,
      codebar: codebar,
      quantity: parseInt(quantity),
      // name: name,
      price: parseFloat(price),
      inconsistency: inconsistency,
    };
    
    Controller.Product.create(uuidInventory, novoProduto).then((response) => {
      console.log("Produto atualizado com sucesso !");
      console.log(response);
    }).catch((error) => { 
      console.error("Erro ao atualizar o produto !");
      console.error(error);
    });

  };

  // const updateProduct = () => {

  //   let novoProduto = {
  //     uuid: uuid,
  //     codebar: codebar,
  //     quantity: quantity,
  //     name: name,
  //     price: price,
  //     inconsistency: inconsistency,
  //   }

  //   console.log("Atualizando produto");
  //   console.log("-----------------------");
  //   // console.log(novoProduto);
  // };

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

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
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

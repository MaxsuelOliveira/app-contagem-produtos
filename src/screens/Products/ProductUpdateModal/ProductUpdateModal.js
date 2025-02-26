import React, { useState, useEffect } from "react";
import { Switch } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Backend
import { Controller } from "services/backend/controller";

const ProductUpdateModal = ({ isVisible, onClose, product, uuidInventory }) => {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    const newProduct = {
      uuid: product.uuid,
      codebar: codebar,
      quantity: parseInt(quantity),
      name: name,
      price: parseFloat(price) || 0,
      inconsistency: inconsistency || false,
    };

    Controller.Product.update(uuidInventory, newProduct)
      .then((response) => {
        setTimeout(() => {
          setLoading(false);
          onClose();
        }, 300);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Erro ao atualizar o produto !", error);
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

      <View style={GlobalStyles.modalOverlay}>

        <View style={GlobalStyles.modalContent}>

          <View style={GlobalStyles.modalContainer}>

            <View style={{...GlobalStyles.card , minHeight : 500}}>

              <View style={GlobalStyles.cardHeader}>
                <Text style={styles.cardTilte}>Atualizar produto</Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={GlobalStyles.closeButton}
                >
                  <AntDesign name="close" size={28} color={colors.colorIcons} />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ flex: 1 }}>
                <View style={styles.cardBody}>
                  <View style={{ ...styles.grid, width: "60%" }}>
                    <Text style={{ ...GlobalStyles.label, marginBottom: -5 }}>
                      Código de barras*
                    </Text>
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

                  <View style={{ ...styles.grid, width: "35%" }}>
                    <Text style={{ ...GlobalStyles.label, marginBottom: -5 }}>
                      Quantidade*
                    </Text>
                    <TextInput
                      style={GlobalStyles.input}
                      placeholder=""
                      keyboardType="numeric"
                      placeholderTextColor="gray"
                      value={quantity}
                      onChangeText={setQuantity}
                    />
                  </View>

                  <View style={{ ...styles.grid, width: "100%" }}>
                    <Text style={{ ...GlobalStyles.label, marginBottom: -5 }}>
                      Nome do produto
                    </Text>
                    <TextInput
                      style={GlobalStyles.input}
                      placeholder="..."
                      maxLength={255}
                      keyboardType="default"
                      placeholderTextColor="gray"
                      value={name}
                      onChangeText={setName}
                      multiline={true}
                    />
                  </View>

                  <View style={{ ...styles.grid, width: "100%" }}>
                    <Text style={{ ...GlobalStyles.label, marginBottom: -5 }}>
                      Preço R$
                    </Text>
                    <TextInput
                      style={GlobalStyles.input}
                      placeholder="R$ 0,00"
                      maxLength={255}
                      keyboardType="decimal-pad"
                      placeholderTextColor="gray"
                      value={price}
                      onChangeText={setPrice}
                    />
                  </View>

                  <View style={styles.sectionCheck}>
                    <View style={{ width: "75%" }}>
                      <Text style={{ ...GlobalStyles.label }}>
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

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.buttonDelete}
                      onPress={() => deleteProduct()}
                    >
                      <Text style={GlobalStyles.buttonText}>Excluir</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonUpdate}
                      onPress={() => updateProduct()}
                    >
                      <Text style={GlobalStyles.buttonText}>
                        {loading ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text style={styles.buttonText}>Atualizar</Text>
                        )}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>

            </View>

          </View>

        </View>

      </View>
      
    </Modal>
  );
};

export default ProductUpdateModal;

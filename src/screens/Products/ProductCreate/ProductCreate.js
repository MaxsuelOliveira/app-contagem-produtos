import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
import uuid from "react-native-uuid";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Switch,
  ActivityIndicator,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Components
import CaptureCodeBar from "@screens/Products/ProductCaputeCodebarModal/ProductCaputeCodebar";

// Backend
import { Controller } from "@services/backend/controller";
import AsyncStorage from "@react-native-async-storage/async-storage";

const limitProducts = 500;

const ProductCreate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const uuid_inventory = route.params?.uuid_inventory;
  const [compareInSpreadsheet, setCompareInSpreadsheet] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState("");
  const [error, setError] = useState("");

  const [selectedInventory, setSelectedInventory] = useState({});
  const [productsSpreadsheets, setProductsSpreadsheets] = useState([]);
  const [productFound, setProductFound] = useState(false);

  const [codebar, setCodebar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inconsistency, setInconsistency] = useState(false);
  const [focusInCodebar, setFocusInCodebar] = useState(true);
  const [focusInQuantity, setFocusInQuantity] = useState(false);
  const [quantityLabel, setQuantityLabel] = useState(false);
  const [visibleInputs, setVisibleInputs] = useState(false);

  const codebarInputRef = useRef(null);

  const [limitProducts, setLimitProducts] = useState(500);

  useEffect(() => {
    Controller.Inventory.getUUID(uuid_inventory).then((inventory) => {
      inventory = inventory[0];

      setSelectedInventory(inventory);
      setCompareInSpreadsheet(inventory.compare_in_spreadsheet);

      if (compareInSpreadsheet) {
        Controller.SpreadSheets.getAll().then((response) => {
          const produtos = response.flatMap((item) =>
            item.products.map(({ codebar, name, price }) => ({
              codebar: codebar.trim(),
              name,
              price,
            }))
          );
          setProductsSpreadsheets(produtos);
        });
      }
    });
  }, [uuid_inventory]);

  useEffect(() => {
    if (getAccount() === "premium") {
      setLimitProducts(false);
      return;
    }

    setLimitProducts(500);
  }, []);

  const getAccount = async () => {
    const account = await AsyncStorage.getItem("isAccount");
    return account;
  };

  const checkProductSpreadsheet = (codebarInput) => {
    const trimmedCodebar = codebarInput.trim();
    setCodebar(trimmedCodebar);
    setFocusInQuantity(true);

    if (!trimmedCodebar) {
      setError("Código de barras é obrigatório.");
      resetValues();
      return;
    }

    const produto = productsSpreadsheets.find(
      (item) => item.codebar === trimmedCodebar
    );

    if (compareInSpreadsheet) {
      if (produto) {
        setProductFound(true);
        setVisibleInputs(true);
        setName(produto.name);
        setPrice(produto.price.toString());
        setError("Produto encontrado!");
      } else {
        setVisibleInputs(false);
        setProductFound(false);
        setError("Produto não encontrado na planilha importada.");
      }
    } else {
      setVisibleInputs(true);
      setError("Código de barras informado.");
    }
  };

  const handleQuantityChange = (text) => {
    setQuantity(text.replace(/[^0-9]/g, ""));
    setQuantityLabel(!text);
  };

  const resetValues = () => {
    setCodebar("");
    setQuantity("");
    setName("");
    setPrice("");
    setInconsistency(false);
    setVisibleInputs(false);
  };

  const createProduct = () => {
    if (!codebar) return setError("Código de barras é obrigatório.");
    if (!quantity) return setQuantityLabel(true);

    if (limitProducts !== false) {
      if (selectedInventory.products.length >= limitProducts) {
        return setProductInfo(
          `Limite de ${limitProducts} produtos atingido. Não é possível adicionar mais produtos. Faça o upgrade para o plano PRO.`
        );
      }
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
    setProductInfo("");

    Controller.Product.create(uuid_inventory, product)
      .then(() => {
        resetValues();
        setError("Produto adicionado com sucesso!");
        setProductFound(false);
      })
      .catch((err) => setError(err.message || "Erro ao adicionar produto."))
      .finally(() => {
        setTimeout(() => {
          codebarInputRef.current?.focus();
          setLoading(false);
        }, 500);
      });
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar style="auto" backgroundColor={colors.cardBackground} />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={{ ...GlobalStyles.cardTitle, marginTop: 0 }}>
            Adicionar produto
          </Text>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={GlobalStyles.closeButton}
          >
            <AntDesign name="close" size={28} color={colors.colorIcons} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.cardBody}>
            <View style={{ flexDirection: "row", width: "100%", gap: 10 }}>
              <View style={{ width: visibleInputs ? "65%" : "100%" }}>
                <Text style={GlobalStyles.label}>Código de barras*</Text>
                <TextInput
                  ref={codebarInputRef} // Referência no input
                  style={GlobalStyles.input}
                  maxLength={150}
                  value={codebar}
                  autoFocus={focusInCodebar}
                  onChangeText={checkProductSpreadsheet}
                  keyboardType="numeric"
                  returnKeyType="next"
                  placeholder="Código de barras"
                />
                {error && (
                  <Text
                    style={{ ...GlobalStyles.labelError, marginBottom: 10 }}
                  >
                    {error}
                  </Text>
                )}
              </View>

              {visibleInputs ? (
                <View style={{ width: "35%", marginBottom: 10 }}>
                  <Text style={GlobalStyles.label}>Quantidade*</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    maxLength={255}
                    keyboardType="numeric"
                    value={quantity}
                    autoFocus={focusInQuantity}
                    onChangeText={handleQuantityChange}
                    onSubmitEditing={createProduct}
                    returnKeyType="done"
                    placeholder="0"
                  />
                  {quantityLabel && (
                    <Text style={GlobalStyles.labelError}>
                      Campo obrigatório!
                    </Text>
                  )}
                </View>
              ) : null}
            </View>
            {compareInSpreadsheet === true && productFound === true && (
              <>
                <View style={styles.grid}>
                  <Text style={GlobalStyles.label}>Nome</Text>
                  <TextInput
                    style={{ ...GlobalStyles.input, minHeight: 50 }}
                    maxLength={255}
                    value={name ?? ""}
                    onChangeText={setName}
                    editable={compareInSpreadsheet || visibleInputs}
                    multiline
                  />
                </View>
                <View style={styles.grid}>
                  <Text style={GlobalStyles.label}>Preço R$</Text>
                  <TextInput
                    style={{ ...GlobalStyles.input, minHeight: 50 }}
                    maxLength={255}
                    value={price ?? ""}
                    onChangeText={setPrice}
                    editable={compareInSpreadsheet || visibleInputs}
                    multiline
                  />
                </View>
              </>
            )}
          </View>

          {visibleInputs && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 10,
              }}
            >
              <Text style={GlobalStyles.label}>Inconsistência no produto?</Text>
              <View>
                <Switch
                  value={inconsistency}
                  onValueChange={setInconsistency}
                />
                <Text
                  style={{
                    ...GlobalStyles.labelError,
                    textAlign: "center",
                  }}
                >
                  {inconsistency ? "Sim" : "Não"}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {productInfo && (
          <Text style={{ ...GlobalStyles.labelError, marginBottom: 10 }}>
            {productInfo}
          </Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={createProduct}
            disabled={loading}
          >
            <Text style={GlobalStyles.buttonText}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Adicionar</Text>
              )}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.button,
              width: "60",
              borderRadius: 10,
              backgroundColor: colors.inputBackground,
            }}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons name="barcode-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <CaptureCodeBar
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        setCodebar={checkProductSpreadsheet}
      />
    </View>
  );
};

export default ProductCreate;

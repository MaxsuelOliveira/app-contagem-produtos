import React, { useState, useEffect, useCallback, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";

import uuid from "react-native-uuid";

// Icons
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

// Styles
import { styles } from "./styles";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

import { isProductLimitReached } from "@utils/utils";

// Components
import ProductInventoryCardDetails from "../../Products/ProductInventoryCardDetails/ProductInventoryCardDetails";
import ProductUpdateModal from "../../Products/ProductUpdateModal/ProductUpdateModal";

// Screens
import OptionsInventory from "./InventoryOptions";

// Backend
import { Controller } from "@services/backend/controller";
import { TextInput } from "react-native-gesture-handler";

export default function InventoryDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { uuid: uuidInventory, name, describe } = route.params;

  // Estados principais
  const [refresh, setRefresh] = useState(0);
  const [remover, setRemover] = useState(false);
  const [itemsSelectedForDeletion, setItemsSelectedForDeletion] = useState([]);

  const [modalProductUpdate, setModalProductUpdate] = useState(false);
  const [modalOptions, setModalOptions] = useState(false);
  const [productsInventory, setProductsInventory] = useState([]);
  const [productSelected, setProductSelected] = useState(null);

  const [limit, setLimit] = useState(500);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const [product, setProduct] = useState(false);
  const [productsImported, setProductsImported] = useState([]);

  // Estados para entrada de dados e status
  const [loading, setLoading] = useState(false);
  const [formMessage, setFormMessage] = useState("Informe o código de barras");

  const [codebar, setCodebar] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [inconsistency, setInconsistency] = useState(false);
  const [compare, setCompare] = useState(false);

  // Estados para pesquisa
  const [search, setSearch] = useState("");
  const [contentSearchProduct, setContentSearchProduct] = useState(false);

  // Estados para controle de foco
  const [focusInCodebar, setFocusInCodebar] = useState(true);
  const [focusInQuantity, setFocusInQuantity] = useState(false);
  const [quantityLabel, setQuantityLabel] = useState(false);

  const codebarInputRef = useRef(null);
  const quantityInputRef = useRef(null);

  // Manipula edição do produto
  const handleEditProduct = (product) => {
    setProductSelected(product);
    setModalProductUpdate(true);
  };

  useFocusEffect(
    useCallback(() => {
      setRefresh((prevRefresh) => prevRefresh + 1);
    }, [])
  );

  // Alterna seleção de um produto na lista
  const toggleProdutoSelecionado = (uuid) => {
    setItemsSelectedForDeletion((prev) => {
      if (!prev || !Array.isArray(prev)) {
        return [{ uuid }]; // Garante que seja um array válido ao iniciar
      }

      const existe = prev.some((produto) => produto.uuid === uuid);

      if (existe) {
        return prev.filter((produto) => produto.uuid !== uuid); // Remove o item se já existir
      } else {
        return [...prev, { uuid }]; // Adiciona o item se não existir
      }
    });
  };

  // Obtém conta e define limite de produtos
  const getAccount = async () => {
    const account = await AsyncStorage.getItem("isAccount");
    setLimit(account === "premium" ? false : 500);
  };

  // Obtém conta ao montar o componente
  useEffect(() => {
    getAccount();
  }, [uuidInventory]);

  // Obtém produtos do inventário
  useEffect(() => {
    Controller.Inventory.getProducts(uuidInventory)
      .then((response) => {
        if (response) {
          setProductsInventory(response);
        }
      })
      .catch((error) => {
        console.error("Erro ao obter produtos do inventário:", error);
      });
  }, [refresh, uuidInventory]);

  // Obtém inventário e planilha, se necessário
  useEffect(() => {
    (async () => {
      const [inventory] = await Controller.Inventory.getUUID(uuidInventory);

      if (!inventory) {
        console.warn("Nenhum inventário encontrado!");
        return;
      }

      const { compare_in_spreadsheet, quantity_default } = inventory;
      setSelectedInventory(inventory);
      setCompare(compare_in_spreadsheet);

      if (compare_in_spreadsheet) {
        const response = await Controller.SpreadSheets.getAll();

        if (!response) {
          console.warn("Nenhuma planilha encontrada!");
          return;
        }

        const produtos = response.flatMap(({ products }) =>
          products.map(({ codebar, name, price }) => ({
            codebar: codebar.trim(),
            name,
            price,
          }))
        );

        setProductsImported(produtos);
      }
    })();
  }, [modalOptions, uuidInventory]);

  // Valida e busca produto na planilha
  const checkProductSpreadsheet = (codebarInput) => {
    const trimmedCodebar = codebarInput.trim();
    setCodebar(trimmedCodebar);
    setFocusInQuantity(true);

    if (!trimmedCodebar) {
      setFormMessage("Código de barras é obrigatório.");
      resetValues();
      return;
    }

    if (compare) {
      const product = productsImported.find(
        ({ codebar }) => codebar === trimmedCodebar
      );

      if (product) {
        setProduct(true);
        setDescription(product.name);
        setPrice(product.price.toString());
        setFormMessage("Produto encontrado!");
        return;
      }
      setProduct(false);
      setFormMessage("Produto não encontrado na planilha importada!");
    } else {
      setFormMessage("Código de barras informado :)");
    }
  };

  // Manipula alteração de quantidade
  const handleQuantityChange = (text) => {
    setQuantity(text.replace(/[^0-9]/g, ""));
    setQuantityLabel(!text);
  };

  // Reseta os valores dos campos de entrada
  const resetValues = () => {
    setCodebar("");
    setQuantity("");
    setDescription("");
    setPrice("");
    setInconsistency(false);
  };

  const productCustomDelete = () => {
    Alert.alert("Apagar", "Deseja apagar os produtos?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Apagar",
        onPress: () => {
          Controller.Product.deleteProducts(itemsSelectedForDeletion);
          setRefresh(refresh + 1);
          setItemsSelectedForDeletion([]);
          setRemover(false);
        },
      },
    ]);
  };

  function updateProduct(product) {
    let sumQuantity = parseFloat(quantity) + parseFloat(product.quantity);
    let update = {
      uuid: product.uuid,
      codebar: product.codebar,
      quantity: sumQuantity,
      name: product.name,
      price: product.price,
      inconsistency: product.inconsistency,
      date_create: new Date(),
    };

    Controller.Product.update(uuidInventory, update)
      .then((response) => {
        setFormMessage("Produto atualizado com sucesso!");
      })
      .catch((error) => {
        setFormMessage(`Não foi possível continuar, erro: ${error}`);
      });
  }

  // Função para verificar se o produto  já existe no inventário
  const isProductExist = (codebar) => {
    if (productsInventory.some((product) => product.codebar === codebar)) {
      return productsInventory.find((product) => product.codebar === codebar);
    }
  };

  const createProduct = () => {
    if (!codebar) return setFormMessage("Código de barras é obrigatório.");
    if (!quantity) {
      setQuantityLabel(true);
      return setFormMessage("Quantidade é obrigatória, por favor preencha.");
    }

    if (isProductLimitReached(selectedInventory.products, limit)) {
      setFormMessage(`Limite de produtos atingido. Máximo: ${limit}.`);
      return;
    }

    if (compare && !product) {
      return setFormMessage("Produto não encontrado na planilha importada!");
    }

    const productExist = isProductExist(codebar);
    if (productExist) {
      updateProduct(productExist);
      setFormMessage("Produto já existe no inventário, vamos atualizar?");
      return;
    }

    const newProduct = {
      uuid: uuid.v4(),
      codebar,
      quantity: parseFloat(quantity) || 0,
      name: description,
      price: parseFloat(price) || 0,
      inconsistency,
      date_create: new Date(),
    };

    setLoading(true);
    setFormMessage("Adicionando produto...");

    Controller.Product.create(uuidInventory, newProduct)
      .then(() => {
        resetValues();
        setFormMessage("Produto adicionado com sucesso!");
        setProduct(false);
        setRefresh((prev) => prev + 1);
      })
      .catch((err) =>
        setFormMessage(
          err.message || "Houve um erro ao adicionar produto, tente novamente."
        )
      )
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          codebarInputRef.current?.focus();
        }, 300);
      });
  };

  // Filtra produtos pelo nome ou código de barras
  const filteredProducts = productsInventory.filter(
    ({ name, codebar }) =>
      name?.toLowerCase().includes(search.toLowerCase()) ||
      codebar?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <TouchableOpacity
          style={GlobalStyles.btnHeader}
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={24} color={"black"} />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.cardTitle}>{name}</Text>

          {describe && (
            <Text style={{ ...styles.cardDescription, marginBottom: 10 }}>
              {describe}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={GlobalStyles.btnHeader}
          onPress={() => setModalOptions(true)}
        >
          <SimpleLineIcons name="options-vertical" size={20} color={"black"} />
        </TouchableOpacity>
      </View>

      {contentSearchProduct ? (
        <View style={styles.formSearch}>
          <TextInput
            placeholder="Pesquisar"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={() => setContentSearchProduct(false)}>
            <AntDesign name="close" size={24} color={colors.colorIcons} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.form}>
          <View style={styles.formItem}>
            <View style={{ width: "75%" }}>
              <Text style={GlobalStyles.label}>Código de barras*</Text>
              <TextInput
                ref={codebarInputRef}
                style={{
                  ...GlobalStyles.input,
                  fontSize: 16,
                  backgroundColor: "white",
                }}
                maxLength={150}
                value={codebar}
                autoFocus={focusInCodebar}
                onChangeText={checkProductSpreadsheet}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() => quantityInputRef.current?.focus()}
                placeholder="Código de barras"
              />
              {loading ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                <Text style={styles.labelError}>{formMessage}</Text>
              )}
            </View>

            <View style={{ width: 80 }}>
              <Text style={GlobalStyles.label}>Qnt*</Text>
              <TextInput
                ref={quantityInputRef}
                style={{
                  ...GlobalStyles.input,
                  fontSize: 16,
                  backgroundColor: "white",
                }}
                maxLength={255}
                keyboardType="numeric"
                value={quantity}
                autoFocus={focusInQuantity}
                onChangeText={handleQuantityChange}
                onSubmitEditing={createProduct}
                returnKeyType="done"
                placeholder="0"
              />
            </View>
          </View>

          {/* Nome do produto encontrado no spreadsheet SEM EDICAO */}
          {compare && product && description && (
            <View style={{ marginBottom: 10 }}>
              <Text style={GlobalStyles.label}>Nome do produto</Text>
              <Text style={GlobalStyles.value}>{description}</Text>
            </View>
          )}

          {/* Valor do produto encontrado no spreadsheet SEM EDICAO */}
          {compare && product && price !== undefined && (
            <View style={{ marginBottom: 10 }}>
              <Text style={GlobalStyles.label}>Preço</Text>
              <Text style={GlobalStyles.value}>R$ {price.toString()}</Text>
            </View>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 0,
            }}
          >
            <Text style={GlobalStyles.label}>Inconsistência ?</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.label}>{inconsistency ? "Sim" : "Não"}</Text>
              <Switch value={inconsistency} onValueChange={setInconsistency} />
            </View>
          </View>
        </View>
      )}

      <ScrollView style={styles.cardBody}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductInventoryCardDetails
              key={item.uuid}
              uuidInventory={uuid}
              uuid={item.uuid}
              codebar={item.codebar}
              quantity={item.quantity}
              name={item.name || ""}
              price={item.price}
              inconsistency={item.inconsistency}
              onEdit={handleEditProduct}
              onSelected={toggleProdutoSelecionado}
            />
          ))
        ) : (
          <View style={styles.noProducts}>
            <Text style={styles.noProductsText}>
              Nenhum produto encontrado na lista de inventário.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={{ ...GlobalStyles.menubar, display: "none" }}>
        {itemsSelectedForDeletion.length > 0 && (
          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={productCustomDelete}
          >
            <AntDesign name="delete" size={26} color={colors.colorIcons} />
            <Text style={styles.menuText}>
              Apagar ({itemsSelectedForDeletion.length})
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <ProductUpdateModal
        isVisible={modalProductUpdate}
        onClose={() => setModalProductUpdate(false)}
        product={productSelected}
        uuidInventory={uuidInventory}
      />

      <OptionsInventory
        isVisible={modalOptions}
        onClose={() => setModalOptions(false)}
        uuidInventory={uuidInventory}
        searchProduct={() => setContentSearchProduct(true)}
      />
    </View>
  );
}

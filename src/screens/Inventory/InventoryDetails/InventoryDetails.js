import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Switch,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import uuid from "react-native-uuid";

// Icons
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

// Styles
import { styles } from "./styles";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

// Utils & Backend
import { isProductLimitReached } from "@utils/utils";
import { Controller } from "@services/backend/controller";

// Components & Screens
import ProductInventoryCardDetails from "../../Products/ProductInventoryCardDetails/ProductInventoryCardDetails";
import ProductUpdateModal from "../../Products/ProductUpdateModal/ProductUpdateModal";
import OptionsInventory from "./InventoryOptions";

export default function InventoryDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { uuid: uuidInventory, name, describe } = route.params;

  const [product , setProduct] = useState(null);
  const [limit , setLimit] = useState(0);

  // Estados principais
  const [refresh, setRefresh] = useState(0);
  const [remover, setRemover] = useState(false);
  const [itemsSelectedForDeletion, setItemsSelectedForDeletion] = useState([]);

  const [modalProductUpdate, setModalProductUpdate] = useState(false);
  const [modalOptions, setModalOptions] = useState(false);
  const [productsInventory, setProductsInventory] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  const [selectedInventory, setSelectedInventory] = useState(null);
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

  // Estados para pesquisa e foco
  const [search, setSearch] = useState("");
  const [contentSearchProduct, setContentSearchProduct] = useState(false);
  const [focusInCodebar, setFocusInCodebar] = useState(true);
  const [focusInQuantity, setFocusInQuantity] = useState(false);
  const [quantityLabel, setQuantityLabel] = useState(false);

  // Refs para inputs
  const codebarInputRef = useRef(null);
  const quantityInputRef = useRef(null);

  /* ===== FUNÇÕES AUXILIARES ===== */
  // Função para resetar campos de entrada
  const resetValues = () => {
    setCodebar("");
    setQuantity("");
    setDescription("");
    setPrice("");
    setInconsistency(false);
  };

  // Função para editar produto
  const handleEditProduct = (product) => {
    setProductSelected(product);
    setModalProductUpdate(true);
  };

  // Alterna seleção para deleção
  const toggleProdutoSelecionado = (uuid) => {
    setItemsSelectedForDeletion((prev = []) => {
      const exists = prev.some((item) => item.uuid === uuid);
      return exists
        ? prev.filter((item) => item.uuid !== uuid)
        : [...prev, { uuid }];
    });
  };

  // Obtém e define limite de produtos conforme conta
  const getAccount = async () => {
    const account = await AsyncStorage.getItem("isAccount");
    setLimit(account === "premium" ? false : 500);
  };

  // Atualiza produto já existente somando quantidades
  const updateProduct = (product) => {
    const newQuantity = parseFloat(quantity) + parseFloat(product.quantity);
    const update = {
      uuid: product.uuid,
      codebar: product.codebar,
      quantity: newQuantity,
      name: product.name,
      price: product.price,
      inconsistency: product.inconsistency,
      date_create: new Date(),
    };

    Controller.Product.update(uuidInventory, update)
      .then(() => setFormMessage("Produto atualizado com sucesso!"))
      .catch((error) =>
        setFormMessage(`Não foi possível continuar, erro: ${error}`)
      );
  };

  // Verifica se o produto existe no inventário
  const isProductExist = (codebarValue) => {
    return productsInventory.find((prod) => prod.codebar === codebarValue);
  };

  // Deleta produtos selecionados
  const productCustomDelete = () => {
    Alert.alert("Apagar", "Deseja apagar os produtos?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Apagar",
        onPress: () => {
          Controller.Product.deleteProducts(itemsSelectedForDeletion);
          setRefresh((prev) => prev + 1);
          setItemsSelectedForDeletion([]);
          setRemover(false);
        },
      },
    ]);
  };

  // Valida e busca produto na planilha importada
  const checkProductSpreadsheet = (input) => {
    const trimmed = input.trim();
    setCodebar(trimmed);
    setFocusInQuantity(true);

    if (!trimmed) {
      setFormMessage("Código de barras é obrigatório.");
      resetValues();
      return;
    }

    if (compare) {
      const prod = productsImported.find(
        ({ codebar }) => codebar === trimmed
      );
      if (prod) {
        setProduct(true);
        setDescription(prod.name);
        setPrice(prod.price.toString());
        setFormMessage("Produto encontrado!");
        return;
      }
      setProduct(false);
      setFormMessage("Produto não encontrado na planilha importada!");
    } else {
      setFormMessage("Código de barras informado :)");
    }
  };

  // Manipula alteração de quantidade (aceita apenas números)
  const handleQuantityChange = (text) => {
    setQuantity(text.replace(/[^0-9]/g, ""));
    setQuantityLabel(!text);
  };

  // Cria um novo produto ou atualiza se já existir
  const createProduct = () => {
    if (!codebar) return setFormMessage("Código de barras é obrigatório.");
    if (!quantity) {
      setQuantityLabel(true);
      return setFormMessage("Quantidade é obrigatória, por favor preencha.");
    }
    if (isProductLimitReached(selectedInventory.products, limit)) {
      return setFormMessage(`Limite de produtos atingido. Máximo: ${limit}.`);
    }
    if (compare && !product) {
      return setFormMessage("Produto não encontrado na planilha importada!");
    }

    const exist = isProductExist(codebar);
    if (exist) {
      updateProduct(exist);
      return setFormMessage("Produto já existe no inventário, vamos atualizar?");
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
          err.message ||
            "Houve um erro ao adicionar produto, tente novamente."
        )
      )
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
          codebarInputRef.current?.focus();
        }, 300);
      });
  };

  /* ===== EFFECTS ===== */
  // Atualiza o refresh sempre que a tela estiver em foco
  useFocusEffect(
    useCallback(() => setRefresh((prev) => prev + 1), [])
  );

  // Obtém limite de conta ao montar ou mudar o uuidInventory
  useEffect(() => {
    getAccount();
  }, [uuidInventory]);

  // Busca produtos do inventário
  useEffect(() => {
    Controller.Inventory.getProducts(uuidInventory)
      .then((response) => {
        if (response) setProductsInventory(response);
      })
      .catch((error) =>
        console.error("Erro ao obter produtos do inventário:", error)
      );
  }, [refresh, uuidInventory]);

  // Busca inventário e planilhas importadas
  useEffect(() => {
    if (!uuidInventory) return;

    (async () => {
      console.log("Obtendo inventário...");
      const [inventory] = await Controller.Inventory.getUUID(uuidInventory);
      if (!inventory) {
        console.warn("Nenhum inventário encontrado!");
        return;
      }

      const { compare_in_spreadsheet } = inventory.properties;
      setSelectedInventory(inventory);
      setCompare(compare_in_spreadsheet);

      if (!compare_in_spreadsheet) {
        console.warn("Comparação desativada no inventário!");
        return;
      }

      const response = await Controller.SpreadSheets.getAll();
      if (!response) {
        console.warn("Nenhuma planilha encontrada!");
        return;
      }

      const importedProducts = response.flatMap(({ products }) =>
        products
          ? products.map(({ codebar, name, price }) => ({
              codebar: codebar?.trim() || "",
              name: name || "SEM NOME",
              price: price || 0.0,
            }))
          : []
      );
      setProductsImported(importedProducts);
    })();
  }, [modalOptions, uuidInventory]);

  // Filtra produtos pelo nome ou código de barras
  const filteredProducts = productsInventory.filter(
    ({ name, codebar }) =>
      name?.toLowerCase().includes(search.toLowerCase()) ||
      codebar?.toLowerCase().includes(search.toLowerCase())
  );

  /* ===== RENDERIZAÇÃO ===== */
  return (
    <View style={styles.card}>
      {/* Cabeçalho */}
      <View style={styles.cardHeader}>
        <TouchableOpacity
          style={GlobalStyles.btnHeader}
          onPress={navigation.goBack}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.cardTitle}>{name}</Text>
          {describe && (
            <Text style={[styles.cardDescription, { marginBottom: 10 }]}>
              {describe}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={GlobalStyles.btnHeader}
          onPress={() => setModalOptions(true)}
        >
          <SimpleLineIcons name="options-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Área de busca ou formulário */}
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
                style={[
                  GlobalStyles.input,
                  { fontSize: 16, backgroundColor: "white" },
                ]}
                maxLength={150}
                value={codebar}
                autoFocus={focusInCodebar}
                onChangeText={checkProductSpreadsheet}
                keyboardType="numeric"
                returnKeyType="done"
                onSubmitEditing={() =>
                  quantityInputRef.current?.focus()
                }
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
                style={[
                  GlobalStyles.input,
                  { fontSize: 16, backgroundColor: "white" },
                ]}
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

          {compare && product && description && (
            <View style={{ marginBottom: 10 }}>
              <Text style={GlobalStyles.label}>Nome do produto</Text>
              <Text style={GlobalStyles.value}>{description}</Text>
            </View>
          )}

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
            }}
          >
            <Text style={GlobalStyles.label}>Inconsistência ?</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.label}>
                {inconsistency ? "Sim" : "Não"}
              </Text>
              <Switch
                value={inconsistency}
                onValueChange={setInconsistency}
              />
            </View>
          </View>
        </View>
      )}

      {/* Lista de produtos */}
      <ScrollView style={styles.cardBody}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductInventoryCardDetails
              key={item.uuid}
              uuidInventory={uuidInventory}
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

      {/* Barra de opções (visível quando houver itens para deletar) */}
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

      {/* Modais */}
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

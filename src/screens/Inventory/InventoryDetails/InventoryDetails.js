import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Ultis
import { setStatus } from "../../../components/CardInvetory/CardInventory";

// Components
import ProductInventoryCardDetails from "../../Products/ProductInventoryCardDetails/ProductInventoryCardDetails";
import ProductUpdateModal from "../../Products/ProductUpdateModal/ProductUpdateModal";
import InventorySettingsModal from "../InventorySettingsModal/InventorySettingsModal";
import InventoryExportModal from "../InventoryExportModal/InventoryExportModal";

// Backend
import { Controller } from "@services/backend/controller";
import { TextInput } from "react-native-gesture-handler";

export default function InventoryDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    uuid,
    name,
    describe,
    products,
    status,
    date_create,
    date_end,
    compare_in_spreadsheet,
    compare_price,
    inputs_hability,
  } = route.params;

  const date_create_formart = new Intl.DateTimeFormat("pt-BR").format(
    new Date(date_create)
  );

  const [remover, setRemover] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isProductUpdateModal, setProductUpdateModal] = useState(false);
  const [isModalVisibleSettings, setModalVisibleSettings] = useState(false);
  const [isModalVisibleExport, setModalVisibleExport] = useState(false);
  const [productsInventory, setProductsInventory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [activeSearch, setActiveSearch] = useState(false);

  const [search, setSearch] = useState("");

  // Filtra os produtos com base no nome ou código de barras
  const filteredProducts = productsInventory.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.codebar?.toLowerCase().includes(search.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => prev + 1);
    }, [])
  );

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductUpdateModal(true);
  };

  function toggleProdutoSelecionado(uuid) {
    let check = false;

    setSelectedProducts((prev) => {
      const produtoIndex = prev.findIndex((produto) => produto.uuid === uuid);

      if (produtoIndex !== -1) {
        // Remove o item
        const novaLista = prev.filter((produto) => produto.uuid !== uuid);
        check = false; // O item foi removido
        return novaLista;
      } else {
        // Adiciona o item
        check = true; // O item foi adicionado
        return [...prev, { uuid }];
      }
    });

    return { check, id: uuid };
  }

  const handleNavigateToProductCreate = () => {
    if (!uuid || compare_in_spreadsheet === undefined) {
      console.error("Erro: uuid ou compare_in_spreadsheet não definidos.");
      return;
    }

    navigation.navigate("ProductCreate", {
      uuid_inventory: uuid,
      compare_in_spreadsheet: compare_in_spreadsheet,
    });
  };

  useEffect(() => {
    Controller.Inventory.getProducts(uuid).then((products) => {
      setProductsInventory(products);
    });
  }, [refresh]);

  return (
    <View style={styles.card}>
      <View style={{ ...styles.cardHeader }}>
        <Text style={styles.cardTitle}>{name}</Text>
        {describe ? (
          <Text style={styles.cardDescription}>{describe}</Text>
        ) : null}

        <View style={styles.createInventarioInfo}>
          {activeSearch ? (
            <TextInput
              placeholder="Pesquisar"
              style={[
                styles.input,
                activeSearch === true ? styles.inputActive : null,
              ]}
              value={search}
              onChangeText={setSearch}
            ></TextInput>
          ) : (
            <>
              <View style={styles.createInventarioInfoItem}>
                <Text style={styles.label}>Status</Text>
                <Text style={styles.value}>{setStatus(status)}</Text>
              </View>

              <View style={styles.createInventarioInfoItem}>
                <Text style={styles.label}>Item(s)</Text>
                <Text style={styles.value}>{products.length}</Text>
              </View>

              <View style={styles.createInventarioInfoItem}>
                <Text style={styles.label}>
                  {status === "done" ? "Finalizado em" : "Criado em"}
                </Text>
                <Text style={styles.value}>{date_create_formart}</Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => setActiveSearch(!activeSearch)}
          >
            <AntDesign name="search1" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.cardBody}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductInventoryCardDetails
              key={item.uuid}
              uuid_inventory={uuid}
              uuid={item.uuid}
              codebar={item.codebar}
              quantity={item.quantity}
              name={item.name ? item.name : ""}
              price={item.price}
              inconsistency={item.inconsistency}
              onEdit={handleEditProduct}
              onSelected={toggleProdutoSelecionado}
            />
          ))
        ) : (
          <View style={styles.noProducts}>
            <Text style={styles.noProductsText}>
              Nenhum produto encontrado.
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={{ ...GlobalStyles.menubar }}>
        {selectedProducts.length === 0 ? (
          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => setModalVisibleExport(true)}
          >
            <AntDesign name="export" size={26} color={colors.colorIcons} />
            <Text style={styles.menuText}>Exportar</Text>
          </TouchableOpacity>
        ) : null}

        {status === "progress" && selectedProducts.length === 0 ? (
          <>
            <TouchableOpacity
              testID="add-product-button"
              style={[GlobalStyles.menubarItem]}
              onPress={handleNavigateToProductCreate}
            >
              <AntDesign name="plus" size={26} color={colors.colorIcons} />
              <Text style={styles.menuText}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[GlobalStyles.menubarItem]}
              onPress={() => setModalVisibleSettings(true)}
            >
              <AntDesign name="setting" size={26} color={colors.colorIcons} />
              <Text style={styles.menuText}>Configurações</Text>
            </TouchableOpacity>
          </>
        ) : null}

        {selectedProducts.length ? (
          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() =>
              Alert.alert("Apagar", "Deseja apagar os produtos?", [
                {
                  text: "Cancelar",
                  style: "cancel",
                },
                {
                  text: "Apagar",
                  onPress: () => {
                    console.log("Apagar produtos em  multipla seleção.");
                    console.log("Total: ", selectedProducts.length);
                    console.log(selectedProducts);
                    Controller.Product.deleteProducts(selectedProducts);
                    setRefresh(refresh + 1);
                    setSelectedProducts([]);
                    setRemover(false);
                  },
                },
              ])
            }
          >
            <AntDesign name="delete" size={26} color={colors.colorIcons} />
            <Text style={styles.menuText}>
              Apagar ({selectedProducts.length})
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <ProductUpdateModal
        isVisible={isProductUpdateModal}
        onClose={() => setProductUpdateModal(false)}
        product={selectedProduct}
        uuidInventory={uuid}
      />

      <InventoryExportModal
        isVisible={isModalVisibleExport}
        onClose={() => setModalVisibleExport(false)}
        uuidInventory={uuid}
      />

      <InventorySettingsModal
        isVisible={isModalVisibleSettings}
        onClose={() => setModalVisibleSettings(false)}
        uuidInventory={uuid}
      />
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// Components
import ProductInventoryCardDetails from "../../Product/ProductInventoryCardDetails/ProductInventoryCardDetails";
import InventorySettingsModal from "../InventorySettingsModal/InventorySettingsModal";
import InventoryExportModal from "../InventoryExportModal/InventoryExportModal";

// Produtos
import ProductCreateModal from "../../Product/ProductCreateModal/ProductCreateModal";
import ProductUpdateModal from "../../Product/ProductUpdateModal/ProductUpdateModal";

// Ultis
import { setStatus } from "../../../components/CardInvetory/CardInventory";

// Backend
import { Controller } from "../../../services/backend/controller";

let produtos = [];

export default function InventoryDetails() {
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
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);

  const [isModalProductCreate, setModalProductCreate] = useState(false);
  const [isProductUpdateModal, setProductUpdateModal] = useState(false);
  const [isModalVisibleSettings, setModalVisibleSettings] = useState(false);
  const [isModalVisibleExport, setModalVisibleExport] = useState(false);
  const [productsInventory, setProductsInventory] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProductUpdateModal(true);
  };

  function toggleProdutoSelecionado(uuid) {
    const produtoIndex = produtosSelecionados.indexOf(uuid);

    if (produtoIndex !== -1) {
      produtosSelecionados.splice(produtoIndex, 1);
      setProdutosSelecionados([...produtosSelecionados]);
      return {
        check: false,
        id: uuid,
      };
    } else {
      setRemover(true);
      produtosSelecionados.push(uuid);
      setProdutosSelecionados([...produtosSelecionados]);
      return {
        check: true,
        id: uuid,
      };
    }
  }

  useEffect(() => {
    Controller.Inventory.getProducts(uuid).then((products) => {
      setProductsInventory(products);
    });
  }, [refresh]);

  return (
    <View style={styles.card}>
      <View style={{ ...styles.cardHeader, marginTop: 10 }}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription}>{describe}</Text>

        <ScrollView horizontal={true} style={styles.scrollView}>
          <View style={styles.createInventarioInfo}>
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

            <View style={styles.createInventarioInfoItem}>
              <Text style={styles.label}>Comparar</Text>
              <Text style={styles.value}>
                {compare_in_spreadsheet ? "Sim" : "Não"}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.cardBody}>
        {productsInventory.length > 0 ? (
          productsInventory.map((item) => (
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
        {/* Exportar inventário */}
        {produtosSelecionados.length === 0 ? (
          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => setModalVisibleExport(true)}
          >
            <AntDesign name="export" size={26} color={colors.colorIcons} />
            <Text style={styles.menuText}>Exportar</Text>
          </TouchableOpacity>
        ) : null}

        {/* Adicionar produtos e configurações */}
        {status === "progress" && produtosSelecionados.length === 0 ? (
          <>
            <TouchableOpacity
              style={[GlobalStyles.menubarItem]}
              onPress={() => setModalProductCreate(true)}
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

        {/* Apagar multiplos produtos */}
        {produtosSelecionados.length ? (
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
                    console.log("Total: ", produtosSelecionados.length);
                    console.log(produtosSelecionados);
                    // Controller.Inventory.deleteProducts(produtosSelecionados);
                    // setRefresh(refresh + 1);
                    // setProdutosSelecionados([]);
                    // setRemover(false);
                  },
                },
              ])
            }
          >
            <AntDesign name="delete" size={26} color={colors.colorIcons} />
            <Text style={styles.menuText}>
              Apagar ({produtosSelecionados.length})
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

      <ProductCreateModal
        isVisible={isModalProductCreate}
        onClose={() => setModalProductCreate(false)}
        compareInSpreadsheet={compare_in_spreadsheet}
        uuidInventory={uuid}
        inputs={inputs_hability}
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

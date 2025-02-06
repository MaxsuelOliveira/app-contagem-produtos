import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

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

  useEffect(() => {
    Controller.Inventory.getProducts(uuid).then((products) => {
      setProductsInventory(products);
    });
  }, [refresh]);

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription}>{describe}</Text>

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
            <Text style={styles.label}>Impr. Planilha</Text>
            <Text style={styles.value}>
              {compare_in_spreadsheet ? "Sim" : "Não"}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.cardBody}>
        {productsInventory.map((item) => (
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
          />
        ))}
      </ScrollView>

      <View style={GlobalStyles.menubar}>
        <TouchableOpacity
          style={GlobalStyles.menubarItem}
          onPress={() => setModalVisibleExport(true)}
        >
          <AntDesign name="export" size={26} color={colors.colorIcons} />
          <Text style={styles.menuText}>Exportar</Text>
        </TouchableOpacity>

        {status === "progress" ? (
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

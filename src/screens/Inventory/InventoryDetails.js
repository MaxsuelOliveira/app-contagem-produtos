import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles, lightTheme } from "../../styles/GlobalStyles";

// Inventário
import CardInventoryDetails from "./CardInventoryDetails";
import ModalInvetorySettings from "./ModalInvetorySettings";
import ModalInvetoryExport from "./ModalInvetoryExport";

// Produtos
import ModalProductCreate from "../Product/ModalProductCreate";
import ModalProductUpdate from "../Product/ModalProductUpdate";

import { setStatus } from "../../components/CardInvetory/CardInventory";

import { Controller } from "../../utils/DB/controller";

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
    date_create
  );

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalProductUpdate, setModalProductUpdate] = useState(false);
  const [isModalVisibleSettings, setModalVisibleSettings] = useState(false);
  const [isModalVisibleExport, setModalVisibleExport] = useState(false);
  const [productsInventory, setProductsInventory] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [refresh, setRefresh] = useState(0);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalProductUpdate(true);
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
            <Text style={{ ...GlobalStyles.label, fontSize: 12 }}>Status</Text>
            <Text style={GlobalStyles.value}>{setStatus(status)}</Text>
          </View>

          <View style={styles.createInventarioInfoItem}>
            <Text style={{ ...GlobalStyles.label, fontSize: 12 }}>Item(s)</Text>
            <Text style={GlobalStyles.value}>{products.length}</Text>
          </View>

          <View style={styles.createInventarioInfoItem}>
            <Text style={{ ...GlobalStyles.label, fontSize: 12 }}>
              Iniciado
            </Text>
            <Text style={GlobalStyles.value}>{date_create_formart}</Text>
          </View>

          <View style={styles.createInventarioInfoItem}>
            <Text style={{ ...GlobalStyles.label, fontSize: 12 }}>
              Planilha
            </Text>
            <Text style={GlobalStyles.value}>
              {compare_in_spreadsheet ? "Sim" : "Não"}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.cardBody}>
        {productsInventory.map((item) => (
          <CardInventoryDetails
            key={item.uuid}
            uuid_inventory={uuid}
            uuid={item.uuid}
            codebar={item.codebar}
            quantity={item.quantity}
            name={item.name ? item.name : ""}
            price={item.price}
            inconsistency={item.inconsistency}
            onEdit={handleEditProduct} // Função para editar produto
          />
        ))}
      </ScrollView>

      <View style={{ ...GlobalStyles.menubar }}>
        {/* Exportar inventário para planilha */}
        <TouchableOpacity
          style={[GlobalStyles.menubarItem]}
          onPress={() => setModalVisibleExport(true)}
        >
          <AntDesign name="export" size={26} color={lightTheme.colorIcons} />
          <Text style={{ ...GlobalStyles.menubarText, fontSize: 10 }}>
            Exportar
          </Text>
        </TouchableOpacity>

        {/* Adicionar produto ao inventário */}
        <TouchableOpacity
          style={[GlobalStyles.menubarItem]}
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={26} color={lightTheme.colorIcons} />
          <Text style={{ ...GlobalStyles.menubarText, fontSize: 10 }}>
            Adicionar
          </Text>
        </TouchableOpacity>

        {/* Configurações do inventário */}
        <TouchableOpacity
          style={[GlobalStyles.menubarItem]}
          onPress={() => setModalVisibleSettings(true)}
        >
          <AntDesign name="setting" size={26} color={lightTheme.colorIcons} />
          <Text style={{ ...GlobalStyles.menubarText, fontSize: 10 }}>
            Configurações
          </Text>
        </TouchableOpacity>
      </View>

      <ModalProductUpdate
        isVisible={isModalProductUpdate}
        onClose={() => setModalProductUpdate(false)}
        product={selectedProduct}
        uuidInventory = {uuid}
      />

      <ModalInvetoryExport
        isVisible={isModalVisibleExport}
        onClose={() => setModalVisibleExport(false)}
      />

      <ModalProductCreate
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        compareInSpreadsheet={compare_in_spreadsheet}
        uuidInventory={uuid}
        inputs={inputs_hability}
      />

      <ModalInvetorySettings
        isVisible={isModalVisibleSettings}
        onClose={() => setModalVisibleSettings(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardHeader: {
    padding: 20,
    paddingBottom: 0,
    marginTop: 30,
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
  },

  cardBody: {
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },

  btnClose: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  btnCloseText: {
    fontSize: 18,
    color: "#333",
  },

  cardTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Montserrat_Bold",
  },

  cardDescription: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
    fontFamily: "Montserrat_Regular",
  },

  createInventarioInfo: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  createInventarioInfoItem: {
    flexDirection: "column",
    marginBottom: 8,
  },

  badge: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  menubar: {
    backgroundColor: "transparent",
  },

  menubarItemButton: {
    backgroundColor: "black",
    width: 70,
    height: 70,
    padding: "10",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  itemProduto: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  icon: {
    width: 30,
    height: 30,
  },

  itemInventarioDescription: {
    marginLeft: 12,
    flex: 1,
  },

  flexColumn: {
    marginBottom: 8,
  },

  itemDescriptionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  itemInventarioDetails: {
    flexDirection: "row",
    gap: 16,
  },

  inventarioContainerItem: {
    flex: 1,
  },

  textBreak: {
    flexWrap: "wrap",
  },
});

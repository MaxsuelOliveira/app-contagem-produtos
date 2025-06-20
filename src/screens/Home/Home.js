import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, useCallback } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

// Icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./Styles";

// Components
import CardItemInventory from "../../components/CardInvetory/CardInventory";
import ModalInventoryCreate from "../Inventory/InventoryCreateModal/InventoryCreateModal";
import InventoryDeleteModal from "../Inventory/InventoryDeleteModal/InventoryDeleteModal";
import LogoutModal from "../Login/LogoutModal/LogoutModal";

// Backend
import { Controller } from "@services/backend/controller";
import { decodeToken } from "@utils/utils";
import { getDateExpire, isExpired } from "@utils/utils";

const Home = () => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(0);
  const [profile, setProfile] = useState({});
  const [uuidSeleced, setUuidSelected] = useState("");
  const [activeTab, setActiveTab] = useState("inProgress");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [isModalLogoutVisible, setModalLogoutVisible] = useState(false);
  const [inventoriesProgress, setInventoriesProgress] = useState([]);
  const [inventoriesCompleted, setInventoriesCompleted] = useState([]);

  const badgeCountInProgress = inventoriesProgress.length;
  const badgeCountCompleted = inventoriesCompleted.length;

  useFocusEffect(
    useCallback(() => {
      setRefresh((prev) => prev + 1);
    }, [])
  );

  useEffect(() => {
    const fetchToken = async () => {
      const isDevice = await AsyncStorage.getItem("isDevice");
      if (isDevice) {
        const { expires_in } = JSON.parse(isDevice);
        if (isExpired(expires_in)) {
          Alert.alert("Sessão expirada", "Faça login novamente.");
          return;
        }
      }

      const token = await AsyncStorage.getItem("isToken");
      if (token) {
        const decoded = decodeToken(token);
        setProfile(decoded);
        return;
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    Controller.Inventory.getStatus("progress").then((response) => {
      setInventoriesProgress(response);
    });

    Controller.Inventory.getStatus("done").then((response) => {
      setInventoriesCompleted(response);
    });
  }, [refresh]);

  useEffect(() => {
    checkStoredData();
  }, []);

  const logout = () => {
    setModalLogoutVisible(true);
  };

  const handleEditProduct = (uuid) => {
    setUuidSelected(uuid);
    setModalDeleteVisible(true);
  };

  const checkStoredData = async () => {
    const isDevice = await AsyncStorage.getItem("isDevice");
    if (isDevice) {
      const { expires_in } = JSON.parse(isDevice);

      if (isExpired(expires_in)) {
        Alert.alert("Sessão expirada", "Faça login novamente.");
        return;
      }
    }
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar style="" backgroundColor="transparent" />

      <View style={styles.containerInvetoryList}>
        <View style={styles.headerProfile}>
          <View style={styles.headerProfileContainer}>
            <TouchableOpacity
              style={styles.buttonProfileHeader}
              onPress={() => navigation.navigate("Profile")}
            >
              <AntDesign name="user" size={26} color={"#fff"} />
            </TouchableOpacity>

            <Text style={styles.cardTitle}>
              Olá, {profile.nome || "usuário"} !
            </Text>
          </View>

          <TouchableOpacity
            style={styles.buttonSettings}
            onPress={() => navigation.navigate("Settings")}
          >
            <MaterialIcons
              name="settings"
              size={26}
              color={colors.colorIcons}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <View style={styles.inventoryCategories}>
            <TouchableOpacity
              style={[
                styles.category,
                activeTab === "inProgress" && styles.activeCategory,
              ]}
              onPress={() => setActiveTab("inProgress")}
            >
              <Text
                style={[
                  GlobalStyles.badge,
                  activeTab === "inProgress" && styles.activeBadge,
                ]}
              >
                {badgeCountInProgress}
              </Text>
              <Text
                style={[
                  styles.categoryText,
                  activeTab === "inProgress" && styles.activeCategoryText,
                ]}
              >
                Em progresso
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.category,
                activeTab === "completed" && styles.activeCategory,
              ]}
              onPress={() => setActiveTab("completed")}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeTab === "completed" && styles.activeCategoryText,
                ]}
              >
                Finalizados
              </Text>
              <Text
                style={[
                  GlobalStyles.badge,
                  activeTab === "completed" && styles.activeBadge,
                ]}
              >
                {badgeCountCompleted}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.inventoryContainer}>
          {activeTab === "inProgress" ? (
            <View style={styles.inventoryItem}>
              {inventoriesProgress.length > 0 ? (
                inventoriesProgress.map((item) => (
                  <CardItemInventory
                    key={item.uuid}
                    uuid={item.uuid}
                    name={item.name}
                    describe={item.describe}
                    products={item.products}
                    status={item.status}
                    date_create={item.date_create}
                    date_end={item.date_end}
                    compare_in_spreadsheet={item.compare_in_spreadsheet}
                    compare_price={item.compare_price}
                    inputs_hability={item.inputs_hability}
                    onEdit={handleEditProduct}
                  />
                ))
              ) : (
                <Text style={styles.inventoryItemText}>
                  Não há inventários em progresso.
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.inventoryItem}>
              {inventoriesCompleted.length > 0 ? (
                inventoriesCompleted.map((item) => (
                  <CardItemInventory
                    key={item.uuid}
                    uuid={item.uuid}
                    name={item.name}
                    describe={item.describe}
                    products={item.products}
                    status={item.status}
                    date_create={item.date_create}
                    date_end={item.date_end}
                    compare_in_spreadsheet={item.compare_in_spreadsheet}
                    compare_price={item.compare_price}
                    inputs_hability={item.inputs_hability}
                    onEdit={handleEditProduct}
                  />
                ))
              ) : (
                <Text style={styles.inventoryItemText}>
                  Não há inventários Finalizados.
                </Text>
              )}
            </View>
          )}
        </ScrollView>

        <View
          style={{ ...GlobalStyles.menubar, backgroundColor: "transparent" }}
        >
          <TouchableOpacity
            style={{
              ...GlobalStyles.menubarItem,
              minWidth: 70,
              minHeight: 70,
              backgroundColor: colors.primary,
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="plus" size={28} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>

      <ModalInventoryCreate
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

      <InventoryDeleteModal
        isVisible={isModalDeleteVisible}
        onClose={() => setModalDeleteVisible(false)}
        uuidInventory={uuidSeleced}
      />

      <LogoutModal
        isVisible={isModalLogoutVisible}
        onClose={() => setModalLogoutVisible(false)}
      />
    </View>
  );
};

export default Home;

import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

// Icons
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";
import { styles } from "./Styles";

// Components
import CardItemInventory from "../../components/CardInvetory/CardInventory";
import ModalInventoryCreate from "../Inventory/InventoryCreateModal/InventoryCreateModal";
import InventoryDeleteModal from "../Inventory/InventoryDeleteModal/InventoryDeleteModal";
import LogoutModal from "../Login/LogoutModal/LogoutModal";
import SignupBanner from "components/Banner/Banner";
import SpreadSheetsImport from "../SpreadSheetsImport/SpreadSheetsImport";

// Backend
import { Controller } from "../../services/backend/controller";
import { decodeToken } from "../../utils/token";

const Home = () => {
  const navigation = useNavigation();

  const [onboardingScreen, setOnboardingScreen] = useState(false);
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

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    Controller.Inventory.getStatus("progress").then((response) => {
      setInventoriesProgress(response);
    });

    Controller.Inventory.getStatus("done").then((response) => {
      setInventoriesCompleted(response);
    });
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        setProfile(decoded);
        return;
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    (async () => {
      let login = await AsyncStorage.getItem("token");
      if (!login) {
        setIsLogin(true);
        setOnboardingScreen(true);
      } else {
        setIsLogin(false);
        setOnboardingScreen(false);
      }
    })();
  }, []);

  const logout = () => {
    setModalLogoutVisible(true);
  };

  const handleEditProduct = (uuid) => {
    setUuidSelected(uuid);
    setModalDeleteVisible(true);
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar style="auto" backgroundColor="transparent" />

      <View style={styles.containerInvetoryList}>
        <View style={styles.header}>
          <View style={styles.headerTabs}>
            {isLogin ? (
              <SignupBanner
                onLogin={() => navigation.navigate("Login")}
                createAccount={() => navigation.navigate("CreateAccount")}
              />
            ) : null}

            <TouchableOpacity
              style={styles.buttonProfileHeader}
              onPress={() => navigation.navigate("Profile")}
            >
              <AntDesign name="user" size={26} color={colors.colorIcons} />
            </TouchableOpacity>
          </View>

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
                  styles.categoryText,
                  activeTab === "inProgress" && styles.activeCategoryText,
                ]}
              >
                Em progresso
              </Text>
              <Text
                style={[
                  GlobalStyles.badge,
                  activeTab === "inProgress" && styles.activeBadge,
                ]}
              >
                {badgeCountInProgress}
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

        <View style={GlobalStyles.menubar}>
          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => navigation.navigate("SpreadSheetsImport")}
          >
            <MaterialCommunityIcons
              name="google-spreadsheet"
              size={26}
              color={colors.colorIcons}
            />

            <Text style={GlobalStyles.menubarText}>Importar pla.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => setModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="plus"
              size={26}
              color={colors.colorIcons}
            />
            <Text style={GlobalStyles.menubarText}>Novo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => navigation.navigate("Settings")}
          >
            <MaterialIcons
              name="settings"
              size={26}
              color={colors.colorIcons}
            />
            <Text style={GlobalStyles.menubarText}>Configurações</Text>
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

  // Caso a conta seja gratuita, limitar a quantidade de inventários !
  // Limitar os inventários em progresso e finalizados
  // Limitar a quantidade de itens de inventário
  // Limitar o tamanho da  planilha que pode ser importada

  // Ao baixar o app ele abre a tela de spash e depois a tela home
  // Alerta de limite e conta grátuita !
};

export default Home;

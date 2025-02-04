import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";
import { styles } from "./Styles";

// Components
import CardItemInventory from "../../components/CardInvetory/CardInventory";
import ModalInventoryCreate from "../Inventory/InventoryCreateModal";

// Backend
import { Controller } from "../../utils/DB/controller";

const Home = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState("inProgress");
  const [isModalVisible, setModalVisible] = useState(false);

  const [inventoriesProgress, setInventoriesProgress] = useState([]);
  const [inventoriesCompleted, setInventoriesCompleted] = useState([]);

  const [profile, setProfile] = useState([]);

  const badgeCountInProgress = inventoriesProgress.length;
  const badgeCountCompleted = inventoriesCompleted.length;

  useEffect(() => {
    Controller.Inventory.getStatus("progress").then((response) => {
      setInventoriesProgress(response);
    });

    Controller.Inventory.getStatus("done").then((response) => {
      setInventoriesCompleted(response);
    });

    setProfile({
      id: 1,
      name: "Semprelar",
      email: "",
      phone: "",
      company: "",
    });
  }, []);

  const logout = () => {
    Alert.alert("Sair", "Deseja realmente sair do sistema?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        onPress: () => {
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <View style={GlobalStyles.container}>
      <StatusBar style="auto" backgroundColor="transparent" />

      <View style={styles.containerInvetoryList}>
        <View style={styles.header}>
          <View
            style={{
              marginBottom: 20,
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.textPrimary, width: "80%" }}>
              Olá. Bem vindo(a) <Text key={profile.id}>{profile.name}</Text>
            </Text>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => logout()}>
              <AntDesign name="logout" size={26} color={colors.colorIcons} />
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
                  />
                ))
              ) : (
                <Text style={styles.inventoryItemText}>
                  Não há inventários em andamento.
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
            onPress={() => navigation.navigate("Profile")}
          >
            <AntDesign name="user" size={26} color={colors.colorIcons} />
            <Text style={GlobalStyles.menubarText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="plus" size={26} color={colors.colorIcons} />
            <Text style={GlobalStyles.menubarText}>Novo inventário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => navigation.navigate("Settings")}
          >
            <AntDesign name="setting" size={26} color={colors.colorIcons} />
            <Text style={GlobalStyles.menubarText}>Configurações</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ModalInventoryCreate
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export default Home;

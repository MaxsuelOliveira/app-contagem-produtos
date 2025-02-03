import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AntDesign from "@expo/vector-icons/AntDesign";

import { GlobalStyles, lightTheme } from "../../styles/GlobalStyles";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// Screens
import CardItemInventory from "../../components/CardInvetory/CardInventory";
import ModalInventoryCreate from "../Inventory/ModalInventoryCreate";

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
              marginBottom: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...styles.textPrimary, width: "70%" }}>
              Olá. Bem vindo,{" "}
              <Text key={profile.id} style={{ color: lightTheme.textPrimary }}>
                {profile.name}
              </Text>
            </Text>

            <TouchableOpacity
              style={{ width: "30%", alignItems: "flex-end" }}
              onPress={() => logout()}
            >
              <AntDesign
                name="logout"
                size={26}
                color={lightTheme.colorIcons}
              />
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
            <AntDesign name="user" size={26} color={lightTheme.colorIcons} />
            <Text style={GlobalStyles.menubarText}>Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="plus" size={26} color={lightTheme.colorIcons} />
            <Text style={GlobalStyles.menubarText}>Novo inventário</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={GlobalStyles.menubarItem}
            onPress={() => navigation.navigate("Settings")}
          >
            <AntDesign name="setting" size={26} color={lightTheme.colorIcons} />
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

const styles = StyleSheet.create({
  inventoryCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },

  containerInvetoryList: {
    flex: 1,
    paddingTop: 10,
  },

  header: {
    padding: 20,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  category: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 10,
    flexDirection: "row",
  },

  activeCategory: {
    borderBottomWidth: 1,
    borderBottomColor: lightTheme.borderColor,
  },

  categoryText: {
    color: "#ababab",
    fontSize: 16,
    fontFamily: "Montserrat_Regular",
  },

  activeBadge: {
    backgroundColor: lightTheme.buttonBackground,
  },

  textPrimary: {
    fontSize: RFPercentage(3.5),
    fontFamily: "Montserrat_Bold",
  },

  inventoryContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
  },

  inventoryItem: {
    flex: 1,
    width: "100%",
    padding: 0,
  },

  inventoryItemText: {
    fontSize: 18,
    fontFamily: "Montserrat_Regular",
  },
});

export default Home;

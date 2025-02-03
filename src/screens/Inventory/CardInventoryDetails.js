import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { GlobalStyles, lightTheme } from "../../styles/GlobalStyles";


const CardInventoryDetails = ({
  uuid_inventory,
  uuid,
  codebar,
  quantity,
  name,
  price,
  inconsistency,
  onEdit
}) => {
  const truncatedName = name.length > 20 ? name.substring(0, 20) + "..." : name;
  const inconsistencyText = inconsistency ? "Sim" : "Não";

  const confirmDelete = () => {
    Alert.alert("Excluir produto", "Deseja realmente excluir este produto?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", onPress: () => console.log("Excluindo produto") },
    ]);
  };

  const handleEdit = () => {
    const productData = {
      uuid,
      codebar,
      quantity : quantity.toString(),
      name,
      price,
      inconsistency,
    };
    onEdit(productData); // Passando os dados para abrir o modal
  };

  return (
    <TouchableOpacity onLongPress={handleEdit} delayLongPress={100}>
      <View style={styles.inventoryItem}>
        <View style={styles.inventoryItemContent}>
          <Text style={styles.label}>Código de barras</Text>
          <Text style={styles.title}>{codebar}</Text>
          <View style={styles.inventoryItemContainer}>
            <InventoryDetail label="Qnt(s)" value={quantity} />
            <InventoryDetail label="Nome" value={truncatedName} />
            <InventoryDetail label="Inconsistência" value={inconsistencyText} />
            <InventoryDetail label="Preço" value={price} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const InventoryDetail = ({ label, value }) => (
  <View style={styles.inventoryItemContainerItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  inventoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: lightTheme.backgroundItem,
    margin: 10,
    marginBottom: 15,
    padding: 10,
    borderRadius: 15,
  },

  inventoryItemContent: {
    padding: 5,
    gap: 5,
  },

  inventoryItemContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  inventoryItemContainerItem: {
    marginRight: 15,
    marginBottom: 5,
  },

  inventoryItemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 20,
    minHeight: 60,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: lightTheme.textPrimary,
  },

  label: {
    fontSize: 12,
    fontFamily: "Montserrat_Regular",
    color: lightTheme.textDescription,
  },

  value: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: lightTheme.textDescription,
  },

  menuButton: {
    backgroundColor: "#fff",
    minWidth: 50,
    minHeight: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default CardInventoryDetails;

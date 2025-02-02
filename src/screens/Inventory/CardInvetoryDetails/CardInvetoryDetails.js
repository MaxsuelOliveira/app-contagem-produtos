import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { GlobalStyles, lightTheme } from "../../../styles/GlobalStyles";
import AntDesign from "@expo/vector-icons/AntDesign";

const CardInvetoryDetails = ({
  uuid,
  codebar,
  quantity,
  name,
  price,
  inconsistency,
  onEdit,
}) => {
  name = name.length > 20 ? name.substring(0, 20) + "..." : name;

  const [isOptions, setIsOptions] = useState(false);
  const showOptionsItem = () => {
    setIsOptions(!isOptions);
  };

  const confirmDelete = () => {
    Alert.alert("Excluir produto", "Deseja realmente excluir este produto?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => console.log("Excluindo produto"),
      },
    ]);
  };

  const confirmUpdate = () => {
    onEdit();
  };

  return (
    <TouchableOpacity
      onTouchEnd={null}
      onLongPress={showOptionsItem}
      delayLongPress={300}
    >
      <View style={styles.inventoryItem}>
        {isOptions === false ? (
          <View style={styles.inventoryItemContent}>
            <Text style={styles.label}>Código de barras</Text>
            <Text style={styles.title}>{codebar}</Text>
            <View style={styles.invetoryItemContainer}>
              <View style={styles.invetoryItemContainerItem}>
                <Text style={styles.label}>Item(s)</Text>
                <Text style={styles.value}>{quantity}</Text>
              </View>
              <View style={styles.invetoryItemContainerItem}>
                <Text style={styles.label}>Nome</Text>
                <Text style={styles.value}>{name}</Text>
              </View>
              <View style={styles.invetoryItemContainerItem}>
                <Text style={styles.label}>Inconsistência</Text>
                <Text style={styles.value}>{inconsistency}</Text>
              </View>
              <View style={styles.invetoryItemContainerItem}>
                <Text style={styles.label}>Preço</Text>
                <Text style={styles.value}>{price}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.invetoryItemActions}>
            <View style={{ flex: 1 }}>
              <View style={{ marginBottom: 5 }}>
                <Text style={styles.label}>Código de barras</Text>
                <Text style={styles.title}>{codebar}</Text>
              </View>
              <Text style={styles.label}>Quantidade</Text>
              <Text style={styles.title}>{quantity}</Text>
            </View>

            <TouchableOpacity
              style={[GlobalStyles.menubarItem, styles.menuButtton]}
              onPress={() => confirmUpdate()}
            >
              <AntDesign name="edit" size={24} color={lightTheme.textPrimary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[GlobalStyles.menubarItem, styles.menuButtton]}
              onPress={() => confirmDelete()}
            >
              <AntDesign
                name="delete"
                size={24}
                color={lightTheme.textPrimary}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

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

  invetoryItemContainer: {
    flexDirection: "row",
    // gap: 20,
    flexWrap: "wrap",
  },

  invetoryItemContainerItem: {
    marginRight: 15,
    marginBottom: 5,
  },

  invetoryItemActions: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
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
    color: lightTheme.textDescription,
    fontFamily: "Montserrat_Medium",
  },

  menuButtton: {
    backgroundColor: "#fff",
    minWidth: 50,
    minHeight: 50,
    maxHeight: 50,
    maxWidth: 50,
    borderRadius: 50,
    alignContent: "center",
    justifyContent: "center",
    padding: 5,
  },
});

export default CardInvetoryDetails;

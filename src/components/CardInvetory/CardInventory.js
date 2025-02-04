import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../styles/GlobalStyles";

export function setStatus(status) {
  if (status === "progress") {
    return "Em progresso";
  } else if (status === "done") {
    return "Finalizado";
  } else {
    return "Desconhecido";
  }
}

const CardItemInventory = ({
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
}) => {
  const navigation = useNavigation();

  const date_create_formart = new Intl.DateTimeFormat("pt-BR").format(
    date_create
  );

  const callback = () => {
    navigation.navigate("InventoryDetails", {
      uuid: uuid,
      name: name,
      describe: describe,
      products: products,
      status: status,
      date_create: date_create.toString(),
      date_end: date_end.toString(),
      compare_in_spreadsheet: compare_in_spreadsheet,
      compare_price: compare_price,
      inputs_hability: inputs_hability
    });
  };

  return (
    <View style={styles.inventoryItem} onTouchEnd={() => callback()}>
      <View style={styles.inventoryItemContent}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.invetoryItemContainer}>
          <View>
            <Text style={styles.label}>Item(s)</Text>
            <Text style={styles.value}>{products.length}</Text>
          </View>
          <View>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{setStatus(status)}</Text>
          </View>
          <View>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>{date_create_formart}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inventoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: colors.backgroundItem,
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
    gap: 30,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
  },

  label: {
    fontSize: 12,
    fontFamily: "Montserrat_Regular",
    color: colors.textDescription,
  },

  value: {
    fontSize: 13,
    // fontSize: RFPercentage(2.3),
    color: colors.textDescription,
    fontFamily: "Montserrat_Medium",
  },
});

export default CardItemInventory;

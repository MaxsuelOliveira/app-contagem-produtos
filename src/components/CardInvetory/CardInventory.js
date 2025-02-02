import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { lightTheme } from "../../styles/GlobalStyles";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const CardItemInventory = ({
  uuid,
  title,
  describe,
  items,
  status,
  date_create,
  date_end,
  compare_in_spreadsheet,
  compare_price,
  inputs_hability,
}) => {
  const navigation = useNavigation();

  const callback = () => {
    navigation.navigate("InventoryDetails", {
      uuid: uuid,
      title: title,
      describe: describe,
      items: items,
      status: status,
      date_create: date_create,
      date_end: date_end,
      compare_in_spreadsheet: compare_in_spreadsheet,
      compare_price: compare_price,
      inputs_hability: inputs_hability,
    });
  };

  return (
    <View style={styles.inventoryItem} onTouchEnd={() => callback()}>
      <View style={styles.inventoryItemContent}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.invetoryItemContainer}>
          <View>
            <Text style={styles.label}>Item(s)</Text>
            <Text style={styles.value}>{items.length}</Text>
          </View>
          <View>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{status}</Text>
          </View>
          <View>
            <Text style={styles.label}>Data</Text>
            <Text style={styles.value}>{date_create}</Text>
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
    gap: 30,
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
    // fontSize: RFPercentage(2.3),
    color: lightTheme.textDescription,
    fontFamily: "Montserrat_Medium",
  },
});

export default CardItemInventory;

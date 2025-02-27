import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Styles
import { styles } from "./styles";

import { setStatus } from "@utils/utils";

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
  onEdit,
}) => {
  const navigation = useNavigation();

  const date_create_formart = new Intl.DateTimeFormat("pt-BR").format(
    date_create
  );

  const date_end_formart = new Intl.DateTimeFormat("pt-BR").format(date_end);

  const callback = () => {
    navigation.navigate("InventoryDetails", {
      uuid: uuid,
      name: name,
      describe: describe,
    });
  };

  function handleEdit() {
    onEdit(uuid);
  }

  return (
    <TouchableOpacity
      style={styles.inventoryItem}
      onPress={callback}
      onLongPress={status !== "done" ? handleEdit : undefined}
      delayLongPress={100}
    >
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
            <Text style={styles.label}>
              {status === "done" ? "Finalizado" : "Criado"}
            </Text>
            <Text style={styles.value}>
              {status === "done" ? date_end_formart : date_create_formart}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItemInventory;

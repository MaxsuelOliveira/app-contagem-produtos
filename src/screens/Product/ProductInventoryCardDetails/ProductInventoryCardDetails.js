import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

import { styles } from "./styles";

const ProductInventoryCardDetails = ({
  uuid_inventory,
  uuid,
  codebar,
  quantity,
  name,
  price,
  inconsistency,
  onEdit,
  onSelected,
}) => {
  const [id, setId] = useState(uuid);
  const [isCheck, setIsCheck] = useState(false);

  const truncatedName = name.length > 20 ? name.substring(0, 20) + "..." : name;
  const tructedCodebar =
    codebar.length > 14 ? codebar.substring(0, 14) + "..." : codebar;
  const priceFormatted = price ? `R$ ${price}` : 0;
  const inconsistencyText = inconsistency ? "Sim" : "Não";

  const handleEdit = () => {
    const productData = {
      uuid,
      codebar,
      quantity: quantity.toString(),
      name,
      price,
      inconsistency,
    };
    onEdit(productData);
  };

  const handleLongPress = () => {
    let { check, id } = onSelected(uuid);
    setId(id);
    setIsCheck(check);

    console.log("id", id);
    console.log("isCheck", isCheck);

  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      delayLongPress={150}
      onPress={handleEdit}
    >
      <View
        style={{
          ...styles.inventoryItem,
          ...(inconsistency ? styles.itemWarning : {}),
          ...(isCheck ? styles.inventoryItemSelected : {}),
        }}
      >
        <View style={styles.inventoryItemContent}>
          <View style={styles.inventoryItemContainer}>
            <InventoryDetail label="Código de barras" value={tructedCodebar} />
            <InventoryDetail label="Qnt(s)" value={quantity} />
            {name ? (
              <InventoryDetail label="Nome" value={truncatedName} />
            ) : null}
            {price ? (
              <InventoryDetail label="Preço" value={priceFormatted} />
            ) : null}
            {/* <InventoryDetail label="Inconsis." value={inconsistencyText} /> */}
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

export default ProductInventoryCardDetails;

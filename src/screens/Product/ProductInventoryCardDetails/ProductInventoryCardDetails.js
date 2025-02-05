import { View, Text, Alert, TouchableOpacity } from "react-native";
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
  onEdit
}) => {
  const truncatedName = name.length > 20 ? name.substring(0, 20) + "..." : name;
  const inconsistencyText = inconsistency ? "Sim" : "Não";

  const handleEdit = () => {
    const productData = {
      uuid,
      codebar,
      quantity : quantity.toString(),
      name,
      price,
      inconsistency,
    };
    onEdit(productData); 
  };

  return (
    <TouchableOpacity onLongPress={handleEdit} delayLongPress={50}>
      <View style={{...styles.inventoryItem , ...(inconsistency ? styles.itemWarning : {})}}>
        <View style={styles.inventoryItemContent}>
          <Text style={styles.label}>Código de barras</Text>
          <Text style={styles.title}>{codebar}</Text>
          <View style={styles.inventoryItemContainer}>
            <InventoryDetail label="Qnt(s)" value={quantity} />
            {name ? (<InventoryDetail label="Nome" value={truncatedName}/>) : (null)}
            {price ? (<InventoryDetail label="Preço" value={price} />) : (null)}
            <InventoryDetail label="Inconsis." value={inconsistencyText} />
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

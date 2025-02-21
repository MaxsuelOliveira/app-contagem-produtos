import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

// Styles
import { styles } from "./styles";
import { colors } from "@styles/GlobalStyles";

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
  const [productMarket, setProductMarket] = useState(false);

  const truncatedName = name.length > 20 ? name.substring(0, 20) + "..." : name;
  const tructedCodebar =
    codebar.length > 14 ? codebar.substring(0, 14) + "..." : codebar;
  const priceFormatted = price ? `R$ ${price}` : 0;

  const handleEdit = () => {
    const product = {
      uuid,
      codebar,
      quantity: quantity.toString(),
      name,
      price,
      inconsistency,
    };
    onEdit(product);
  };

  const handleLongPress = () => {
    onSelected(uuid);
    setProductMarket(!productMarket);
  };

  return (
    <TouchableOpacity
      onLongPress={handleLongPress}
      delayLongPress={150}
      onPress={handleEdit}
    >
      <View
        style={{
          ...styles.productItem,
          ...(inconsistency ? null : {}),
          ...(productMarket ? styles.productItemSelected : {}),
        }}
      >
        <View style={styles.productItemContent}>
          <View style={styles.productBagderContainer}>
            <Text style={[styles.productBagder, styles.productBagderQuantity]}>
              {quantity}x
            </Text>
            {inconsistency && (
              <Text
                style={[
                  styles.productBagder,
                  styles.productBagderInconsistency,
                ]}
              >
                Inconsistência
              </Text>
            )}
          </View>

          <View style={styles.productItemContainer}>
            <InventoryDetail label="Código de barras" value={tructedCodebar} />
            {name ? (
              <InventoryDetail label="Nome" value={truncatedName} />
            ) : null}
            {price ? (
              <InventoryDetail label="Preço" value={priceFormatted} />
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const InventoryDetail = ({ label, value }) => (
  <View style={styles.productItemContainerItem}>
    <Text style={styles.productLabel}>{label}</Text>
    <Text style={styles.productValue}>{value ? value.toString() : "N/A"}</Text>
  </View>
);

export default ProductInventoryCardDetails;

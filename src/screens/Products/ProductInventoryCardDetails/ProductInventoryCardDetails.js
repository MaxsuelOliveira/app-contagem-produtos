import { View, Text, Alert, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";

// Styles
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
          ...(isCheck ? styles.productItemSelected : {}),
        }}
      >
        <View style={styles.productItemContent}>

        <View style={{position : 'absolute', leeft: 0, top: -20, flexDirection : 'row' , gap : 10}}>
          <Text style={styles.productBagder}>{quantity}x</Text>
          {inconsistency ? (<Text style={[styles.productBagder , styles.itemWarning]}>Inconsistência</Text>) : null}
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
    <Text style={styles.productValue}>{value}</Text>
  </View>
);

export default ProductInventoryCardDetails;

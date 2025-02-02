import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles, lightTheme } from "../../../styles/GlobalStyles";

export default function CardSpreadSheets({
  uuid,
  title,
  describe,
  products,
  data_create,
}) {

  const confirmDelete = () => {
    Alert.alert("Excluir planilha", "Deseja realmente excluir esta planilha?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => console.log("Excluindo planilha"),
      },
    ]);
  };

  return (
    <View style={styles.itemInventario}>
      <View style={styles.itemContent}>
        {/* <Image source={require('../../assets/icons/table.png')} style={styles.icon} /> */}

        <View style={styles.description}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          <View style={styles.info}>
            <View>
                <Text style={GlobalStyles.small}>Importada em</Text>
                <Text style={styles.infoText}>{data_create}</Text>
            </View>
            <View style={styles.circleDivider} />
            <View>
            <Text style={GlobalStyles.small}>Produtos</Text>
                <Text style={styles.infoText}>{products.length}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuButtton}
          onPress={() => confirmDelete()}
        >
          <AntDesign name="delete" size={20} color={lightTheme.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemInventario: {
    width: "100%",
    padding: 10,
    backgroundColor: "#a5a4a40d", // Aplicado do #listar-planilhas-importadas .item-inventario
    borderRadius: 8,
    marginBottom: 10,
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15, // Aplicado do .item-inventario--content
  },

  menuButtton: {
    width: 35,
    minHeight: 35,
    backgroundColor: "#E5E5E5",
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  description: {
    flex: 1,
  },

  title: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },

  titleText: {
    fontFamily: "Montserrat_Regular",
    fontSize: 16,
    color: "#1B1B1B",
  },

  info: {
    flexDirection: "row",
    alignItems: "center",
  },

  infoText: {
    fontSize: 12,
    fontFamily: "Montserrat_Light",
    color: "#646363", // Aplicado do .item-inventario-description--info p
    marginRight: 10,
  },

  circleDivider: {
    width: 5,
    height: 5,
    borderRadius: 100,
    backgroundColor: "#C0C0C0", // Aplicado do .circle-divider
    marginRight: 10,
  },
});

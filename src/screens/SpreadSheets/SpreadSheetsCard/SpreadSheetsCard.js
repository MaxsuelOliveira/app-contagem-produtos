import { Alert, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { styles } from "./styles";

export default function CardSpreadSheets({
  uuid,
  title,
  describe,
  products,
  data_create,
}) {
  data_create = new Date(data_create).toLocaleDateString("pt-BR");

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
        <View style={styles.description}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{title}</Text>
          </View>

          <View style={styles.info}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.infoText}>
                Data, importação {data_create}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.infoText}>Produto(s) {products.length} </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuButtton}
          onPress={() => confirmDelete()}
        >
          <AntDesign name="delete" size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { useNavigation } from "@react-navigation/native";
import { Alert, View, Text, TouchableOpacity } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { styles } from "./styles";

// Backend
import { Controller } from "services/DB/controller";

export default function CardSpreadSheets({
  uuid,
  name,
  products,
  date_create,
}) {
  const navigation = useNavigation();

  const date_create_formart = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date_create);

  const alertDelete = () => {
    Alert.alert("Excluir planilha", "Deseja realmente excluir esta planilha?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        onPress: () => confirmDelete(),
      },
    ]);
  };

  const confirmDelete = async () => {
    let responseDelete = await Controller.SpreadSheets.remove(uuid);

    if (responseDelete) {
      Alert.alert("Sucesso", "Planilha excluída com sucesso !");
      navigation.navigate("Settings");
      return;
    }
    Alert.alert("Erro ao excluir a planilha !" , responseDelete);
    console.error(responseDelete);
  };

  return (
    <View style={styles.itemInventario}>
      <View style={styles.itemContent}>
        <View style={styles.description}>
          <View style={styles.title}>
            <Text style={styles.titleText}>{name}</Text>
          </View>

          <View style={styles.info}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.infoText}>
                Importada em {date_create_formart}
              </Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.infoText}>Produto(s) {products} </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => alertDelete()}>
          <AntDesign name="delete" size={20} color={"#fff"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

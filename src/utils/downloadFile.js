import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";

export const downloadFile = async (fileUrl, fileName) => {
  try {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;

    const { uri } = await FileSystem.downloadAsync(fileUrl, fileUri);

    Alert.alert("Download concluído!", `Arquivo salvo em: ${uri}`);

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Compartilhamento não disponível.");
    }
  } catch (error) {
    console.error("Erro ao baixar o arquivo:", error);
    Alert.alert("Erro", "Falha ao baixar o arquivo.");
  }
};



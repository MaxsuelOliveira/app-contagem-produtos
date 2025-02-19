import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import Papa from "papaparse";
import { Buffer } from "buffer";
import { Alert } from "react-native";
import uuid from "react-native-uuid";

// Backend
import { Model } from "../services/backend/model";

const saveSheet = async (data) => {
  let productResult = [];

  const date_create_formart = new Intl.DateTimeFormat("pt-BR")
    .format(new Date())
    .replace(/\//g, "-");

  let sheet = {
    uuid: uuid.v4(),
    date_create: new Date(),
    name: `Planilha-${date_create_formart}`,
    products: [],
  };

  data.forEach((element) => {
    let productSchema = {
      codebar: element.TMER_CODIGO_BARRAS_UKN || "",
      name: element.TMER_NOME || "",
      price: element.TMER_PRECO || 0,
    };

    productResult.push(productSchema);
  });

  sheet.products = productResult;

  Model.SpreadSheets.create(sheet)
    .then((response) => {
      Alert.alert("Sucesso", "📄 Planilha salva com sucesso !");
    })
    .catch((error) => {
      console.error(`❌ Erro ao salvar planilha  : ${error} !`);
    });
};

const importFileSpreadSheets = async (setData, account) => {
  try {
    let parsedData = [];

    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/json",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel", // Para arquivos .xls antigos
      ],
    });

    if (result.canceled) return;

    const fileUri = result.assets[0].uri;
    const fileType = result.assets[0].mimeType;

    const response = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64, // Ler como base64
    });

    if (fileType === "application/json") {
      parsedData = JSON.parse(response);
    } else if (fileType === "text/csv") {
      parsedData = Papa.parse(response, { header: true }).data;
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      Alert.alert(
        "⚠️ Aviso",
        "Aguardando a conversão do arquivo, por favor aguarde !"
      );

      // Converter Base64 para Buffer
      const workbook = XLSX.read(Buffer.from(response, "base64"), {
        type: "buffer",
      });

      // Pegar a primeira planilha
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Converter planilha para JSON
      parsedData = XLSX.utils.sheet_to_json(sheet);
    }

    if (parsedData.length === 0) {
      Alert.alert("❌ Nenhum dado encontrado no arquivo !");
      return;
    }

    if (account === "free") {
      if (parsedData.length > 500) {
        Alert.alert(
          "⚠️ Aviso",
          "A quantidade supera o limite de 500 registros, apenas os 5.0000 primeiros serão importados !"
        );
        Alert.alert(
          "⚠️ Aviso",
          "Faça a sua conta premium para importar mais de 5.000 registros !"
        );
        parsedData = parsedData.slice(0, 5000);
      }
    }

    if (parsedData.length > 10000) {
      Alert.alert(
        "⚠️ Aviso",
        "O arquivo contém muitos dados, isso pode demorar um pouco !"
      );
    }

    Alert.alert("👍 Tudo certo ! ", "Arquivo convertido com sucesso !");

    // Salvar os dados no banco de dados
    saveSheet(parsedData);

    // Definir os dados no estado
    setData(parsedData);
  } catch (error) {
    Alert.alert("❌ Erro ao importar arquivo !", error);
    console.error("Erro ao importar arquivo !", error);
  }
};

export default importFileSpreadSheets;

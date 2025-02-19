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
    console.time("⏳ Tempo total"); // Marca o tempo inicial

    console.log("📂 Selecionando arquivo...");
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/json",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
    });

    if (result.canceled) {
      console.log("⚠️ Importação cancelada pelo usuário.");
      return;
    }

    const fileUri = result.assets[0].uri;
    const fileType = result.assets[0].mimeType;
    console.log(`📄 Arquivo selecionado: ${fileType}`);

    // ⚡ Lê o arquivo como buffer (evita base64 para melhorar performance)
    console.time("📥 Leitura do arquivo");
    const fileBuffer = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.timeEnd("📥 Leitura do arquivo");

    let parsedData = [];

    // ⚡ Processamento assíncrono com Promise.all
    if (fileType === "application/json") {
      console.time("📜 Parsing JSON");
      parsedData = JSON.parse(fileBuffer);
      console.timeEnd("📜 Parsing JSON");
    } else if (fileType === "text/csv") {
      console.time("📜 Parsing CSV");
      parsedData = Papa.parse(atob(fileBuffer), { header: true }).data;
      console.timeEnd("📜 Parsing CSV");
    } else if (
      fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      console.time("📜 Parsing XLSX");
      const workbook = XLSX.read(fileBuffer, { type: "base64" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      parsedData = XLSX.utils.sheet_to_json(sheet);
      console.timeEnd("📜 Parsing XLSX");
    }

    if (!parsedData.length) {
      Alert.alert("❌ Nenhum dado encontrado no arquivo!");
      return;
    }

    // ⚡ Aplica o limite conforme o plano do usuário
    const maxLimit = account === "free" ? 5000 : 10000;
    if (parsedData.length > maxLimit) {
      console.warn(`🔻 Reduzindo registros para o limite de ${maxLimit}`);
      parsedData = parsedData.slice(0, maxLimit);
    }

    console.time("💾 Salvando no banco");
    await saveSheet(parsedData);
    console.timeEnd("💾 Salvando no banco");

    console.log("✅ Arquivo processado com sucesso!");
    setData(parsedData);

    console.timeEnd("⏳ Tempo total"); // Marca o tempo final
  } catch (error) {
    console.error("❌ Erro ao importar arquivo!", error);
    Alert.alert("Erro ao importar arquivo!", error.message);
  }
};

export default importFileSpreadSheets;

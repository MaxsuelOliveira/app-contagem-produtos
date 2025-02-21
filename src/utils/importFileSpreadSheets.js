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
  if (!data || !Array.isArray(data) || data.length === 0) {
    Alert.alert("Erro", "Nenhum dado válido para salvar.");
    return;
  }

  const formattedDate = new Intl.DateTimeFormat("pt-BR")
    .format(new Date())
    .replace(/\//g, "-");

  const sheet = {
    uuid: uuid.v4(),
    date_create: new Date(),
    name: `Planilha-${formattedDate}`,
    products: data.map((item) => ({
      codebar: item.TMER_CODIGO_BARRAS_UKN || "",
      name: item.TMER_NOME || "",
      price: item.TMER_PRECO || 0,
    })),
  };

  try {
    await Model.SpreadSheets.create(sheet);
    Alert.alert("Sucesso", "📄 Planilha salva com sucesso!");
  } catch (error) {
    console.error(`❌ Erro ao salvar planilha: ${error.message}`);
  }
};

const importFileSpreadSheets = async (
  setData,
  account,
  setImportProcessing,
  importProcessingText
) => {
  try {
    setImportProcessing(true);
    console.time("⏳ Tempo total");

    importProcessingText("📂 Selecionando arquivo...");
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/json",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
    });

    if (result.canceled) {
      importProcessingText("📂 Importação cancelada.");
      return;
    }

    const { uri: fileUri, mimeType: fileType } = result.assets[0];
    importProcessingText(`📄 Arquivo selecionado: ${fileType}`);

    // Lê o arquivo como Base64 para otimizar o processamento
    importProcessingText("📥 Lendo arquivo...");
    const fileBuffer = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    let parsedData = [];

    switch (fileType) {
      case "application/json":
        importProcessingText("📄 Lendo JSON...");
        parsedData = JSON.parse(fileBuffer);
        break;

      case "text/csv":
        importProcessingText("📄 Lendo CSV...");
        parsedData = Papa.parse(Buffer.from(fileBuffer, "base64").toString(), {
          header: true,
        }).data;
        break;

      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-excel":
        importProcessingText("📄 Lendo XLSX...");
        const workbook = XLSX.read(fileBuffer, { type: "base64" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        parsedData = XLSX.utils.sheet_to_json(sheet);
        break;

      default:
        importProcessingText("❌ Tipo de arquivo não suportado.");
        return;
    }

    if (!parsedData.length) {
      importProcessingText("📄 Nenhum dado encontrado no arquivo.");
      return;
    }

    // Aplica limite conforme plano do usuário
    const maxLimit = account === "free" ? 5000 : 10000;
    if (parsedData.length > maxLimit) {
      importProcessingText(
        `📄 Limite de registros excedido. Apenas ${maxLimit} serão importados.`
      );
      parsedData = parsedData.slice(0, maxLimit);
    }

    importProcessingText("💾 Salvando no banco de dados...");
    await saveSheet(parsedData);

    importProcessingText("✅ Importação concluída com sucesso!");
    setData(parsedData);

    console.timeEnd("⏱️ Tempo total de processamento");
  } catch (error) {
    importProcessingText("❌ Erro ao importar arquivo!");
    console.error("❌ Erro ao importar arquivo:", error);
  } finally {
    setProgress(false);
  }
};

export default importFileSpreadSheets;

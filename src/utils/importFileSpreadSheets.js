import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import XLSX from "xlsx";
import Papa from "papaparse";
import { Buffer } from "buffer";
import uuid from "react-native-uuid";

// Backend
import { Model } from "@services/backend/model";

const saveSheet = async (fileName, data, setTitle, setDescription) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    setTitle("❌ Erro ao salvar planilha!");
    setDescription("Não foi possível salvar a planilha.");
    return;
  }

  const sheet = {
    uuid: uuid.v4(),
    date_create: new Date(),
    name: fileName,
    products: data,
  };

  try {
    await Model.SpreadSheets.create(sheet);
    setTitle("✅ Planilha salva com sucesso!");
    setDescription("A planilha foi salva com sucesso no banco de dados.");
  } catch (error) {
    setTitle("❌ Erro ao salvar planilha!");
    setDescription("Não foi possível salvar a planilha.");
    console.error(error);
  }
};

const parseExcel = (fileBuffer) => {
  try {
    const workbook = XLSX.read(fileBuffer, { type: "base64" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    let parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    if (!Array.isArray(parsedData) || parsedData.length < 2) {
      console.error("❌ Erro: Planilha vazia ou formato incorreto!");
      return [];
    }

    // Lendo a primeira linha como cabeçalho
    const headerRow = parsedData[0].map((h) =>
      h.toString().trim().toLowerCase()
    );

    // Verificando se as colunas esperadas estão presentes
    // const codebarIndex = headerRow.findIndex((h) =>h.includes("TMER_CODIGO_BARRAS_UKN"));
    // const nameIndex = headerRow.findIndex((h) => h.includes("TMER_NOME"));
    // const priceIndex = headerRow.findIndex((h) =>h.includes("TMER_PRECO_VENDA"));

    // if (codebarIndex === -1 || nameIndex === -1 || priceIndex === -1) {
    //   console.error("❌ Erro: Colunas esperadas não encontradas!");
    //   return [];
    // }

    const processedData = parsedData.slice(1).map((row, index) => {
      return {
        codebar: row[0] ? row[0].toString().trim() : "",
        name: row[1] ? row[1].toString().trim() : "SEM NOME",
        price: row[2] ? parseFloat(row[2]) || 0.0 : 0.0,
      };
    });

    return processedData;
  } catch (error) {
    console.error("❌ Erro ao processar planilha Excel:", error);
    return [];
  }
};

const importFileSpreadSheets = async (
  setData,
  account,
  setProcessing,
  setLoading,
  setTitle,
  setDescription
) => {
  try {
    setProcessing(true);
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        "application/json",
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
    });

    if (result.canceled) {
      setLoading(false);
      setProcessing(false);
      setTitle("📂 Importação cancelada.");
      setDescription("A importação foi cancelada.");
      return;
    }

    const { uri: fileUri, mimeType: fileType } = result.assets[0];
    const fileName = result.assets[0].name;
    setLoading(true);
    setProcessing(true);

    setTitle("📄 Arquivo selecionado");
    setDescription("O arquivo foi selecionado. Processando...");

    const fileBuffer = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    let parsedData = [];
    console.log("Tipo de arquivo:", fileType);

    if (fileType.includes("json")) {
      parsedData = JSON.parse(fileBuffer);
    } else if (fileType.includes("csv")) {
      parsedData = Papa.parse(Buffer.from(fileBuffer, "base64").toString(), {
        header: true,
      }).data;
    } else if (
      fileType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileType === "application/vnd.ms-excel"
    ) {
      parsedData = parseExcel(fileBuffer);
    }

    if (!parsedData.length) {
      setLoading(false);
      setTitle("Nenhum dado encontrado");
      setDescription("O arquivo não contém dados válidos.");
      return;
    }

    const maxLimit = account === "free" ? 100 : 1000000000;
    if (parsedData.length > maxLimit) {
      setTitle("Limite de importação excedido");
      setDescription(
        `O limite é de ${maxLimit} registros. Seu arquivo possui ${parsedData.length}.`
      );
      parsedData = parsedData.slice(0, maxLimit);
    }

    setLoading(false);
    setTitle("✅ Importação concluída!");
    setDescription("O arquivo foi importado com sucesso.");
    await saveSheet(fileName, parsedData, setTitle, setDescription);
    setData(parsedData);
  } catch (error) {
    setLoading(false);
    setProcessing(false);
    setTitle("❌ Erro ao importar arquivo!");
    setDescription("Ocorreu um erro ao importar o arquivo. Tente novamente.");
    console.error("❌ Erro ao importar arquivo:", error);
  }
};

export default importFileSpreadSheets;

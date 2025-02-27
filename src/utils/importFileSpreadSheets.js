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

/**
 * Converte planilha Excel para JSON
 */
const parseExcel = (fileBuffer) => {
  try {
    
    const workbook = XLSX.read(fileBuffer, { type: "base64" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // Verificar a quantidade de colunas
  const expectedColumns = 3; // Código de barras, Nome, Preço
  const actualColumns = parsedData[0].length;
  console.log("📄 Dados brutos do Excel:", sheet);

  let parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  console.log("🔍 Dados extraídos do Excel:", parsedData);

  if (!Array.isArray(parsedData) || parsedData.length < 2) {
    console.error("❌ Erro: Planilha vazia ou formato incorreto!");
    return [];
  }

  // Verifica cada linha processada
  const processedData = parsedData.slice(1).map((row, index) => {
    console.log(`📊 Linha ${index + 2}:`, row);

    return {
      codebar: row[0] ? row[0].toString().trim() : "",
      name: row[1] ? row[1].toString().trim() : "SEM NOME",
      price: row[2] ? parseFloat(row[2]) || 0.0 : 0.0,
    };
  });

  console.log("✅ Dados processados:", processedData);

  return processedData;

  } catch (error) {
  
    console.error("❌ Erro ao processar planilha Excel:", error);
    
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
  function importCancel() {
    setLoading(false);
    setProcessing(false);
    setTitle("📂 Importação cancelada.");
    setDescription("A importação foi cancelada.");
  }

  async function importing(fileType, fileName, fileBuffer) {
    let parsedData = [];
    const timeStart = Date.now();

    switch (fileType) {
      case "application/json":
        setTitle("📄 Lendo JSON...");
        setDescription("Identificando o arquivo JSON, aguarde...");
        parsedData = JSON.parse(fileBuffer);
        break;

      case "text/csv":
        setTitle("📄 Lendo CSV...");
        setDescription("Identificando o arquivo CSV, aguarde...");
        parsedData = Papa.parse(Buffer.from(fileBuffer, "base64").toString(), {
          header: true,
        }).data;
        break;

      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-excel":
        setTitle("📄 Lendo XLSX...");
        setDescription("Identificando o arquivo XLSX, aguarde...");
        // const workbook = XLSX.read(fileBuffer, { type: "base64" });
        // const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // // parsedData = XLSX.utils.sheet_to_json(sheet);
        // parsedData = XLSX.utils.sheet_to_json(sheet, { header: 0 });
        parsedData = parseExcel(fileBuffer);
        break;

      default:
        setTitle("📄 Arquivo não reconhecido");
        setDescription("Formato do arquivo inválido. Selecione um válido.");
        return;
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

    const timeElapsed = Date.now() - timeStart;
    console.log(
      `⏱️ Tempo de processamento: ${(timeElapsed / 1000 / 60).toFixed(3)}min`
    );
  }

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
      importCancel();
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

    const fileSizeInBytes = (fileBuffer.length * 3) / 4;
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024).toFixed(2);

    setTitle("📄 Importando arquivo...");
    setDescription(
      "O arquivo está sendo importado. \nPor Favor Aguarde ! Não  feche o aplicativo."
    );

    await importing(fileType, fileName, fileBuffer);
  } catch (error) {
    setLoading(false);
    setProcessing(false);
    setTitle("❌ Erro ao importar arquivo!");
    setDescription("Ocorreu um erro ao importar o arquivo. Tente novamente.");
    console.error("❌ Erro ao importar arquivo:", error);
  }
};

export default importFileSpreadSheets;

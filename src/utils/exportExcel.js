import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as XLSX from "xlsx";

export const exportExcel = async (data) => {
  try {
    // Criar a planilha
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "EstoqueFácil");

    // Converter para um arquivo binário
    const excelBinary = XLSX.write(workbook, { type: "base64", bookType: "xlsx" });

    // Definir o caminho do arquivo
    const fileUri = `${FileSystem.documentDirectory}planilha.xlsx`;

    // Salvar o arquivo
    await FileSystem.writeAsStringAsync(fileUri, excelBinary, {
      encoding: FileSystem.EncodingType.Base64,
    });

    return fileUri;
  } catch (error) {
    console.error("Erro ao gerar a planilha:", error);
  }
};

export const downloadExcel = async (data, uuid_inventory) => {
  const fileUri = await exportExcel(data);
  if (fileUri) {
    alert("Arquivo salvo em: " + fileUri);
    callbackSuccess(uuid_inventory);
  }
};

export const shareExcel = async (data, uuid_inventory) => {
  const fileUri = await exportExcel(data);
  if (fileUri) {
    await Sharing.shareAsync(fileUri);
    callbackSuccess(uuid_inventory);
  }
};

function callbackSuccess(uuid_inventory) {
  let date_end = new Date();
  Controller.Inventory.update(uuid_inventory, "done", date_end).then(
    (response) => {
      navigation.navigate("Home");
    }
  );
}


import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import Papa from 'papaparse';
import { Buffer } from 'buffer';
import { Alert } from 'react-native';

/**
 * Função para importar arquivos Excel, CSV ou JSON
 */
const importFile = async (setData) => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: [
        'application/json',
        'text/csv',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel', // Para arquivos .xls antigos
      ],
    });

    if (result.canceled) return;

    const fileUri = result.assets[0].uri;
    const fileType = result.assets[0].mimeType;

    console.log(`📂 Arquivo selecionado: ${fileUri} (${fileType})`);

    // Nome do arquivo
    const fileName = fileUri.split('/').pop();
    console.log(`📂 Nome do arquivo: ${fileName}`)
    
    const fileExtension = fileName.split('.').pop();
    console.log(`📂 Extensão do arquivo: ${fileExtension}`)

    const Tamanho = result.assets[0].size;
    console.log(`📂 Tamanho do arquivo: ${Tamanho/1024}`)

    // Lendo o arquivo
    const response = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64, // Ler como base64
    });

    let parsedData = [];

    if (fileType === 'application/json') {
      parsedData = JSON.parse(response);
    } else if (fileType === 'text/csv') {
      parsedData = Papa.parse(response, { header: true }).data;
    } else if (
      fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      fileType === 'application/vnd.ms-excel'
    ) {
      // Converter Base64 para Buffer
      const workbook = XLSX.read(Buffer.from(response, 'base64'), { type: 'buffer' });

      // Pegar a primeira planilha
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Converter planilha para JSON
      parsedData = XLSX.utils.sheet_to_json(sheet);
    }

    Alert.alert('Sucesso', 'Arquivo importado com sucesso!');
    console.log('✅ Arquivo importado:');
    console.log(parsedData.length > 0 ? parsedData.length : 'Nenhum dado encontrado');
    // console.log(parsedData);
    setData(parsedData);

    planilhas = parsedData;

  } catch (error) {
    console.error('❌ Erro ao importar arquivo:', error);
  }
};


export default importFile;

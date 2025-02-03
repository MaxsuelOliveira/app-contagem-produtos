import Realm from "realm";
import { realmConfig } from "./conn.js";

const createRealm = async () => {
  const realm = await Realm.open(realmConfig);
  return realm;
};

const addSpreadSheet = async (spreadsheet) => {
  const realm = await createRealm();
  realm.write(() => {
    realm.create("SpreadSheets", spreadsheet);
  });
  return spreadsheet;
};

const removeSpreadSheet = async (id_spreadsheet) => {
  const realm = await createRealm();

  try {
    realm.write(() => {
      // Encontrar a spreadsheet pelo id_spreadsheet
      const spreadsheetToDelete = realm
        .objects("SpreadSheets")
        .filtered(`id_spreadsheet == "${id_spreadsheet}"`)[0];

      if (spreadsheetToDelete) {
        realm.delete(spreadsheetToDelete);
        console.log("SpreadSheets removida com sucesso!");
      } else {
        console.log("SpreadSheets não encontrada.");
      }
    });
  } catch (error) {
    console.error("Erro ao remover a spreadsheet:", error);
  }
};

const getAllSpreadSheets = async () => {
  const realm = await createRealm();
  const spreadsheets = realm.objects("SpreadSheets");
  return spreadsheets;
};

const getSpreadSheet = async (id_spreadsheet) => {
  const realm = await createRealm();
  const spreadsheet = realm
    .objects("SpreadSheets")
    .filtered(`id_spreadsheet == "${id_spreadsheet}"`);
  return spreadsheet;
};

export {
  addSpreadSheet,
  removeSpreadSheet,
  getAllSpreadSheets,
  getSpreadSheet,
};

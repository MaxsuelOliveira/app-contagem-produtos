import {
  addSpreadSheet,
  removeSpreadSheet,
  getSpreadSheet,
  getAllSpreadSheets,
} from "./spreadsheets.js";

function add() {
  const uuid = "01012";

  const spreadsheet = {
    date_created: "2025-01-31T18:54:06.464Z",
    id_spreadsheet: uuid,
    nome_spreadsheet: "SpreadSheets Exemplo",
    produtos: [
      {
        id: "1",
        nome: "leite",
        preco: 4.5,
        codigo_de_barras: "2",
      },
      {
        id: "2",
        nome: "Café",
        preco: 12.5,
        codigo_de_barras: "1",
      },
    ],
  };

  addSpreadSheet(spreadsheet).then((spreadsheet) =>
    console.log("Planilha adicionada com sucesso!")
  );
}

function remove() {
  removeSpreadSheet("4fb744c8-cf7d-45e1-9b47-d34e1f2c9fd0").then(() =>
    console.log("Planilha removida com sucesso!")
  );
}

function get() {
  // Buscando uma spreadsheet pelo id
  getSpreadSheet("4fb744c8-cf7d-45e1-9b47-d34e1f2c9fd0").then((spreadsheet) =>
    console.log(spreadsheet)
  );
}

async function getAll() {
  const spreadsheets = await getAllSpreadSheets();

  if (spreadsheets) {
    spreadsheets.map((spreadsheet) => {
      console.log("SpreadSheets: ", spreadsheet.nome_spreadsheet);
      spreadsheet.produtos.map((produto) => {
        console.log("Código de barras: ", produto.codigo_de_barras);
        console.log("Nome: ", produto.nome);
        console.log("Preço R$: ", produto.preco);
      });
    });
  }
}

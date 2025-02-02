export const SpreadsheetsProductsScheme = {
  name: "Produto",
  properties: {
    id: "string",
    nome: "string",
    preco: "double",
    codigo_de_barras: "string",
  },
};

export const SpreadsheetSchema = {
  name: "SpreadSheets",
  properties: {
    date_created: "string",
    id_planilha: "string",
    nome_planilha: "string",
    produtos: "Produto[]", // Usando o ProdutoSchema para o campo produtos
  },
};

export const InventorySchema = {
  name: "Inventory",
  properties: {
    uuid: "string",
    scope: "string",
    slug: "string",
    status: "string?",
    data_termino: "date?",
    data_timer_termino: "date?",
    produtos: "Itens[]",
  },
};

export const InventoryItemsSchema = {
  name: "Itens",
  properties: {
    uuid: "string",
    codigo_de_barras: "string",
    quantidade: "int",
    preco: "double",
    incosistencia: "bool",
  },
};

export const realmConfig = {
  path: "appRealm", // Caminho do banco de dados
  schema: [
    SpreadsheetsProductsScheme,
    SpreadsheetSchema,
    InventorySchema,
    InventoryItemsSchema,
  ],
};

// Função para apagar o banco de dados
const deleteRealmDB = async () => {
  const path = "appRealm"; // Caminho do seu banco de dados

  try {
    // Apaga o arquivo de banco de dados
    unlink(path, (err) => {
      if (err) {
        console.log("Erro ao apagar o banco de dados:", err);
        return;
      }
      console.log("Banco de dados apagado com sucesso!");
    });
  } catch (error) {
    console.log("Erro ao tentar apagar o banco de dados:", error);
  }
};

// Função para recriar o banco de dados
const recreateRealmDB = async () => {
  // Apagar o banco de dados
  await deleteRealmDB();

  // Criar o banco de dados novamente
  await createRealm();
  console.log("Banco de dados recriado com sucesso!");
};

// await recreateRealmDB();
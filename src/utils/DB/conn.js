import Realm from "realm";

export const SpreadsheetsProductsScheme = {
  name: "Produto",
  properties: {
    id: "string",
    codebar: "string",
    name: "string",
    price: "double",
  },
};

export const SpreadsheetSchema = {
  name: "SpreadSheets",
  properties: {
    uuid: "string",
    date_create: "string",
    name: "string",
    products: "Produto[]", // Usando o ProdutoSchema para o campo products
  },
};

export const InventorySchema = {
  name: "Inventory",
  properties: {
    uuid: "string",
    name: "string",
    describe: "string",
    status: "string?",
    date_create: "date?",
    date_end: "date?",
    products: "Itens[]",
    compare_in_spreadsheet: "bool",
    compare_price: "bool",
  },
};

export const InventoryItemsSchema = {
  name: "Itens",
  properties: {
    uuid: "string",
    codebar: "string",
    quantity: "int",
    price: "double",
    inconsistency: "bool",
  },
};

export const realmConfig = {
  path: Realm.defaultPath, // Caminho do banco de dados padrão do Realm
  schema: [
    SpreadsheetsProductsScheme,
    SpreadsheetSchema,
    InventorySchema,
    InventoryItemsSchema,
  ],
  schemaVersion: 5, // Atualize a versão para 5
  migration: (oldRealm, newRealm) => {
    console.log("⚠️ Migração detectada.");

    // Verificar se a versão do banco de dados é anterior à versão atual
    if (oldRealm.schemaVersion < 5) {
      // Corrigido para 5
      const oldObjects = oldRealm.objects("Inventory");

      // Migrar os objetos existentes (se necessário)
      // newRealm.deleteAll(); // Não exclua todos os objetos. Comente se for necessário preservar dados antigos

      // Se você deseja preservar os dados anteriores ao invés de resetar
      oldObjects.forEach((oldInventory) => {
        newRealm.create("Inventory", {
          uuid: oldInventory.uuid,
          name: oldInventory.nome || "", // Correção: Use 'nome'
          describe: oldInventory.descricao || "", // Correção: Use 'descricao'
          status: oldInventory.status || "", // Valor default
          date_created: oldInventory.date_created || new Date(), // Correção para 'date_created'
          data_end: oldInventory.data_termino || null, // Correção para 'data_termino'
          products: oldInventory.products || [], // Correção para 'produtos'
          compare_in_spreadsheet:  oldInventory.verificar_produto_planilha || false, // Correção para 'verificar_produto_planilha'
          compare_price: oldInventory.verificar_preco || false, // Correção para 'verificar_preco'
        });
      });

      console.log("✅ Migração concluída.");
    }
  },
};

export const createRealm = async () => {
  try {
    return await Realm.open(realmConfig);
  } catch (error) {
    console.error("❌ Erro ao abrir o Realm:", error);
  }
};

export const deleteRealmDB = async () => {
  try {
    const realm = await createRealm();
    realm.close(); // Fecha conexões abertas
    Realm.deleteFile({ path: realmConfig.path });
    console.log("📌 Banco de dados apagado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao apagar o banco de dados:", error);
  }
};

export const recreateRealmDB = async () => {
  await deleteRealmDB(); // Apagar o banco de dados
  await createRealm(); // Criar o banco de dados novamente
  console.log("✅ Banco de dados recriado com sucesso!");
};

// (async () => {
//   await recreateRealmDB();
// })();

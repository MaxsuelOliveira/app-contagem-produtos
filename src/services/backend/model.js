import Realm from "realm";
import { realmConfig } from "./conn.js";

const createRealm = async () => {
  const realm = await Realm.open(realmConfig);
  return realm;
};

export const Model = {
  Inventory: {
    create: async (inventory) => {
      const realm = await createRealm();
      realm.write(() => {
        realm.create("Inventory", inventory);
      });
      return inventory;
    },

    remover: async (uuid) => {
      const realm = await createRealm();

      realm.write(() => {
        // Buscar o primeiro item correspondente ao UUID
        const inventoryItem = realm
          .objects("Inventory")
          .filtered("uuid == $0", uuid)[0];

        if (inventoryItem) {
          realm.delete(inventoryItem);
        }
      });
    },

    update: async (uuid, status, date_end) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid}"`);
      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid} não encontrado`,
          success: false,
        };
      }
      const inventory = inventories[0];
      realm.write(() => {
        inventory.status = status;
        inventory.date_end = date_end;
      });
      return inventory;
    },

    updateCompareInSpreadSheets: async (uuid, compare_in_spreadsheet) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid}"`);
      if (inventories.length === 0) {
        return Promise.reject(false);
      }
      const inventory = inventories[0];
      realm.write(() => {
        inventory.compare_in_spreadsheet = compare_in_spreadsheet;
      });
      return inventory;
    },

    export: async (uuid) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid}"`);
      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid} não encontrado`,
          success: false,
        };
      }
      const inventory = inventories[0];
      return inventory.products.map((produto) => ({
        "Código de barras": produto.codebar,
        Quantidade: produto.quantity,
        Preço: produto.price,
        Iconsistência: produto.inconsistency,
      }));
    },

    getAll: async () => {
      const realm = await createRealm();
      const inventories = realm.objects("Inventory");

      // Ordenar os inventários pela data de criação
      inventories.sorted("date_create", true); // 'true' para ordem decrescente

      return inventories;
    },

    getStatus: async (status) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`status == "${status}"`);
      return inventories;
    },

    getUUID: async (uuid) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid}"`);
      return inventories;
    },

    getProducts: async (uuid) => {
      const realm = await createRealm();

      let inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid}"`);

      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid} não encontrado`,
          success: false,
        };
      }

      const inventory = inventories[0];

      // Ordena os produtos pela propriedade 'codebar'
      const sortedProducts = inventory.products.sorted("codebar", false); // true para ordem decrescente
      return sortedProducts;
    },
  },

  Product: {
    create: async (uuid_inventory, product) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid_inventory}"`);

      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid_inventory} não encontrado`,
          success: false,
        };
      }

      const inventory = inventories[0];

      realm.write(() => {
        if (!inventory.products) {
          inventory.products = [];
        }
        // Verifica se o produto já existe pelo 'id' ou outra chave única
        const productExists = inventory.products.some(
          (existingProduct) => existingProduct.uuid === product.uuid
        );

        if (!productExists) {
          inventory.products.push(product);
          return;
        }
      });

      return inventory;
    },

    update: async (uuid_inventory, product) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid_inventory}"`);

      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid_inventory} não encontrado`,
          success: false,
        };
      }

      const inventory = inventories[0];

      realm.write(() => {
        // Verifica se o produto já existe no inventário pelo uuid
        const existingProduct = inventory.products.find(
          (p) => p.uuid === product.uuid
        );

        if (existingProduct) {
          // Se o produto já existe, atualiza os dados do produto
          Object.assign(existingProduct, product); // Atualiza todas as propriedades com os dados do novo produt
          return product;
        } else {
          return new Error(
            `Produto com uuid ${product.uuid} não encontrado no inventário`
          );
        }
      });

      return product;
    },

    delete: async (uuid_inventory, uuid_product) => {
      const realm = await createRealm();
      const inventories = realm
        .objects("Inventory")
        .filtered(`uuid == "${uuid_inventory}"`);
      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid_inventory} não encontrado`,
          success: false,
        };
      }
      const inventory = inventories[0];
      realm.write(() => {
        inventory.products = inventory.products.filter(
          (produto) => produto.uuid !== uuid_product
        );
      });

      return inventory;
    },

    deleteProducts: async (uuid_inventory, products) => {
      const realm = await createRealm();
      const inventories = realm.objects("Inventory").filtered(`uuid == "${uuid_inventory}"`);
      if (inventories.length === 0) {
        return {
          error: `Inventário com uuid ${uuid_inventory} não encontrado`,
          success: false,
        };
      }
      const inventory = inventories[0];
      realm.write(() => {
        products.forEach((product) => {
          inventory.products = inventory.products.filter(
            (produto) => produto.uuid !== product.uuid
          );
        });
      });

      console.log(inventory);

      return inventory;
    },

  },

  SpreadSheets: {
    create: async (spreadsheet) => {
      const realm = await createRealm();
      realm.write(() => {
        realm.create("SpreadSheets", spreadsheet);
      });
      return spreadsheet;
    },

    remove: async (id_spreadsheet) => {
      const realm = await createRealm();

      realm.write(() => {
        // Encontrar a spreadsheet pelo id_spreadsheet
        const spreadsheetToDelete = realm
          .objects("SpreadSheets")
          .filtered(`uuid == "${id_spreadsheet}"`)[0];

        if (spreadsheetToDelete) {
          realm.delete(spreadsheetToDelete);
          return true;
        } else {
          return false;
        }
      });
    },

    getAll: async () => {
      const realm = await createRealm();
      const spreadsheets = realm.objects("SpreadSheets");
      return spreadsheets;
    },

    get: async (id_spreadsheet) => {
      const realm = await createRealm();
      const spreadsheet = realm
        .objects("SpreadSheets")
        .filtered(`id_spreadsheet == "${id_spreadsheet}"`);
      return spreadsheet;
    },

    count: async () => {
      const realm = await createRealm();
      const spreadsheets = realm.objects("SpreadSheets");
      return spreadsheets.length;
    },
  },
};

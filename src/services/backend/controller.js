import { Model } from "./model.js";

export const Controller = {
  Inventory: {
    create: async (data) => {
      return Model.Inventory.create(data)
        .then((inventario) => {
          return inventario;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    remover: async (uuid) => {
      return Model.Inventory.remover(uuid)
        .then((inventory) => {
          return Promise.resolve(inventory);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    getAll: async () => {
      return Model.Inventory.getAll()
        .then((inventarios) => {
          return inventarios;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    getStatus: async (status) => {
      return Model.Inventory.getStatus(status)
        .then((inventarios) => {
          return inventarios;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    getUUID: async (uuid) => {
      return Model.Inventory.getUUID(uuid)
        .then((inventarios) => {
          return inventarios;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    getProducts: async (uuid) => {
      return Model.Inventory.getProducts(uuid)
        .then((produtos) => {
          return produtos;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    update: async (uuid, status, date_end) => {
      return Model.Inventory.update(uuid, status, date_end)
        .then((inventario) => {
          console.log("Inventário atualizado com sucesso!");
          return inventario[0];
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    export: async (uuid_inventory) => {
      return Model.Inventory.export(uuid_inventory)
        .then((produtosExportados) => {
          return produtosExportados;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },

  Product: {
    create: async (uuid_inventory, product) => {
      return Model.Product.create(uuid_inventory, product)
        .then((product) => {
          return product;
        })
        .catch((error) => {
          console.error("Erro ao adicionar produto no inventário:", error);
          return Promise.reject(error);
        });
    },

    update: async (uuid_inventory, product) => {
      return Model.Product.update(uuid_inventory, product)
        .then((product) => {
          return product;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    delete: async (uuid_inventory, uuid_product) => {
      return Model.Product.delete(uuid_inventory, uuid_product)
        .then((inventario) => {
          return inventario;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },

  SpreadSheets: {
    create: async (spreadsheet) => {
      return Model.SpreadSheets.create(spreadsheet)
        .then((spreadsheet) => {
          return Promise.resolve(spreadsheet);
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    remove: async (id_spreadsheet) => {
      return Model.SpreadSheets.remove(id_spreadsheet)
        .then(() => {
          return;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    getAll: async () => {
      return Model.SpreadSheets.getAll()
        .then((spreadsheets) => {
          return spreadsheets;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    get: async (id_spreadsheet) => {
      return Model.SpreadSheets.get(id_spreadsheet)
        .then((spreadsheet) => {
          return spreadsheet;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    count: async () => {
      return Model.SpreadSheets.count()
        .then((count) => {
          return count;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },
  },
};

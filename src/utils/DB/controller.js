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
          console.log("Produtos do inventário: ", produtos);
          return produtos;
        })
        .catch((error) => {
          return Promise.reject(error);
        });
    },

    update: async (uuid, status, date_end) => {},

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

    remover: async (uuid_inventory, uuid_product) => {
      return Model.Product.remover(uuid_inventory, uuid_product)
        .then(() => {
          return true;
        })
        .then((error) => {
          return Promise.reject(error);
        });
    },
  },
};

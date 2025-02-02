import Realm from "realm";
import { realmConfig } from "./config.js";

const createRealm = async () => {
  const realm = await Realm.open(realmConfig);
  return realm;
};

const addInventory = async (inventory) => {
  const realm = await createRealm();
  realm.write(() => {
    realm.create("Inventory", inventory);
  });
  console.log("Inventário adicionado com sucesso!");
};

const getAllInventories = async () => {
  const realm = await createRealm();
  const inventories = realm.objects("Inventory");
  return inventories;
};

const addProduct = async (uuid_inventory, produto) => {
  const realm = await createRealm();
  const inventories = realm
    .objects("Inventory")
    .filtered(`uuid == "${uuid_inventory}"`);
  if (inventories.length === 0) {
    throw new Error(`Inventário com uuid ${uuid_inventory} não encontrado`);
  }
  const inventory = inventories[0];
  realm.write(() => {
    if (!inventory.produtos) {
      inventory.produtos = [];
    }
    inventory.produtos.push(produto);
  });
  console.log("Product adicionado ao inventário!");
};

const updateProduct = async (uuid_inventory, produto) => {
  const realm = await createRealm();
  const inventories = realm
    .objects("Inventory")
    .filtered(`uuid == "${uuid_inventory}"`);
  if (inventories.length === 0) {
    throw new Error(`Inventário com uuid ${uuid_inventory} não encontrado`);
  }
  const inventory = inventories[0];
  realm.write(() => {
    inventory.produtos = inventory.produtos.map((p) => {
      if (p.uuid === produto.uuid) {
        return produto;
      }
      return p;
    });
  });
  console.log("Produto atualizado no inventário!");
};  

const removerProduct = async (uuid_inventory, uuid_product) => {
  const realm = await createRealm();
  const inventories = realm
    .objects("Inventory")
    .filtered(`uuid == "${uuid_inventory}"`);
  if (inventories.length === 0) {
    throw new Error(`Inventário com uuid ${uuid_inventory} não encontrado`);
  }
  const inventory = inventories[0];
  realm.write(() => {
    inventory.produtos = inventory.produtos.filter(
      (produto) => produto.uuid !== uuid_product
    );
  });
  console.log("Product removido do inventário!");
};

const updateStatus = async (uuid, status, date_end) => {
  const realm = await createRealm();
  const inventories = realm.objects("Inventory").filtered(`uuid == "${uuid}"`);
  if (inventories.length === 0) {
    throw new Error(`Inventário com uuid ${uuid} não encontrado`);
  }
  const inventory = inventories[0];
  realm.write(() => {
    inventory.status = status;
    inventory.date_end = date_end;
    inventory.date_timer_end = date_end;
  });
  console.log("Status do inventário atualizado!");
};

const exportProducts = async (uuid_inventory) => {
  const realm = await createRealm();
  const inventories = realm
    .objects("Inventory")
    .filtered(`uuid == "${uuid_inventory}"`);
  if (inventories.length === 0) {
    throw new Error(`Inventário com uuid ${uuid_inventory} não encontrado`);
  }
  const inventory = inventories[0];
  return inventory.produtos.map((produto) => ({
    codigo_de_barras: produto.codigo_de_barras,
    quantidade: produto.quantidade,
    preco: produto.preco,
    incosistencia: produto.incosistencia,
  }));
};


export {
  addInventory,
  getAllInventories,
  addProduct,
  updateProduct,
  updateStatus,
  removerProduct,
  exportProducts,
};

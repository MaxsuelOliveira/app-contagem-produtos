import {
  addInventory,
  getAllInventories,
  addProduct,
  updateStatus,
  exportProducts,
} from "./inventories.js";

function create() {
  const inventory = {
    uuid: "1234-uuid-inventario",
    scope: "loja1",
    slug: "estoque123",
    status: "aberto",
    data_termino: new Date(),
    data_timer_termino: new Date(),
    produtos: [
      {
        uuid: "1234-uuid-produto",
        codigo_de_barras: "111222333",
        quantidade: 10,
        preco: 10.0,
        incosistencia: false,
      },
      {
        uuid: "5678-uuid-produto",
        codigo_de_barras: "444555666",
        quantidade: 20,
        preco: 20.0,
        incosistencia: false,
      },
    ],
  };

  addInventory(inventory).then((inventario) =>
    console.log("Inventário criado com sucesso!")
  );
}

function getAll() {
  getAllInventories().then((inventarios) => {
    console.log(inventarios);
  });
}

function addProductForInventory() {
  const uuid_inventory = "1234-uuid-inventario";

  const product = {
    uuid: "9999-uuid-produto",
    codigo_de_barras: "777888999",
    quantidade: 30,
    preco: 30.0,
    incosistencia: false,
  };

  addProduct(uuid_inventory, product).then(() =>
    console.log("Produto adicionado ao inventário com sucesso!")
  );
}

// atualizar um produto no inventário
function updateProductForInventory() {
  const uuid_inventory = "1234-uuid-inventario";

  const nowProduct = {
    uuid: "9999-uuid-produto",
    codigo_de_barras: "777888999",
    quantidade: 40,
    preco: 40.0,
    incosistencia: false,
  };

  addProduct(uuid_inventory, nowProduct).then(() =>
    console.log("Produto atualizado no inventário com sucesso!")
  );
}

function removeProductForInventory() {
  const uuid_inventory = "1234-uuid-inventario";
  const uuid_product = "9999-uuid-produto";

  removeProduct(uuid_inventory, uuid_product).then(() =>
    console.log("Produto removido do inventário com sucesso!")
  );
}

function updateStatusInventory() {
  updateStatus("1234-uuid-inventario", "finalizado", new Date()).then(() =>
    console.log("Status do inventário atualizado!")
  );
}

function exportInvetory() {
  exportProducts("1234-uuid-inventario").then((produtosExportados) =>
    console.log("Produtos exportados:", produtosExportados)
  );
}

getAll();

export {
  create,
  getAll,
  addProductForInventory,
  updateProductForInventory,
  removeProductForInventory,
  updateStatusInventory,
  exportInvetory,
}
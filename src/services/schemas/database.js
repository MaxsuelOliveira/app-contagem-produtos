import Realm from "realm";
import { SCHEMAS } from "./Schemas";

const SCHEMA_VERSION = 12;
const VERSION = 12;

const realmConfig = {
  path: Realm.defaultPath,
  schema: SCHEMAS,
  schemaVersion: SCHEMA_VERSION,
  migration: (oldRealm, newRealm) => {
    console.log("⚠️ Migração detectada.");
    if (oldRealm.schemaVersion < VERSION) {
      migrateInventory(oldRealm, newRealm);
      console.log("✅ Migração concluída.");
    }
  },
};

const migrateInventory = (oldRealm, newRealm) => {
  const oldObjects = oldRealm.objects("Inventory");

  oldObjects.forEach((oldInventory) => {
    newRealm.create("Inventory", {
      uuid: oldInventory.uuid,
      name: oldInventory.nome || "",
      describe: oldInventory.descricao || "",
      status: oldInventory.status || "",
      date_create: oldInventory.date_create || new Date(),
      date_end: oldInventory.data_termino || null,
      products: oldInventory.products || [],
      properties: oldInventory.properties || {},
    });

    oldInventory.products.forEach((oldProduct) => {
      newRealm.create("Itens", {
        uuid: oldProduct.uuid,
        codebar: oldProduct.codebar,
        quantity: oldProduct.quantity,
        name: oldProduct.name,
        price: oldProduct.price,
        inconsistency: oldProduct.inconsistency || false,
        date_create: oldProduct.date_create || new Date(),
      });
    });
  });
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
    realm.close();
    Realm.deleteFile({ path: realmConfig.path });
    console.log("📌 Banco de dados apagado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao apagar o banco de dados:", error);
  }
};

export const recreateRealmDB = async () => {
  await deleteRealmDB();
  await createRealm();
  console.log("✅ Banco de dados recriado com sucesso!");
};

(function () {
  if (VERSION !== SCHEMA_VERSION) {
    console.log("⚠️ Banco de dados está com versão diferente!");
    recreateRealmDB().then(() => {
      console.log("✅ Banco de dados recriado com sucesso!");
    }).catch((error) => {
      console.error("❌ Erro ao recriar o banco de dados:", error);
    });
  }
})();

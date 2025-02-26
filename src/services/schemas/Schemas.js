export const SpreadsheetsProductsSchema = {
  name: "Produto",
  properties: {
    codebar: "string",
    name: "string",
    price: "double",
  },
};

export const SpreadsheetSchema = {
  name: "SpreadSheets",
  properties: {
    uuid: "string",
    date_create: "date?",
    name: "string",
    products: "Produto[]",
  },
};

export const SpreadsheetsOptionsSchema = {
  name: "OptionsSpreadSheets",
  properties: {
    compare_in_spreadsheet: "bool",
    compare_price: "bool",
    compare_quantity: "bool",
    quantity_default: "int?",
    inputs_habilitated: "bool",
  },
};

export const InventoryItemsSchema = {
  name: "Itens",
  properties: {
    uuid: "string",
    codebar: "string",
    quantity: "int",
    name: "string",
    price: "double",
    inconsistency: "bool",
    date_create: "date?",
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
    properties: "OptionsSpreadSheets",
  },
};

export const SCHEMAS = [
  SpreadsheetsProductsSchema,
  SpreadsheetSchema,
  SpreadsheetsOptionsSchema,
  InventorySchema,
  InventoryItemsSchema,
];
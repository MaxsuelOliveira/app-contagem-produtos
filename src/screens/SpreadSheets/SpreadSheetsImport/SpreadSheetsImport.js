import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

import importFile from "../../../utils/importFile";

// import {Controller} from "../../utils/DB/controller";
// console.log(Controller.s());

const SpreadSheetsImport = () => {
  const [planilhas, setPlanilhas] = useState([]);
  useEffect(() => {
    console.log("Carregando planilhas ...");

    setPlanilhas([
      {
        uuid: "1",
        title: "Planilha 1",
        describe: "Planilha de produtos",
        products: [
          { codebar: "123456789", quantity: 0, name: "Produto 1", price: 120 },
          { codebar: "987654321", quantity: 0, name: "Produto 2", price: 200 },
        ],
        data_create: "2021-09-01 00:00:00",
      },
      {
        uuid: "2",
        title: "Planilha 2",
        describe: "Planilha de produtos",
        products: [
          { codebar: "123456789", quantity: 0, name: "Produto 3", price: 150 },
          { codebar: "987654321", quantity: 0, name: "Produto 4", price: 250 },
        ],
        data_create: "2021-09-01 00:00:00",
      },
      {
        uuid: "3",
        title: "Planilha 3",
        describe: "Planilha de produtos",
        products: [
          { codebar: "123456789", quantity: 0, name: "Produto 1", price: 120 },
          { codebar: "987654321", quantity: 0, name: "Produto 2", price: 200 },
        ],
        data_create: "2021-09-01 00:00:00",
      },
      {
        uuid: "4",
        title: "Planilha 4",
        describe: "Planilha de produtos",
        products: [
          { codebar: "123456789", quantity: 0, name: "Produto 1", price: 120 },
          { codebar: "987654321", quantity: 0, name: "Produto 2", price: 200 },
        ],
        data_create: "2021-09-01 00:00:00",
      },
      {
        uuid: "5",
        title: "Planilha 5",
        describe: "Planilha de produtos",
        products: [
          { codebar: "123456789", quantity: 0, name: "Produto 1", price: 120 },
          { codebar: "987654321", quantity: 0, name: "Produto 2", price: 200 },
        ],
        data_create: "2021-09-01 00:00:00",
      },
    ]);
  }, []);

  const [data, setData] = useState([]);

  return (
    <View style={{ ...GlobalStyles.container, padding: 20 }}>
      <StatusBar style="auto" backgroundColor={colors.cardBackground} />

      <View style={{ ...GlobalStyles.cardHeader, marginBottom: 20 }}>
        <Text style={GlobalStyles.cardTitle}>
          Importar planilhas de produtos
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text>Selecione a planilha que deseja importar para o sistema.</Text>
        <Text>Exemplo de planilha:</Text>
        <Text>Código de barras: 123456789</Text>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        {data.length > 0 ? (
          // data.map((item, index) => (
          //   <View key={index} style={{ padding: 10, borderBottomWidth: 1 }}>
          //     <Text style={styles.label}>
          //       Código de barras: {item.codebar}
          //     </Text>
          //     <Text style={styles.label}>Quantidade: {item.quantity}</Text>
          //     <Text style={styles.label}>Nome: {item.name}</Text>
          //     <Text style={styles.label}>Preço: {item.price}</Text>
          //   </View>
          // ))

          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={GlobalStyles.label}>
              Código de barras: {data[0].TMER_CODIGO_BARRAS_UKN}
            </Text>
            <Text style={GlobalStyles.label}>
              Quantidade: {data[0].quantity}
            </Text>
            <Text style={GlobalStyles.label}>Nome: {data[0].TMER_NOME}</Text>
            <Text style={GlobalStyles.label}>Preço: {data[0].price}</Text>
          </View>
        ) : (
          <Text>
            {data.length === 0 ? "Nenhum dado encontrado" : "Carregando ..."}
          </Text>
        )}
      </ScrollView>

      <View>
        <TouchableOpacity
          style={styles.import}
          onPress={() => importFile(setData)}
        >
          <AntDesign
            name="plus"
            size={30}
            color={{ ...colors.primaryBackground }}
          />
          <Text style={{ ...GlobalStyles.label, color: colors.textPrimary }}>
            Clique e selecione a planilha que deseja importar.
          </Text>
          <Text
            style={{ ...GlobalStyles.small, color: colors.textDescription }}
          >
            Formatos aceitos: .xls, .xlsx, .csv
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpreadSheetsImport;

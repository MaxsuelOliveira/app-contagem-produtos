import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalStyles, lightTheme } from "../../styles/GlobalStyles";
import CardSpreadSheets from "../SpreadSheets/CardSpreadSheets/CardSpreadSheets";
import ModalSpreadSheetsImport from "./Modal/SpreadSheetsImport";

import importFile from "./importFile";

import {getAllSpreadSheets} from "../../../DB/spreadsheets";


console.log(getAllSpreadSheets());

const SpreadSheets = () => {
  const [planilhas, setPlanilhas] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);

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
    ]);
  }, []);

  const [data, setData] = useState([]);

  return (
    // <View style={GlobalStyles.container}>
    //   <StatusBar style="dark" />

    //   <View style={GlobalStyles.cardHeader}>
    //     <Text style={GlobalStyles.cardTitle}>PLanilhas</Text>
    //   </View>

    //   <View>
    //     <Text style={GlobalStyles.cardTitle}>Suas Planilhas</Text>
    //     <ScrollView style={{ padding: 10, paddingTop: 0 }}>
    //       {planilhas.map((planilha) => (
    //         <CardSpreadSheets
    //           key={planilha.uuid} // Correção: Usando uuid como key
    //           uuid={planilha.uuid}
    //           title={planilha.title}
    //           describe={planilha.describe}
    //           products={planilha.products}
    //           data_create={planilha.data_create}
    //         />
    //       ))}
    //     </ScrollView>
    //   </View>

    //   <View>
    //     <Button title="Importar Arquivo" onPress={() => importFile(setData)} />

    //     <ScrollView style={{ marginTop: 20 }}>
    //       {data.length > 0 ? (
    //         // data.map((item, index) => (
    //         //   <View key={index} style={{ padding: 10, borderBottomWidth: 1 }}>
    //         //     <Text style={styles.label}>
    //         //       Código de barras: {item.codebar}
    //         //     </Text>
    //         //     <Text style={styles.label}>Quantidade: {item.quantity}</Text>
    //         //     <Text style={styles.label}>Nome: {item.name}</Text>
    //         //     <Text style={styles.label}>Preço: {item.price}</Text>
    //         //   </View>
    //         // ))

    //         <View style={{ padding: 10, borderBottomWidth: 1 }}>
    //           <Text style={styles.label}>
    //             Código de barras: {data[0].TMER_CODIGO_BARRAS_UKN}
    //           </Text>
    //           <Text style={styles.label}>Quantidade: {data[0].quantity}</Text>
    //           <Text style={styles.label}>Nome: {data[0].TMER_NOME}</Text>
    //           <Text style={styles.label}>Preço: {data[0].price}</Text>
    //         </View>

    //       ) : (
    //         <Text>
    //           {data.length === 0 ? "Nenhum dado encontrado" : "Carregando ..."}
    //         </Text>
    //       )}
    //     </ScrollView>
    //   </View>

    //   <View style={GlobalStyles.menubar}>
    //     <TouchableOpacity
    //       style={GlobalStyles.menubarItem}
    //       //   onPress={() => setModalImport(true)}
    //     >
    //       <AntDesign name="plus" size={26} color={lightTheme.colorIcons} />
    //       <Text style={GlobalStyles.menubarText}>Importar planilha</Text>
    //     </TouchableOpacity>
    //   </View>

    //   {/* <ModalSpreadSheetsImport
    //     visible={isModalVisible}
    //     onClose={() => setModalVisible(false)}
    //   /> */}
    // </View>

    <Text>
      teste
    </Text>

  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
  },

  settingsItem: {
    marginBottom: 30,
  },

  settingsBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  label: {
    fontSize: 20,
    // color: "white",
    fontWeight: "bold",
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Regular",
    marginBottom: 10,
  },
});

export default SpreadSheets;

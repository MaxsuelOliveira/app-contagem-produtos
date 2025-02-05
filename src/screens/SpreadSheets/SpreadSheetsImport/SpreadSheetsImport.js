import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Modal,
} from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";
import { styles } from "./styles";

// BACKEND
import importFileSpreadSheets from "../../../utils/importFileSpreadSheets";

const SpreadSheetsImport = () => {
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
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text style={GlobalStyles.label}>
              Código de barras: {data[0].TMER_CODIGO_BARRAS_UKN}
            </Text>
            <Text style={GlobalStyles.label}>
              Quantidade: {data[0].TMER_QUANTIDADE}
            </Text>
            <Text style={GlobalStyles.label}>Nome: {data[0].TMER_NOME}</Text>
            <Text style={GlobalStyles.label}>Preço: {data[0].TMER_PRECO}</Text>
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
          onPress={() => importFileSpreadSheets(setData)}
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

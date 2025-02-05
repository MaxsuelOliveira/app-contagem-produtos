import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StatusBar } from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";

// Components
import CardSpreadSheets from "./SpreadSheetsCard/SpreadSheetsCard";

// Backend
import { Controller } from "../../services/backend/controller";

const SpreadSheets = () => {
  const [planilhas, setPlanilhas] = useState([]);

  useEffect(() => {
    Controller.SpreadSheets.getAll().then((response) => {
      setPlanilhas(response);
    });
  }, []);

  return (
    <View style={{ ...GlobalStyles.container, padding: 20 }}>
      <StatusBar style="auto" backgroundColor={colors.cardBackground} />

      <View style={{ ...GlobalStyles.cardHeader, marginBottom: 20 }}>
        <Text style={GlobalStyles.cardTitle}>Planilhas importadas</Text>
      </View>

      <View style={{ flex: 1 }}>
        <ScrollView>
          {planilhas.length > 0 ? (
            planilhas.map((planilha) => (
              <CardSpreadSheets
                key={planilha.uuid}
                uuid={planilha.uuid}
                name={planilha.name}
                products={planilha.products.length}
                date_create={planilha.date_create}
              />
            ))
          ) : (
            <Text style={{...GlobalStyles.cardTitle , textAlign : "left" , fontSize : 16}}>
              😐 Nenhum planilha foi importada ! 
            </Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default SpreadSheets;

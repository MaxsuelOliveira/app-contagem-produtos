import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StatusBar , Modal } from "react-native";

// Icons
import { AntDesign } from "@expo/vector-icons";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Components
import CardSpreadSheets from "./SpreadSheetsCard/SpreadSheetsCard";

// Backend
import { Controller } from "@services/backend/controller";

const SpreadSheets = ({ isVisible, onClose }) => {
  const [planilhas, setPlanilhas] = useState([]);

  useEffect(() => {
    Controller.SpreadSheets.getAll().then((response) => {
      setPlanilhas(response);
    });
  }, []);

  return (
    <Modal
      visible={isVisible}
      animationType={false}
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={colors.modalCover} />

      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={styles.card}>
            <View style={{ ...GlobalStyles.cardHeader, marginBottom: 20 }}>
              <Text style={styles.cardTilte}>Planilhas importadas</Text>
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
                  <Text
                    style={{
                      ...GlobalStyles.cardTitle,
                      textAlign: "left",
                      fontSize: 16,
                    }}
                  >
                    😐 Nenhum planilha foi importada !
                  </Text>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SpreadSheets;

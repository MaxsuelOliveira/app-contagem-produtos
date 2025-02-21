import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Modal,
  TouchableOpacity,
} from "react-native";

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

          <View style={GlobalStyles.modalContainer}>

            <View style={GlobalStyles.card}>

              <View style={GlobalStyles.cardHeader}>
                <Text style={styles.cardTilte}>Planilhas</Text>
                <TouchableOpacity
                  onPress={onClose}
                  style={{ ...GlobalStyles.closeButton }}
                >
                  <AntDesign name="close" size={28} color={colors.colorIcons} />
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
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
                        fontFamily: "Montserrat_Medium",
                        fontSize: 18,
                      }}
                    >
                      Nenhum planilha importada !
                    </Text>
                  )}
                </ScrollView>
              </View>

            </View>

          </View>

        </View>

      </View>

    </Modal>
  );
};

export default SpreadSheets;

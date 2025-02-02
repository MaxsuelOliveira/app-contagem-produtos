import React, { useState, useRef, forwardRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useFonts } from "expo-font";

import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles, lightTheme } from "../../../styles/GlobalStyles";

const add = (params) => {
  const { inventoryName, invetoryFormat, invetoryLayout } = params;

  Alert.alert("Salvando produto ...", "");
  console.log("Nome do inventário: ", inventoryName);
  console.log("Formato da planilha : ", invetoryFormat);
  console.log("Layout da planilha para a exportação: ", invetoryLayout);
  // onClose();
};

const ModalInvetoryExport = ({ isVisible, onClose }) => {
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("../../../../assets/fonts/Montserrat-Regular.ttf"),
  });

  const [inventoryName, setInventoryName] = useState("");
  const [invetoryFormat, setInvetoryFormat] = useState("");
  const [invetoryLayout, setInvetoryLayout] = useState("");

  const selectedItem = {
    title: "Selecionar *",
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={lightTheme.modalCover} />

      {/* Fundo semi-transparente para modal */}
      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.card}>
            {/* Card Header */}
            <View style={GlobalStyles.cardHeader}>
              <Text style={GlobalStyles.cardTitle}>Exportar invetário</Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign
                  name="close"
                  size={28}
                  color={lightTheme.colorIcons}
                />
              </TouchableOpacity>
            </View>

            {/* Formulário */}
            <View style={styles.cardBody}>
              {/* Nome do arquivo */}
              <View style={{ ...styles.grid, width: "100%" }}>
                <View>
                  <Text style={GlobalStyles.label}>Nome do arquivo*</Text>
                  <TextInput
                    style={GlobalStyles.input}
                    placeholder=""
                    focusable={true}
                    maxLength={150}
                    value={inventoryName}
                    onChangeText={setInventoryName}
                    keyboardType="default"
                    placeholderTextColor="gray"
                  />
                </View>
              </View>

              {/* Tipo de arquivo */}
              <View style={{ ...styles.grid, width: "100%" }}>
                <Text style={GlobalStyles.label}>Tipo do arquivo*</Text>
                <RNPickerSelect
                  key={selectedItem.title}
                  onValueChange={(value) => setInvetoryFormat(value)}
                  items={[
                    { label: "Excel", value: "excel" },
                    // { label: "CSV", value: "csv" },
                    // { label: "JSON", value: "json" },
                  ]}
                  placeholder={{
                    label: "Tipos de arquivos disponíveis :",
                    value: null,
                  }}
                  pickerProps={{ accessibilityLabel: selectedItem.title }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputIOS: {
                      fontSize: 12, // Tamanho da fonte no Android
                      fontFamily: "Montserrat_Regular", // Fonte personalizada no Android
                      color: lightTheme.textDescription,
                    },
                    inputAndroid: {
                      fontSize: 12, // Tamanho da fonte no Android
                      fontFamily: "Montserrat_Regular", // Fonte personalizada no Android
                      color: lightTheme.textDescription,
                    },
                  }}
                >
                  <Text style={[GlobalStyles.input, styles.picker]}>
                    {invetoryFormat ? invetoryFormat : selectedItem.title}
                  </Text>
                  <AntDesign
                    name="down"
                    size={18}
                    color={lightTheme.colorIcons}
                    style={{ position: "absolute", right: 10, top: 15 }}
                  />
                </RNPickerSelect>
              </View>

              {/* Layout da planilha exportada */}
              <View style={{ ...styles.grid, width: "100%" }}>
                <Text style={GlobalStyles.label}>
                  Selecione um layout para o arquivo*
                </Text>

                <RNPickerSelect
                  key={selectedItem.title}
                  onValueChange={(value) => setInvetoryLayout(value)}
                  items={[
                    { label: "Todos os campos", value: "1" },
                    { label: "2 Campos (Cod|Qnt)", value: "2" },
                    { label: "3 Campos (Cod|Qnt|Nome)", value: "3" },
                    { label: "4 Campos (Cod|Qnt|Nome|Preco)", value: "4" },
                  ]}
                  placeholder={{
                    label: "Layouts disponíveis para o arquivo :",
                    value: null,
                  }}
                  pickerProps={{ accessibilityLabel: selectedItem.title }}
                  useNativeAndroidPickerStyle={false}
                  style={{
                    inputIOS: {
                      fontSize: 12, // Tamanho da fonte no Android
                      fontFamily: "Montserrat_Regular", // Fonte personalizada no Android
                      color: lightTheme.textDescription,
                    },
                    inputAndroid: {
                      fontSize: 12, // Tamanho da fonte no Android
                      fontFamily: "Montserrat_Regular", // Fonte personalizada no Android
                      color: lightTheme.textDescription,
                    },
                  }}
                >
                  <Text style={[GlobalStyles.input, styles.picker]}>
                    {invetoryLayout ? invetoryLayout : selectedItem.title}
                  </Text>
                  <AntDesign
                    name="down"
                    size={18}
                    color={lightTheme.colorIcons}
                    style={{ position: "absolute", right: 10, top: 15 }}
                  />
                </RNPickerSelect>
              </View>

              <TouchableOpacity
                style={{ ...GlobalStyles.button, marginTop: 20 }}
                onPress={() =>
                  add({
                    inventoryName,
                    invetoryFormat,
                    invetoryLayout,
                  })
                }
              >
                <Text style={GlobalStyles.buttonText}>
                  Adicionar ao inventário
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cardBody: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  grid: {
    display: "flex",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    // marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  picker: {
    width: "100%",
    fontFamily: "Montserrat_Regular",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 48,
    color: lightTheme.textDescription,
  },
});

export default ModalInvetoryExport;

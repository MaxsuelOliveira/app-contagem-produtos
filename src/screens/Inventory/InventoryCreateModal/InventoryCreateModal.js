import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

// Controller
import { Controller } from "../../../services/DB/controller";

const ModalInventoryCreate = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [focusInName, setFocusInName ] = useState(true);

  function createInventory() {

    if (name.length == 0 || name == "") {
      Alert.alert("O invetário precisa de um nome !");
      setFocusInName(true);
      return;
    }

    const inventory = {
      uuid: uuid.v4(),
      name: name,
      describe: description,
      status: "progress", // progress | done | unknown
      date_create: new Date(),
      date_end: new Date(),
      products: [],
      compare_in_spreadsheet: false,
      compare_price: false,
    };

    Controller.Inventory.create(inventory)
      .then((response) => {
        onClose();
      })
      .catch((error) => {
        console.error("Erro ao criar o inventário !");
        console.error(error);
      });
  }

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="auto" backgroundColor={colors.modalCover} />

      {/* Fundo semi-transparente para modal */}
      <View style={GlobalStyles.modalOverlay}>
        <View style={GlobalStyles.modalContent}>
          <View style={GlobalStyles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={{ ...GlobalStyles.cardTitle, marginTop: 0 }}>
                Novo inventário
              </Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
              </TouchableOpacity>
            </View>

            {/* Formulário */}
            <View style={GlobalStyles.cardBody}>
              <Text style={GlobalStyles.label}>Nome do inventário*</Text>
              <TextInput
                style={GlobalStyles.input}
                placeholder="Digite o nome"
                maxLength={150}
                value={name}
                autoFocus={focusInName}
                onChangeText={setName}
              />

              <Text style={GlobalStyles.label}>Descrição do inventário*</Text>
              <TextInput
                style={[GlobalStyles.input, GlobalStyles.textArea]}
                placeholder="Digite a descrição"
                maxLength={255}
                multiline
                value={description}
                onChangeText={setDescription}
              />

              <TouchableOpacity
                style={GlobalStyles.button}
                onPress={() => {
                  createInventory();
                }}
              >
                <Text style={GlobalStyles.buttonText}>Criar inventário</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalInventoryCreate;

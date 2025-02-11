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
import { styles } from "./styles";

// Controller
import { Controller } from "../../../services/backend/controller";

const ModalInventoryCreate = ({ isVisible, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [focusInName, setFocusInName] = useState(true);

  function successinCreating() {
    setLoading(true);
    setIsError(false);
    setError("");

    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  }

  function errorInCreating(message) {
    setLoading(false);
    setIsError(true);
    setError(message);
  }

  function createInventory() {
    if (name.length == 0 || name == "") {
      errorInCreating("Nome do inventário é obrigatório");
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
        successinCreating();
      })
      .catch((error) => {
        errorInCreating("HOuve um erro ao criar o inventário, tente novamente!");
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

      <View style={GlobalStyles.modalOverlay}>

        <View style={GlobalStyles.modalContent}>

          <View style={GlobalStyles.card}>
            <View style={GlobalStyles.cardHeader}>
              <Text style={styles.cardTitle}>Novo inventário</Text>
              <TouchableOpacity
                onPress={onClose}
                style={GlobalStyles.closeButton}
              >
                <AntDesign name="close" size={28} color={colors.colorIcons} />
              </TouchableOpacity>
            </View>

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
                style={styles.textarea}
                placeholder="Digite a descrição do inventário"
                maxLength={255}
                multiline
                value={description}
                onChangeText={setDescription}
              />

              {isError ? (
                <View style={{ marginBottom: 10 }}>
                  <Text style={GlobalStyles.label}>{error}</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={GlobalStyles.button}
                onPress={() => {
                  createInventory();
                }}
              >
                <Text style={GlobalStyles.buttonText}>
                  {loading ? "Criando ..." : "Criar inventário"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>

      </View>

    </Modal>
  );
};

export default ModalInventoryCreate;

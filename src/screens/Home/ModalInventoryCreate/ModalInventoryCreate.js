import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TextInput, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GlobalStyles, lightTheme } from "../../../styles/GlobalStyles";

const ModalInventoryCreate = ({ isVisible, onClose }) => {
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState("");

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
            <View style={GlobalStyles.cardHeader}>
              <Text style={GlobalStyles.cardTitle}>Novo inventário</Text>
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
            <View style={GlobalStyles.cardBody}>
              <Text style={GlobalStyles.label}>Nome do inventário*</Text>
              <TextInput
                style={GlobalStyles.input}
                placeholder="Digite o nome"
                maxLength={150}
                value={inventoryName}
                onChangeText={setInventoryName}
              />

              <Text style={GlobalStyles.label}>Descrição do inventário*</Text>
              <TextInput
                style={[GlobalStyles.input, GlobalStyles.textArea]}
                placeholder="Digite a descrição"
                maxLength={255}
                multiline
                value={inventoryDescription}
                onChangeText={setInventoryDescription}
              />

              <TouchableOpacity style={GlobalStyles.button}>
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

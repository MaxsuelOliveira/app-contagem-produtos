import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Modal, View, Text, TouchableOpacity } from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Screens
import InventorySettingsModal from "../InventorySettingsModal/InventorySettingsModal";
import InventoryExportModal from "../InventoryExportModal/InventoryExportModal";

const InventoryOptions = ({
  isVisible,
  onClose,
  uuidInventory,
  searchProduct,
}) => {
  const [modalSettings, setmodalSettings] = useState(false);
  const [modalExport, setmodalExport] = useState(false);

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
          <View style={GlobalStyles.modalContainer}>
            <View style={styles.modalOptionsCard}>
              <View style={styles.optionCardHeader}>
                <Text style={styles.optionTitle}>Opções</Text>
                <TouchableOpacity
                  style={GlobalStyles.btnHeader}
                  onPress={onClose}
                >
                  <AntDesign name="close" size={28} color={colors.colorIcons} />
                </TouchableOpacity>
              </View>

              <View style={styles.cardBody}>
                <OptionsTouchableOpacity
                  callback={() => setmodalSettings(true)}
                  title="Configurações do inventário"
                  icon="setting"
                />

                <OptionsTouchableOpacity
                  callback={() => setmodalExport(true)}
                  title="Exportar inventário"
                  icon="setting"
                />

                <OptionsTouchableOpacity
                  callback={() => {
                    searchProduct();
                    onClose();
                  }}
                  title="Consultar item"
                  icon="search1"
                />

                <OptionsTouchableOpacity
                  callback={() => setmodalExport(true)}
                  title="Apagar inventário"
                  icon="delete"
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <InventoryExportModal
        isVisible={modalExport}
        onClose={() => setmodalExport(false)}
        uuidInventory={uuidInventory}
      />

      <InventorySettingsModal
        isVisible={modalSettings}
        onClose={() => setmodalSettings(false)}
        uuidInventory={uuidInventory}
      />
    </Modal>
  );
};

function OptionsTouchableOpacity({ callback, title, icon }) {
  return (
    <TouchableOpacity
      onPress={() => callback()}
      style={styles.optionsButtonContent}
    >
      <Text style={{ ...GlobalStyles.value, fontSize: 16 }}>{title}</Text>
      <AntDesign name={icon} size={24} color={colors.colorIcons} />
    </TouchableOpacity>
  );
}

export default InventoryOptions;

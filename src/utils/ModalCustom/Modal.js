import React, { useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Ícones para melhorar a UI

import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";

const ALERT_TYPES = {
  error: { color: colors.danger, icon: "close-circle" },
  success: { color: colors.success, icon: "checkmark-circle" },
  warning: { color: "#FFA500", icon: "alert-circle" },
  default: { color: colors.primary, icon: "information-circle" },
};

function ModalCustom({ isVisible, onClose, dataModal }) {
  const { type = "default", title, text, confirmText, onConfirm } = dataModal;

  // Definir cor e ícone baseado no tipo de alerta
  const alertConfig = ALERT_TYPES[type] || ALERT_TYPES.default;

  // Animação de entrada para melhor UX
  const opacity = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      opacity.setValue(0);
    }
  }, [isVisible]);

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <StatusBar style="light" backgroundColor={colors.modalCover} />
      <Animated.View
        style={[
          GlobalStyles.modalOverlay,
          { opacity, justifyContent: "center" },
        ]}
      >
        <View
          style={{
            ...GlobalStyles.modalContent,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              ...styles.card,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ gap: 30 }}>
              <View>
                <Ionicons
                  name={alertConfig.icon}
                  size={50}
                  color={alertConfig.color}
                  style={{ textAlign: "center" }}
                />

                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.textConfirm}>{text}</Text>
              </View>

              <TouchableOpacity
                style={[
                  GlobalStyles.button,
                  {
                    backgroundColor: alertConfig.color,
                    minWidth: "100%",
                    width: "100%",
                  },
                ]}
                onPress={onConfirm}
              >
                <Text style={GlobalStyles.buttonText}>{confirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}


export default ModalCustom;

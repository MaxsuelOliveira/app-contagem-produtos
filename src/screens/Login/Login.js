import React, { useState, useEffect, useCallback } from "react";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, Alert, TouchableOpacity, Linking } from "react-native";
import { StatusBar } from "expo-status-bar";

// Styles
import { GlobalStyles } from "../../styles/GlobalStyles";
import { styles } from "./styles";
import { decodeToken } from "../../utils/token";
import ModalCustom from "../../utils/ModalCustom/Modal";

const WHATSAPP_NUMBER = "5577998668304"; // Definição de constante reutilizável

// Abrir WhatsApp
const openWhatsApp = () => {
  Linking.openURL(`whatsapp://send?phone=${WHATSAPP_NUMBER}`);
};

// Componente para input com label
const InputField = ({ label, value, onChangeText, placeholder, keyboardType = "default", secureTextEntry }) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={GlobalStyles.label}>{label}</Text>
    <TextInput
      style={GlobalStyles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  </View>
);

// Componente para alternar visibilidade da senha
const PasswordField = ({ value, onChangeText, showPassword, togglePasswordVisibility }) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={GlobalStyles.label}>Sua senha *</Text>
    <View style={styles.containerShowPassword}>
      <TextInput
        style={GlobalStyles.input}
        placeholder="******"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.buttonShowPassword} onPress={togglePasswordVisibility}>
        <Text style={styles.buttonShowPasswordText}>
          {showPassword ? "Ocultar" : "Exibir"} senha
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    uuid: "",
    describe: "",
    showModalCustom: false,
    modalInfo: {},
  });

  useEffect(() => {
    const initializeDeviceData = async () => {
      try {
        let uuidDevice = await AsyncStorage.getItem("uuidDevice");

        if (!uuidDevice) {
          uuidDevice = Crypto.randomUUID();
          await AsyncStorage.setItem("uuidDevice", uuidDevice);
        }

        setState((prev) => ({ ...prev, uuid: uuidDevice, describe: Device.modelName }));
      } catch (error) {
        console.error("Erro ao recuperar UUID do dispositivo:", error);
      }
    };

    initializeDeviceData();
  }, []);

  // Alternar visibilidade da senha
  const togglePasswordVisibility = () => {
    setState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  // Exibir modal de alerta
  const showAlertModal = (type, title, text, confirmText, onConfirm) => {
    setState((prev) => ({
      ...prev,
      showModalCustom: true,
      modalInfo: { type, title, text, confirmText, onConfirm },
    }));
  };

  const handleLogin = useCallback(async () => {
    if (!state.email || !state.password) {
      showAlertModal("error", "Atenção", "Por favor, preencha todos os campos.", "Certo !", () =>
        setState((prev) => ({ ...prev, showModalCustom: false }))
      );
      return;
    }

    setState((prev) => ({ ...prev, loading: true }));

    try {
      const pass = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.MD5, state.password);

      const response = await fetch("https://coletor.webart3.com/login/empresa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          password: pass,
          uuid: state.uuid,
          describe: state.describe,
        }),
      });

      const responseLogin = await response.json();

      if (responseLogin.token) {
        const decode = decodeToken(responseLogin.token);
        await AsyncStorage.setItem("token", responseLogin.token);
        navigation.navigate("Home", { userName: decode.nome });
      } else {
        showAlertModal("error", "Login não realizado!", responseLogin.error, "Tentar novamente", () =>
          setState((prev) => ({ ...prev, showModalCustom: false, loading: false }))
        );
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      showAlertModal("error", "Erro", "Ocorreu um erro inesperado. Tente novamente.", "OK", () =>
        setState((prev) => ({ ...prev, showModalCustom: false, loading: false }))
      );
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, [state.email, state.password, state.uuid, state.describe, navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.form}>
        <Text style={styles.title}>EstoqueFácil</Text>
      </View>

      <InputField label="Seu email *" value={state.email} onChangeText={(email) => setState((prev) => ({ ...prev, email }))} placeholder="email@email.com" keyboardType="email-address" />
      
      <PasswordField value={state.password} onChangeText={(password) => setState((prev) => ({ ...prev, password }))} showPassword={state.showPassword} togglePasswordVisibility={togglePasswordVisibility} />

      <View style={styles.buttonsActions}>
        <TouchableOpacity style={GlobalStyles.button} onPress={handleLogin} disabled={state.loading}>
          <Text style={GlobalStyles.buttonText}>{state.loading ? "Carregando..." : "Entrar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RecoverPassword")}>
          <Text style={styles.buttonForgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
          <Text style={styles.buttonForgotPasswordText}>Criar uma conta, teste grátis</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de alerta customizado */}
      <ModalCustom isVisible={state.showModalCustom} onClose={() => setState((prev) => ({ ...prev, showModalCustom: false }))} dataModal={state.modalInfo} />
    </View>
  );
};

export default LoginScreen;

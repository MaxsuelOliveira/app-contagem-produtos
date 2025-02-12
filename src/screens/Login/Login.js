import { useState, useEffect, useCallback } from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "../../styles/GlobalStyles";
import { styles } from "./styles";
import ModalCustom from "../../utils/ModalCustom/Modal";
import { decodeToken } from "../../utils/token";
import { ScrollView } from "react-native-gesture-handler";

import { LinearGradient } from "expo-linear-gradient";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uuid, setUuid] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let storedUUID = await AsyncStorage.getItem("uuid");

        Alert.alert("Você possui um uuid", storedUUID);

        if (!storedUUID) {
          storedUUID = Crypto.randomUUID();
          await AsyncStorage.setItem("uuid", storedUUID);
        }

        setUuid(storedUUID);
      } catch (error) {
        Alert.alert("Erro ao recuperar UUID:", error.message);
      }
    })();
  }, []);

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      return showAlert("error", "Atenção", "Preencha todos os campos.");
    }

    setLoading(true);

    try {
      const hashedPass = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.MD5,
        password
      );

      const response = await fetch(
        "https://coletor.webart3.com/login/empresa",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password: hashedPass,
            uuid,
            describe: Device.modelName,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {
        const decoded = decodeToken(data.token);
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("login", "true");
        navigation.navigate("Home", { userName: decoded.nome });
      } else {
        if (data.error === "Limite de dispositivos atingido") {
          showAlert("error", "Login não realizado!", data.error, "OK");

          return;
        }
      }
    } catch (error) {
      showAlert("error", "Erro", "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }, [email, password, uuid, navigation]);

  const showAlert = (type, title, text) => {
    setModalInfo({
      type,
      title,
      text,
      confirmText: "OK",
      onConfirm: () => setShowModal(false),
    });
    setShowModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.text}>Sign in with Facebook</Text>

      <View style={styles.form}>
        <View style={styles.containerForm}>
          <Text style={styles.title}>EstoqueFácil</Text>

          <InputField
            label="Seu email *"
            value={email}
            onChangeText={setEmail}
            placeholder="email@email.com"
            keyboardType="email-address"
          />

          <PasswordField
            value={password}
            onChangeText={setPassword}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
          />

          <View style={styles.buttonsActions}>
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={GlobalStyles.buttonText}>
                {loading ? "Carregando..." : "Entrar"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("RecoverPassword")}
            >
              <Text style={styles.buttonForgotPasswordText}>
                Esqueci minha senha
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("CreateAccount")}
            >
              <Text style={styles.buttonForgotPasswordText}>
                Criar uma conta, teste grátis
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ModalCustom
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        dataModal={modalInfo}
      />
    </ScrollView>
  );
};

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) => (
  <View style={{ marginBottom: 5 }}>
    <Text style={GlobalStyles.label}>{label}</Text>
    <TextInput
      style={GlobalStyles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize="none"
    />
  </View>
);

const PasswordField = ({
  value,
  onChangeText,
  showPassword,
  togglePassword,
}) => (
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
      <TouchableOpacity
        style={styles.buttonShowPassword}
        onPress={togglePassword}
      >
        <Text style={styles.buttonShowPasswordText}>
          {showPassword ? "Ocultar" : "Exibir"} senha
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default LoginScreen;

import { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Styles
import { GlobalStyles } from "@styles/GlobalStyles";
import { styles } from "./styles";

// Components
import ModalCustom from "@utils/ModalCustom/Modal";

// Utils
import { expiresIn, isExpired } from "@utils/timestamp";
import { decodeToken } from "@utils/token";
import { Login } from "@services/API";

const LoginScreen = ({ navigation }) => {
  const [uuid, setUUID] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [message, setMessage] = useState("Faça login para acessar o sistema.");

  useEffect(() => {
    checkStoredData();
  }, []);

  const checkStoredData = async () => {
    try {
      const isDevice = await AsyncStorage.getItem("isDevice");
      if (isDevice) {
        const { expires_in } = JSON.parse(isDevice);
        if (!isExpired(expires_in)) {
          navigation.navigate("Home");
          return;
        }
      }
      await setOrRetrieveUUID();
    } catch (error) {
      console.error("Erro ao acessar AsyncStorage:", error);
    }
  };

  const setOrRetrieveUUID = async () => {
    try {
      let uuidDevice = await AsyncStorage.getItem("uuidDevice");

      if (!uuidDevice) {
        uuidDevice = Crypto.randomUUID();
        await AsyncStorage.setItem("uuidDevice", uuidDevice);
      }

      setUUID(uuidDevice);
    } catch (error) {
      console.error("Erro ao gerar UUID:", error);
    }
  };

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

      const deviceInfo = `${Device.manufacturer} ${Device.brand} ${Device.modelName} ${Device.osName} ${Device.osVersion}`;

      const response = await Login(email, hashedPass, uuid, deviceInfo);
      const data = await response.json();

      if (data.token) {
        const { token, dispositivo } = data;
        dispositivo.expires_in = expiresIn();

        await AsyncStorage.multiSet([
          ["isToken", token],
          ["isLogin", "true"],
          ["isAccount", "premium"],
          ["isOnboarding", "true"],
          ["isDevice", JSON.stringify(dispositivo)],
        ]);

        let { bloqueado } = decodeToken(token);
        if (bloqueado == 1) {
          showAlert(
            "error",
            "Login não realizado!",
            "Seu usuário foi bloqueado."
          );
          return;
        }

        navigation.navigate("Home");
      } else {
        if (data.error === "Limite de dispositivos atingido") {
          showAlert("error", "Login não realizado!", data.error);
        }
      }
    } catch (error) {
      showAlert("error", "Erro", "Ocorreu um erro inesperado.");
      console.error("Erro ao logar:", error);
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
      <StatusBar style="dark" />

      <View style={styles.form}>
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

        <Text style={styles.describe}>{message}</Text>

        <View style={styles.buttonsActions}>
          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={GlobalStyles.buttonText}>
              {loading ? "Carregando..." : "Login"}
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

import { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import { expiresIn, isExpired } from "@utils/utils";
import { decodeToken } from "@utils/utils";
import { requestLogin } from "@services/API";

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

export default function Login({ navigation }) {
  // States
  const [loading, setLoading] = useState(false);
  const [uuidDevice, setUUIDDevice] = useState("");
  const [device, setDevice] = useState(null);

  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const [message, setMessage] = useState("Faça login para acessar o sistema.");

  useEffect(() => {
    checkStoredData();
  }, []);

  // Verifica dados armazenados e sessão
  const checkStoredData = async () => {
    try {
      const storedDevice = await AsyncStorage.getItem("isDevice");

      if (storedDevice) {
        const isDevice = JSON.parse(storedDevice);
        const { expires_in, uuid } = isDevice;

        setDevice(isDevice);
        setUUIDDevice(uuid);

        if (!isExpired(expires_in)) {
          navigation.navigate("Home");
          return;
        } else {
          Alert.alert("Atenção", "Sua sessão expirou, faça login novamente.");
          await AsyncStorage.removeItem("isDevice"); 
        }
      }

      await setOrRetrieveUUID();
    } catch (error) {
      console.error("Erro ao acessar AsyncStorage:", error);
    }
  };

  // Define ou recupera UUID do dispositivo
  const setOrRetrieveUUID = async () => {
    try {
      let storedUUID = await AsyncStorage.getItem("uuidDevice");

      if (!storedUUID) {
        storedUUID = Crypto.randomUUID();
        await AsyncStorage.setItem("uuidDevice", storedUUID);
      }

      setUUIDDevice(storedUUID);
    } catch (error) {
      console.error("Erro ao manipular UUID:", error);
    }
  };

  // Obtém informações do dispositivo
  const retrieveDeviceInfo = () => {
    return device
      ? device.describe
      : `${Device.manufacturer} ${Device.brand} ${Device.modelName} ${Device.osName} ${Device.osVersion}`;
  };

  // Função de login
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

      const deviceInfo = retrieveDeviceInfo();
      const response = await requestLogin(
        email,
        hashedPass,
        uuidDevice,
        deviceInfo
      );
      const data = await response.json();

      if (data.token) {
        await storeLoginData(data.token, data.dispositivo);

        let { bloqueado } = decodeToken(data.token);
        if (bloqueado === 1) {
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
  }, [email, password, uuidDevice, navigation]);

  // Armazena os dados do login
  const storeLoginData = async (token, dispositivo) => {
    try {
      dispositivo.expires_in = expiresIn();

      await AsyncStorage.multiSet([
        ["isToken", token],
        ["isLogin", "true"],
        ["isAccount", "premium"],
        ["isOnboarding", "true"],
        ["isDevice", JSON.stringify(dispositivo)],
      ]);
    } catch (error) {
      console.error("Erro ao salvar dados do login:", error);
    }
  };

  // Exibe alertas
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
}

import React, { useState, useEffect } from "react";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, Alert, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";

// Styles
import { GlobalStyles } from "../../styles/GlobalStyles";
import { styles } from "./styles";
import { decodeToken } from "../../utils/token";

// Abrir um chat no WhatsApp
const openWhatsApp = () => {
  Linking.openURL("whatsapp://send?phone=5577998668304");
};

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [uuid, setUuid] = useState("");
  
  useEffect(() => {
    const getOrCreateUUID = async () => {
      let uuidDevice = await AsyncStorage.getItem("uuidDevice");

      if (!uuidDevice) {
        uuidDevice = Crypto.randomUUID();

        await AsyncStorage.setItem("uuidDevice", uuidDevice);
      }

      setUuid(uuidDevice);
    };

    getOrCreateUUID();
  }, []);

  const [describe, setDescribe] = useState(null);
  useEffect(() => {
    const fetchDescribeDevice = async () => {
      setDescribe(Device.modelName);
    };

    fetchDescribeDevice();
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const pass = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.MD5,
      password
    );

    if (!email || !pass) {
      Alert.alert("Por favor, preencha todos os campos");
      return;
    }

    const data = {
      email: email,
      password: pass,
      uuid: uuid,
      describe: describe,
    };

    const response = await fetch("https://coletor.webart3.com/login/empresa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseLogin = await response.json();

    responseLogin.token
      ? (() => {
          const decode = decodeToken(responseLogin.token);
          AsyncStorage.setItem("token", responseLogin.token);
          navigation.navigate("Home", { userName: decode.nome });
        })()
      : (() => {
          Alert.alert("Erro", responseLogin.error || "Algo deu errado.");
          setLoading(false);
        })();

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.form}>
        <Text style={styles.title}>EstoqueFácil</Text>
      </View>

      <View style={{ marginBottom: 5 }}>
        <Text style={GlobalStyles.label}>Seu email *</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="email@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={{ marginBottom: 5 }}>
        <Text style={GlobalStyles.label}>Sua senha *</Text>

        <View style={styles.containerShowPassword}>
          <TextInput
            style={[GlobalStyles.input]}
            placeholder="******"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={styles.buttonShowPassword}
            onPress={togglePasswordVisibility}
          >
            <Text style={styles.buttonShowPasswordText}>
              {showPassword ? "Ocultar" : "Exibir"} senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>

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
          onPress={() =>
            Alert.alert("Esqueci minha senha em desenvolvimento ...")
          }
        >
          <Text style={styles.buttonForgotPasswordText}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Alert.alert("Criar sua conta de teste, em desenvolvimento ...")
          }
        >
          <Text style={styles.buttonForgotPasswordText}>
            Criar uma conta, teste grátis
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal de alerta customizado */}

      {/* Modal para a criação de conta */}

      {/* Modal para recuperar a senha */}
    </View>
  );
};

export default LoginScreen;

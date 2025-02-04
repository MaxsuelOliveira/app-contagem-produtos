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
          AsyncStorage.setItem("token", responseLogin.token);
          navigation.navigate("Home");
        })()
      : (() => {
          Alert.alert("Erro", responseLogin.error || "Algo deu errado.");
        })();

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.form}>
        <Text style={styles.title}>EstoqueFácil</Text>
        <Text style={styles.describe}>Faça o login para continuar.</Text>
      </View>

      <View>
        <Text style={GlobalStyles.label}>Seu Email *</Text>
        <TextInput
          style={GlobalStyles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View>
        <Text style={GlobalStyles.label}>Senha *</Text>

        <View style={styles.containerShowPassword}>
          <TextInput
            style={[GlobalStyles.input, { width: "100%", marginBottom: 5 }]}
            placeholder="Senha"
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
              {showPassword ? "Esconder" : "Exibir"} senha
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonsActions}>
        <TouchableOpacity
          style={GlobalStyles.button}
          title={loading ? "Carregando..." : "Entrar"}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={GlobalStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonForgotPassword}
          onPress={() => openWhatsApp()}
        >
          <Text style={styles.buttonForgotPasswordText}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

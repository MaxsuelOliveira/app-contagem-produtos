import React, { useState, useEffect } from "react";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { GlobalStyles, lightTheme, darkTheme } from "../../styles/GlobalStyles";
import { DarkTheme } from "@react-navigation/native";

const LoginScreen = ({ navigation }) => {
  // Função para alternar entre mostrar e esconder a senha
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  // Melhorar isso aqui, usar o imei do celular! ou mac !
  const [uuid, setUuid] = useState("");
  useEffect(() => {
    const getOrCreateUuid = async () => {
      let storedUuid = await AsyncStorage.getItem("uuid");

      if (!storedUuid) {
        storedUuid = Crypto.randomUUID();

        await AsyncStorage.setItem("uuid", storedUuid);
      }

      setUuid(storedUuid);
    };

    getOrCreateUuid();
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
    const passwordMD5 = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.MD5,
      password
    );

    if (!email || !passwordMD5) {
      Alert.alert("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://coletor.webart3.com/login/empresa",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: passwordMD5,
            uuid: uuid,
            describe: describe,
          }),
        }
      );

      const data = await response.json();

      if (data.token) {
        // Salva o token no AsyncStorage para manter o usuário logado;
        await AsyncStorage.setItem("token", data.token);

        // Redireciona para a tela Home se o login for bem-sucedido;
        navigation.navigate("Home");
      } else {
        console.log(data);
        console.log("Erro ao fazer login:", data.error);
        Alert.alert("Erro", data.error || "Algo deu errado.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      Alert.alert("Erro", "Ocorreu um erro ao tentar fazer o login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>EstoqueFácil</Text>
      <Text style={styles.describe}>Faça o login para continuar.</Text>

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
          style={styles.button}
          title={loading ? "Carregando..." : "Entrar"}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={GlobalStyles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonForgotPassword}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.buttonForgotPasswordText}>
            Esqueci minha senha
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightTheme.primaryBackground,
    color: "#fff",
    fontFamily: "Montserrat",
    flex: 1,
    justifyContent: "center",
    padding: 25,
    height: "100vh",
  },

  title: {
    color: lightTheme.textPrimary,
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "Montserrat",
    textAlign: "start",
    marginBottom: 5,
  },

  describe: {
    fontFamily: "Montserrat",
    fontSize: 16,
    textAlign: "start",
    color: lightTheme.textSecondary,
    marginBottom: 30,
  },

  containerShowPassword: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // alignItems: "center",
    flexDirection: "column",
  },

  buttonsActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  buttonShowPassword: {
    // width: "35%",
    fontFamily: "Montserrat",
  },

  buttonShowPasswordText: {
    textAlign: "right",
    fontFamily: "Montserrat",
    color: lightTheme.textSecondary,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },

  buttonForgotPassword: {
    marginTop: 10,
    marginBottom: 10,
  },

  buttonForgotPasswordText: {
    color: lightTheme.textSecondary,
    fontSize: 13,
    fontFamily: "Montserrat",
    textAlign: "start",
    marginTop: 30,
  },
});

export default LoginScreen;

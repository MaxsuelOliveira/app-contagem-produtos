import React from "react";
// import * as Linking from 'expo-linking';
// import * as WebBrowser from 'expo-web-browser';

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const SignupBanner = ({ onLogin, createAccount }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        <Text style={styles.icon}>🚀</Text>
        Faça login para acessar todos os recursos do{" "}
        <Text style={styles.highlight}>EstoqueFácil!</Text>
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}   onPress={()=>{Alert.alert('Abrindo o navegador !')}}>
          <Text style={styles.buttonText}>
            Saiba mais
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#007AFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: -20,
  },

  icon: {
    fontSize: 20,
  },

  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "Montserrat_Medium",
  },

  highlight: {
    fontFamily: "Montserrat_Bold",
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
  },

  buttons: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
});

export default SignupBanner;

import React from "react";
// import * as Linking from 'expo-linking';
// import * as WebBrowser from 'expo-web-browser';

import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const SignupBanner = ({ onLogin, createAccount }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.text}>
        <Text style={styles.icon}>🚀</Text>
        <Text style={{fontSize: 16}}> Faça login {"\n"}</Text>
        Acesse todos os recursos do{" "}
        <Text style={styles.highlight}>EstoqueFácil!</Text>
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#007AFF",
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginBottom: -20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap : "10 10"
  },

  icon: {
    fontSize: 20,
  },

  text: {
    color: "#fff",
    fontSize: 14,
    textAlign: "justify",
    marginBottom: 10,
    fontFamily: "Montserrat_Medium",
  },

  highlight: {
    fontFamily: "Montserrat_Bold",
  },

  button: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "#007AFF",
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
  },

  buttons: {
    // display : 'none',
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
});

export default SignupBanner;

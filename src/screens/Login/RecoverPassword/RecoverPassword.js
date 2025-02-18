import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";

// Styles
import { GlobalStyles, colors } from "@styles/GlobalStyles";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";
import { FormattingInputs } from "@utils/inputFormat";

const RecoverPassword = () => {
  const [loading, setLoading] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");

  const [focusInCnpj, setFocusInCnpj] = useState(false);
  const [focusInTerms, setFocusInTerms] = useState(false);
  const [focusInEmail, setFocusInEmail] = useState(false);

  function recover() {
    if (cnpj.length == 0 || cnpj == "" || cnpj.length < 18) {
      Alert.alert("O cnpj da empresa é obrigatório !");
      setFocusInCnpj(true);
      return;
    }

    if (email.length == 0 || email == "") {
      Alert.alert("O email é obrigatório !");
      setFocusInEmail(true);
      return;
    }

    const bussines = {
      cnpj: cnpj,
      email: email,
      email_confirm: emailConfirm,
    };

    console.log("Bussines: ", bussines);
  }

  return (
    <View style={{ ...GlobalStyles.container, backgroundColor: "#ffffff" }}>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Recuperar Senha</Text>
          <Text style={GlobalStyles.label}>
            Informe os dados da sua empresa para recuperar a senha.
          </Text>
        </View>

        <View
          style={{
            ...GlobalStyles.cardBody,
            flex: 1,
          }}
        >
          <View style={styles.marginBottom}>
            <Text style={GlobalStyles.label}>CNPJ *</Text>
            <TextInput
              style={styles.input}
              value={cnpj}
              onChangeText={(text) => {
                text = FormattingInputs.formatCNPJ(text);
                setCnpj(text);
              }}
              minLength={18}
              maxLength={18}
              keyboardType="numeric"
              autoFocus={focusInCnpj}
            />
          </View>

          <View style={styles.marginBottom}>
            <Text style={GlobalStyles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.marginBottom}>
            <Text style={GlobalStyles.label}>Confirmar Email *</Text>
            <TextInput
              style={styles.input}
              value={emailConfirm}
              onChangeText={(text) => setEmailConfirm(text)}
              keyboardType="email-address"
            />
          </View>
        </View>

        <TouchableOpacity style={GlobalStyles.button} onPress={() => recover()}>
          <Text style={GlobalStyles.buttonText}>Recuparar Senha</Text>
          <Text
            style={{ ...GlobalStyles.small, color: "#ffffff", marginTop: 0 }}
          >
            Esqueceu sua senha ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecoverPassword;

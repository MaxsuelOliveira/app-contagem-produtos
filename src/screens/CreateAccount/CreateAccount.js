import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";
import { FormattingInputs } from "../../utils/inputFormat";

const CreateAccount = () => {
  const [loading, setLoading] = useState(false);
  const [cnpj, setCnpj] = useState("");
  const [nameFantasy, setNameFantasy] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);

  const [focusInCnpj, setFocusInCnpj] = useState(false);
  const [focusInName, setFocusInName] = useState(true);
  const [focusInEmail, setFocusInEmail] = useState(false);
  const [focusInPhone, setFocusInPhone] = useState(false);
  const [focusInTerms, setFocusInTerms] = useState(false);

  function create() {
    if (cnpj.length == 0 || cnpj == "" || cnpj.length < 18) {
      Alert.alert("O cnpj da empresa é obrigatório !");
      setFocusInCnpj(true);
      return;
    }

    if (nameFantasy.length == 0 || nameFantasy == "") {
      Alert.alert("O nome fantasia é obrigatório !");
      setFocusInName(true);
      return;
    }

    if (email.length == 0 || email == "") {
      Alert.alert("O email é obrigatório !");
      setFocusInEmail(true);
      return;
    }

    if (phone.length == 0 || phone == "" || phone.length < 15) {
      Alert.alert("O telefone é obrigatório !");
      setFocusInPhone(true);
      return;
    }

    if (!terms) {
      Alert.alert(
        "Você precisa aceitar os termos de uso e política de privacidade."
      );
      setFocusInTerms(true);
      return;
    }

    const bussines = {
      cnpj: cnpj,
      nameFantasy: nameFantasy,
      email: email,
      phone: phone,
      password: "estoqueFácil123",
    };

    console.log("Bussines: ", bussines);
  }

  return (
    <View style={{ ...GlobalStyles.container, backgroundColor: "#ffffff" }}>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Criar Conta</Text>
          <Text style={GlobalStyles.label}>
            Crie uma nova conta para começar a usar o aplicativo. Teste grátis
            por 7 dias.
          </Text>
        </View>

        <View
          style={{
            ...GlobalStyles.cardBody,
            alignItems: "center",
            justifyContent: "center",
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
            <Text style={GlobalStyles.label}>Nome Fantasia*</Text>
            <TextInput
              style={styles.input}
              value={nameFantasy}
              onChangeText={(text) => setNameFantasy(text)}
              keyboardType="default"
              autoFocus={focusInName}
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
            <Text style={GlobalStyles.label}>Telefone *</Text>
            <TextInput
              style={styles.input}
              value={phone}
              maxLength={15}
              onChangeText={(text) => {
                text = FormattingInputs.formatPhone(text);
                setPhone(text);
              }}
              keyboardType="phone-pad"
              autoFocus={focusInPhone}
            />
          </View>

          <View style={{ ...styles.inputGroup, marginBottom: 20 }}>
            <View style={{ width: "90%" }}>
              <Text style={GlobalStyles.label}>
                Termos de uso e política de privacidade *
              </Text>
              <Text style={GlobalStyles.label}>
                Ao criar uma conta, você concorda com os nossos Termos de {""}
                <Text style={{ ...GlobalStyles.link, borderBottomWidth: 0 }}>
                  Política de Privacidade. {"\n\n"}
                </Text>
                Também você concorda sobre as leis de proteção de dados.
              </Text>
            </View>
            <Checkbox
              value={terms}
              onValueChange={() => {
                setTerms(!terms);
              }}
              autoFocus={focusInTerms}
              color={colors.primary}
              style={GlobalStyles.checkbox}
            />
          </View>

          <TouchableOpacity
            style={GlobalStyles.button}
            onPress={() => create()}
          >
            <Text style={GlobalStyles.buttonText}>Criar Conta</Text>
            <Text
              style={{ ...GlobalStyles.small, color: "#ffffff", marginTop: 0 }}
            >
              Testar por 7 dias grátis
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CreateAccount;

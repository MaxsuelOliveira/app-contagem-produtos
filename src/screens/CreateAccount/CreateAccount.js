import React, { useState } from "react";
import uuid from "react-native-uuid";
import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView} from "react-native";

// Icons
import AntDesign from "@expo/vector-icons/AntDesign";

// Styles
import { GlobalStyles, colors } from "../../styles/GlobalStyles";
import { styles } from "./styles";
import Checkbox from "expo-checkbox";

const CreateAccount = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [focusInName, setFocusInName] = useState(true);

  function createInventory() {
    if (name.length == 0 || name == "") {
      Alert.alert("O inventário precisa de um nome !");
      setFocusInName(true);
      return;
    }

    const inventory = {
      uuid: uuid.v4(),
      name: name,
      describe: description,
      status: "progress", // progress | done | unknown
      date_create: new Date(),
      date_end: new Date(),
      products: [],
      compare_in_spreadsheet: false,
      compare_price: false,
    };
  }

  return (
    <View style={styles.settingsContainer}>
      <StatusBar style="auto" backgroundColor="#ffffff" />

      <View style={GlobalStyles.cardHeader}>
        <Text style={styles.cardTilte}>
          Criar Conta
        </Text>
      </View>

      <ScrollView>
        <Text style={styles.cardTitle}>Criar Conta</Text>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;

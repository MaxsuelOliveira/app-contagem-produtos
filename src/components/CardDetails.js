import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { GlobalStyles, colors } from "../styles/GlobalStyles";
import { styles } from "./Styles";

const Card = (propos) => {
  const { title, describe } = propos;

  return (

    <View style={styles.card}>

      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSubtitle}>{describe}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={GlobalStyles.buttonText}>Criar conta agora !</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity >
        <Text >
          Fechar
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Card;

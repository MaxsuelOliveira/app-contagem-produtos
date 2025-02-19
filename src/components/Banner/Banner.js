import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

const icons = ["🚀", "📦", "📊", "🔄", "✅"]; // Lista de ícones dinâmicos

const SignupBanner = ({ onLogin }) => {
  const [iconIndex, setIconIndex] = useState(0);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
      
      setIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.banner}>
      <Animated.Text style={[styles.icon, { opacity: fadeAnim }]}>{icons[iconIndex]}</Animated.Text>
      <Text style={styles.text}>
        <Text style={styles.title}>Faça login</Text> e acesse todos os recursos do
        <Text style={styles.highlight}> EstoqueFácil!</Text>
      </Text>
      <TouchableOpacity style={styles.button} onPress={onLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#007AFF",
    padding: 20,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    gap: 10,
  },
  icon: {
    fontSize: 34,
    marginBottom: 5,
    color: "#fff",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Montserrat_Medium",
  },
  highlight: {
    fontFamily: "Montserrat_Bold",
  },
  title: {
    fontFamily: "Montserrat_Bold",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#007AFF",
    fontSize: 16,
    fontFamily: "Montserrat_Bold",
  },
});

export default SignupBanner;

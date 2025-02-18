import { StyleSheet } from "react-native";
import { GlobalStyles } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({

  cardHeader : {
    ...GlobalStyles.cardHeader, 
    marginBottom : 20,
  },

  cardBody: {
    flex: 1,
    height: "100%"
  },

  grid: {
    marginBottom: 10,
    minWidth: "100%",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  disabledInput: {
    backgroundColor: "#ddd", // Cinza para indicar que está desativado
    color: "#888", // Cinza escuro para o texto
  },

  card: {
    minHeight: "100%",
    maxHeight: "100%",
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
    backgroundColor: "transparent",
  },

  button : {
    ...GlobalStyles.button,
    // position: "absolute", 
    // top: "100%",
    // left: 0,
  }
});

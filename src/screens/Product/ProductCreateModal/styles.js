import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cardBody: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  grid: {
    display: "flex",
    marginBottom: 0,
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
});

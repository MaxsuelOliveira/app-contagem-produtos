// Styles
import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  card: {
    // ...GlobalStyles.card,
    backgroundColor: "#fff",
    position: "relative",
    padding: 20,
    borderRadius: 30,
    margin: "20",
    minHeight: 250,
  },

  cardTitle: {
    textAlign: "center",
    color: colors.textPrimary,
    fontFamily: "Montserrat_Bold",
    fontSize: 22,
    marginBottom: 10,
  },

  textConfirm: {
    ...GlobalStyles.value,
    fontSize: 16,
    textAlign: "center",
  },
});

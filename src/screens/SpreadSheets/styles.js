import { StyleSheet } from "react-native";
import { GlobalStyles } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardTilte: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
  },

  card : {
    ...GlobalStyles.card,
    minHeight: "50%",
  },

  settingsItem: {
    marginBottom: 30,
  },

  title: {
    fontSize: 14,
    fontFamily: "Montserrat_Regular",
    marginBottom: 10,
  },

  import: {
    borderColor: "#ededee",
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 20,
    minHeight: 120,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
});

import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardTilte: {
    ...GlobalStyles.cardTitle,
    marginTop : 0
  },

  settingsContainer: {
    flexDirection: "column",
    gap: 12,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    flex: 1,
  },

  settingsItem: {
    marginBottom: 30,
  },

  settingsBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  label: {
    color: "white",
    fontWeight: "bold",
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    marginBottom: 10,
  },
});

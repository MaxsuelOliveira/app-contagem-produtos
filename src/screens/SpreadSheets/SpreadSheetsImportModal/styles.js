import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardTilte: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
  },

  cardBody : {
    gap : 10,
    marginBottom : 10
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
    marginBottom: 20,
    gap: 10,
  },

  settingsBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  label: {
    color: "white",
    fontWeight: "bold",
  },

  progressText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
  },

  cardHeader: {
    ...GlobalStyles.cardHeader,
    flexDirection: "row",
    marginBottom: 10,
    padding: 0,
    justifyContent : "flex-end"
  },

  title: {
    fontSize: 20,
    fontFamily: "Montserrat_Medium",
    marginBottom: 10,
    textAlign : "center"
  },

  textDescription: {
    ...GlobalStyles.label,
    fontSize: 16,
    fontFamily: "Montserrat_Regular",
    textAlign: "center",
  },

  badge: {
    ...GlobalStyles.badge,
    maxWidth: "auto",
  minWidth: 'auto',
    paddingHorizontal: 10,
    backgroundColor: colors.warrning,
  },

  buttonImport: {
    ...GlobalStyles.button,
    backgroundColor: "transparent",
    borderColor: colors.textDescription,
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "dashed",
    marginBottom: 20,
    marginTop: -10,
  },

  buttonImportText: {
    ...GlobalStyles.buttonText,
    color: colors.textDescription,
  }
});

import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  grid: {
    width: "100%",
    marginBottom: 10,
    marginTopp: 0,
  },

  section: {},

  textJustify: {
    textAlign: "justify",
  },

  label: {
    ...GlobalStyles.label,
    // marginBottom: 10,
    fontFamily: "Montserrat_Medium",
    fontSize: 14,
  },

  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: colors.inputBackground,
    padding: 10,
    borderRadius: 5,
  },

  value: {
    ...GlobalStyles.value,
    fontFamily: "Montserrat_Medium",
    fontSize: 14,
    flex: 1,
    
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: colors.colorText,
    marginBottom: 10,
    marginTop: 20,
  },

  button: {
    ...GlobalStyles.button,
    marginTop: 20,
  },

  small: {
    ...GlobalStyles.small,
    textAlign: "justify",
  },

  cardTitle: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
    fontSize: 17,
  },
});

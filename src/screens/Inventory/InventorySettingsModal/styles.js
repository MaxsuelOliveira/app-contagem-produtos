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
    color : colors.textDescription,
    fontFamily: "Montserrat_Regular",
    fontSize: 14,
  },

  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
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

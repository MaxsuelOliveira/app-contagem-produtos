import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  grid: {
    width: "100%",
    marginBottom: 10,
    marginTopp: 0,
  },

  section: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  textJustify: {
    textAlign: "justify",
  },

  label: {
    flex: 1,
    color: colors.colorText,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: colors.colorText,
    marginBottom: 10,
    marginTop: 20,
  },
});

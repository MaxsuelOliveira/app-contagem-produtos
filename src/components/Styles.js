import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GlobalStyles, colors } from "../styles/GlobalStyles";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  cardTitle: {
    fontFamily: "Montserrat_Bold",
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: 10,
  },

  cardSubtitle: {
    fontFamily: "Montserrat_Medium",
    fontSize: RFValue(14),
    color: colors.textSecondary,
    marginBottom: 10,
    textAlign: "justify",
  },

  button: {
    ...GlobalStyles.button,
    width: "100%",
  }

});

import { StyleSheet } from "react-native";
import { colors } from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    flex: 1,
    justifyContent: "center",
    padding: 25,
    height: "100vh",
  },

  form: {
    marginBottom: 30,
  },

  title: {
    color: colors.textPrimary,
    fontSize: 35,
    fontFamily: "Montserrat_Bold",
    textAlign: "start",
  },

  describe: {
    fontFamily: "Montserrat_Medium",
    fontSize: 15,
    textAlign: "start",
    color: colors.textSecondary,
  },

  containerShowPassword: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    flexDirection: "column",
  },

  buttonsActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
  },

  buttonShowPassword: {
    // width: "35%",
    fontFamily: "Montserrat_Medium",
    marginTop: 0,
    marginBottom: 10,
  },

  buttonShowPasswordText: {
    textAlign: "right",
    fontFamily: "Montserrat_Medium",
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },

  buttonForgotPasswordText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: "Montserrat_Medium",
    textAlign: "start",
    marginTop: 10,
  },
});

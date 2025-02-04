import { StyleSheet } from "react-native";
import { colors } from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    color: "#fff",
    fontFamily: "Montserrat",
    flex: 1,
    justifyContent: "center",
    padding: 25,
    height: "100vh",
  },

  title: {
    color: colors.textPrimary,
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "Montserrat",
    textAlign: "start",
    marginBottom: 5,
  },

  describe: {
    fontFamily: "Montserrat",
    fontSize: 16,
    textAlign: "start",
    color: colors.textSecondary,
    marginBottom: 30,
  },

  containerShowPassword: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    // alignItems: "center",
    flexDirection: "column",
  },

  buttonsActions: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
    width: "100%",
  },

  buttonShowPassword: {
    // width: "35%",
    fontFamily: "Montserrat",
  },

  buttonShowPasswordText: {
    textAlign: "right",
    fontFamily: "Montserrat",
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },

  buttonForgotPassword: {
    marginTop: 10,
    marginBottom: 10,
  },

  buttonForgotPasswordText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: "Montserrat",
    textAlign: "start",
    marginTop: 30,
  },
});

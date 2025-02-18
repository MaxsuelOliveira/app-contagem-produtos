import { StyleSheet } from "react-native";
import { colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackground,
    flex: 1,
  },

  containerForm : {
    // backgroundColor: linear-gradient(162deg, rgba(137,198,231,1) 0%, rgba(81,122,143,1) 95%, rgba(231,239,243,1) 100%)
    padding: 20,
    borderTopLeftRadius: 120,
    borderTopRightRadius : 50,
    borderBottomLeftRadius : 100,
    borderBottomEndRadius : 70,
  },

  form: {
    padding: 20,
    height: "100%", 
    minHeight: "100%",
    display : "flex",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryBackground,
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
    width: "100%",
    color: colors.textSecondary,
    fontSize: 13,
    fontFamily: "Montserrat_Medium",
    textAlign: "start",
    marginTop: 10,
  },
});

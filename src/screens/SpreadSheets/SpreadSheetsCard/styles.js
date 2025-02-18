import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  itemInventario: {

    minHeight: 80,
    marginBottom: 10,
    width: "100%",
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15,
  },

  menuButtton: {
    width: 35,
    minHeight: 35,
    backgroundColor: colors.danger,
    borderRadius: 10,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    width: 35,
    height: 35,
    backgroundColor: colors.danger,
    borderRadius: 10,
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
   
  },

  menuButttonIcon: {
    color: colors.white || "#fff",
  },

  description: {
    flex: 1,
  },

  title: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5,
  },

  titleText: {
    fontFamily: "Montserrat_Bold",
    fontSize: 14,
    color: colors.textPrimary,
  },

  info: {
    flexDirection: "column",
    // alignItems: "center",
  },

  infoText: {
    fontSize: 12,
    fontFamily: "Montserrat_Medium",
    color: colors.textDescription,
    marginRight: 10,
    marginBottom: 5,
  },
});

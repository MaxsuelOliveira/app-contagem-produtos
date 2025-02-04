import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  itemInventario: {
    width: "100%",
    padding: 10,
    backgroundColor: "#a5a4a40d",
    borderRadius: 8,
    marginBottom: 10,
    minHeight: 80,
    alignItems: "center",
    justifyContent: "center",
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 15, // Aplicado do .item-inventario--content
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
    fontFamily: "Montserrat_Medium",
    fontSize: 17,
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
  },

  // circleDivider: {
  //   width: 5,
  //   height: 5,
  //   borderRadius: 100,
  //   backgroundColor: "#C0C0C0", // Aplicado do .circle-divider
  //   marginRight: 10,
  // },
});

import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  card: {
    ...GlobalStyles.card,
    width: "95%",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
    marginLeft: "2.5%",
    marginRight: "2.5%",
    marginTop: "50%",
    borderRadius: 30,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },

  buttons: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  button: {
    ...GlobalStyles.button,
    backgroundColor: colors.light,
    width: "100%",
  },

  cardTitle: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
    fontFamily: "Montserrat_Bold",
  },

  textConfirm: {
    ...GlobalStyles.value,
    marginBottom: 10,
    fontSize: 16,
  },
});

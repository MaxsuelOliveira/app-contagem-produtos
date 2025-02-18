import { StyleSheet } from "react-native";
import { colors, GlobalStyles } from "@styles/GlobalStyles";

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

  cardTitle: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
    fontFamily: "Montserrat_Bold",
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

  label: {
    ...GlobalStyles.value,
    marginBottom: 10,
  },

  buttonCancelar: {
    ...GlobalStyles.button,
    backgroundColor: colors.light,
    width: "50%",
  },

  value: {
    ...GlobalStyles.value,
    fontSize: 16,
  },

  buttonDanger: {
    ...GlobalStyles.button,
    backgroundColor: colors.danger,
    width: "50%",
  },
});

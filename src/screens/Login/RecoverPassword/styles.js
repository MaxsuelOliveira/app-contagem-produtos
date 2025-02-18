import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: "100vh",
    backgroundColor: colors.white,
    padding: 20,
  },

  cardHeader: {
    marginTop: 20,
    marginBottom: 20,
  },

  cardTitle: {
    // ...GlobalStyles.cardTitle,
    marginTop: 0,
    fontSize: 22,
    fontFamily : "Montserrat_Medium",
    marginBottom: 5,
  },

  inputGroup: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  marginBottom : {
    marginBottom : 10
  },

  input : {
    ...GlobalStyles.input,
    minWidth: "100%"
  }

});

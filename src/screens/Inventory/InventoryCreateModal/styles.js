import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardTitle: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
  },

  textarea: {
    ...GlobalStyles.input,
    ...GlobalStyles.textArea,
    paddingTop: 10,
  },
});

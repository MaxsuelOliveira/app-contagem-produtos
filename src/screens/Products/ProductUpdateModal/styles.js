import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardTilte: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
  },

  cardBody: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  grid: {
    display: "flex",
    gap: 10,
    marginBottom: 0,
    marginTopp: 0,
  },

  section: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },

  sectionCheck: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  checkbox: {
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
    gap: 10,
  },

  buttonDelete: {
    ...GlobalStyles.button,
    width: "100",
    backgroundColor: colors.danger,
  },

  buttonUpdate: { ...GlobalStyles.button, flex: 1 },
});

import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardHeader: {
    ...GlobalStyles.cardHeader,
    marginTop: 0,
  },

  cardTitle: {
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
    width: "100%",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    borderWidth: 1,
    borderRadius: 5,
  },

  picker: {
    width: "100%",
    fontFamily: "Montserrat_Regular",
    justifyContent: "space-between",
    alignItems: "center",
    lineHeight: 48,
    color: colors.textDescription,
  },

  triggerStyle: {
    height: 40,
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },

  triggerText: {
    fontSize: 16,
    color: "#fff",
  },

  value: {
    ...GlobalStyles.value,
    textAlign: "justify",
    marginBottom: 10,
    fontSize: 14,
  },

  label: {
    ...GlobalStyles.label,
    textAlign: "justify",
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
  },

  button: { ...GlobalStyles.button, marginTop: 20 },
});

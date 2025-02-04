import { StyleSheet } from "react-native";
import { colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardBody: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  grid: {
    display: "flex",
  },

  section: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    // marginRight: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  triggerText: {
    fontSize: 16,
    color: "#fff",
  }
});

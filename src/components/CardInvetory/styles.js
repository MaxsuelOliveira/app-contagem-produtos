import { StyleSheet } from "react-native";
import { colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  inventoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: colors.backgroundItem,
    // margin: 10,
    marginBottom: 20,
    padding: 5,
    borderRadius: 15,
  },

  inventoryItemContent: {
    padding: 5,
    gap: 5,
  },

  invetoryItemContainer: {
    flexDirection: "row",
    gap: 30,
  },

  title: {
    fontSize: 14.5,
    fontFamily: "Montserrat_Bold",
    color: colors.textPrimary,
  },

  label: {
    fontSize: 12,
    fontFamily: "Montserrat_Medium",
    color: colors.textDescription,
  },

  value: {
    fontSize: 12.5,
    color: colors.textPrimary,
    fontFamily: "Montserrat_Medium",
  },
});

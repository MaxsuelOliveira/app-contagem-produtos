import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "../../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  inventoryItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: colors.cardBackground,
    margin: 10,
    marginBottom: 15,
    padding: 10,
    borderRadius: 15,
  },

  itemWarning: {
    borderColor: colors.warrning,
    borderWidth: 1,
  },

  inventoryItemContent: {
    padding: 5,
    gap: 5,
  },

  inventoryItemContainer: {
    width: "100%",
    flexDirection: "row",
    // flexWrap: "wrap",
    justifyContent: "space-between",
    flex: 1,
  },

  inventoryItemContainerItem: {
    marginRight: 15,
    marginBottom: 5,
  },

  inventoryItemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 20,
    minHeight: 60,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
  },

  label: {
    fontSize: 12,
    fontFamily: "Montserrat_Medium",
    color: colors.textSecondary,
    textAlign: "left",
    minWidth: 50,
  },

  value: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
    textAlign: "left",
  },

  menuButton: {
    backgroundColor: "#fff",
    minWidth: 50,
    minHeight: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  inventoryItemSelected: {
    borderColor: colors.primary,
    borderWidth: 1,
  },

  inventoryItemRemoved : {
    backgroundColor: colors.danger,
  }

});

import { StyleSheet } from "react-native";
import { colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: colors.cardBackground,
    // margin: 10,
    marginBottom: 15,
    padding: 10,
    borderRadius: 15,
  },

  itemWarning: {
    backgroundColor: colors.warrning,
  },

  productItemContent: {
    padding: 5,
    gap: 5,
  },

  productItemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 10,
  },

  productItemContainerItem: {
    marginRight: 15,
    marginBottom: 5,
  },

  productItemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: 20,
    minHeight: 60,
  },

  productTitle: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
  },

  productLabel: {
    fontSize: 12,
    fontFamily: "Montserrat_Medium",
    color: colors.textSecondary,
    textAlign: "left",
    minWidth: 50,
  },

  productValue: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
    textAlign: "left",
  },

  productItemSelected: {
    borderColor: colors.primary,
    borderWidth: 1,
  },

  productItemRemoved: {
    backgroundColor: colors.danger,
  },

  productBagder: {
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
    textAlign: "left",
    backgroundColor: "#ced4da",
    padding: 5,
    borderRadius: 5,
  },

  productBagderQuantity: {
    backgroundColor: colors.primary,
    color: "white",
  },

  productBagderInconsistency: {
    backgroundColor: colors.warrning,
  },

  productBagderContainer: {
    position: "absolute",
    leeft: 0,
    top: -20,
    flexDirection: "row",
    gap: 10,
  },
});

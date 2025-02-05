import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GlobalStyles, colors } from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  inventoryCategories: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
  },

  containerInvetoryList: {
    flex: 1,
    paddingTop: 10,
  },

  header: {
    padding: 20,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },

  logoutButton: {
    width: "auto",
    alignItems: "flex-end",
    backgroundColor: colors.menubarBackground,
    borderRadius: 30,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  category: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    padding: 5,
    borderRadius: 10,
  },

  activeCategory: {
    backgroundColor: "#f5f5f5",
  },

  activeCategoryText: {
    color: colors.textPrimary,
    fontFamily: "Montserrat_Bold",
  },

  categoryText: {
    color: "#ababab",
    fontSize: 15,
    fontFamily: "Montserrat_Regular",
  },

  activeBadge: {
    backgroundColor: colors.primary,
  },

  textPrimary: {
    fontSize: RFPercentage(3.5),
    fontFamily: "Montserrat_Bold",
  },

  inventoryContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
  },

  inventoryItem: {
    flex: 1,
    width: "100%",
    padding: 0,
  },

  inventoryItemText: {
    fontSize: 16,
    fontFamily: "Montserrat_Regular",
    margin: 10,
  },
});

import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { GlobalStyles, colors } from "../../styles/GlobalStyles";

export const styles = StyleSheet.create({
  inventoryCategories: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-between",
 
    marginTop: 30,
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

  headerTabs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontFamily: "Montserrat_Bold",
    fontSize: RFPercentage(3.5),
    width: "80%",
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
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: 5,
    height: 40
  },

  categoryTitle: {},

  activeCategory: {
    borderRadius: 30,
    backgroundColor: colors.cardBackground,
  },

  activeCategoryText: {
    color: colors.textPrimary,
    fontFamily: "Montserrat_Bold",
  },

  categoryText: {
    width: "100%",
    position: "relative",
    color: "#ababab",
    fontSize: 14,
    fontFamily: "Montserrat_Medium",
    textAlign: "center",
  },

  activeBadge: {
    backgroundColor: colors.primary,
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

  buttonProfileHeader: {
    ...GlobalStyles.menubarItem,
    position: "absolute",
 
    top: -10,
    left: "90%",
    backgroundColor: colors.menubarBackground,
    borderRadius: 30,
    height: 45,
    width: 45,
    minWidth: 45,
    alignItems: "center",
    justifyContent: "center",
  }

});

import { StyleSheet } from "react-native";
import { colors, GlobalStyles } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  inventoryCategories: {
    padding: 5,
    borderRadius: 120,
    backgroundColor: colors.inventoryCategories,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5,
    height: 55,
    alignItems: "center",
    width: "100%",
    gap: 10,
  },

  containerInvetoryList: {
    flex: 1,
    paddingTop: 10,
  },

  header: {
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  headerProfileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "80%",
  },

  category: {
    width: "50%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    padding: 10,
  },

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
    position: "absolute",
    left: 25,
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
    fontSize: 18,
    fontFamily: "Montserrat_Bold",
    margin: 10,
  },

  headerProfile: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
    paddingBottom: 0,
  },

  buttonProfileHeader: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 35,
    width: 35,
  },

  cardTitle: {
    ...GlobalStyles.cardTitle,
    marginBottom: 10,
    marginTop: 10,
    flex: 1,
    textAlign: "left",
  },

  buttonSettings: {
    backgroundColor: colors.backgroundItem,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});

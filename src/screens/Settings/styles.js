import { StyleSheet } from "react-native";
import { colors, GlobalStyles } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  cardHeader : {
    ...GlobalStyles.cardHeader,
  },

  cardTilte: {
    ...GlobalStyles.cardTitle,
  },

  settingsContainer: {
    flexDirection: "column",
    gap: 12,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    flex: 1,
  },

  settingsItem: {
    marginBottom: 30,
  },

  settingsBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  label: {
    ...GlobalStyles.label,
    fontFamily: "Montserrat_Regular",
    color: colors.textDescription,
  },

  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    marginBottom: 10,
  },

  settingsButton: {
    ...GlobalStyles.menubarItem,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
  },

  hr: {
    ...GlobalStyles.hr,
    width: "100%",
    marginTop: 0,
    marginBottom: 20,
    paddingVertical : 5
  },
  
  banner: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: -10,
  },

  bannerText: {
    ...GlobalStyles.label,
    color: "#fff",
  },


});

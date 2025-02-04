import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    marginBottom: 10,
  },
});

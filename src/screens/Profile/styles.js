import { StyleSheet } from "react-native";
import { colors, GlobalStyles } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "column",
    gap: 12,
    padding: 16,
    borderRadius: 10,
    paddingTop: 30,
    backgroundColor: "#ffffff",
    flex: 1,
  },

  profileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  profileImage: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    margin: "auto",
    marginBottom: 20,
  },

  SignupBanner: {
    // height: "100%",
    // justifyContent: "center",
    // alignItems: "center",
  },

  hr: { ...GlobalStyles.hr, marginBottom: 10, paddingBottom: 10 },

  buttonLogout: {
    ...GlobalStyles.button,
    marginTop: 10,
    backgroundColor: colors.danger,
  },

  card: {
    ...GlobalStyles.card,
    backgroundColor: "#fff",
    borderRadius: 0,
    minHeight: "100%",
  },

  cardTitle: {
    ...GlobalStyles.cardTitle,
    marginTop: 0,
    flex: 1,
    textAlign: "center",
  },
});

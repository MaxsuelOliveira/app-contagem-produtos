import { StyleSheet } from "react-native";

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
    width: 80,
    height: 80,
    resizeMode: "contain",
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    margin: "auto",
    marginBottom: 20,
  },

  SignupBanner: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

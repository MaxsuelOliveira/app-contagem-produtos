import { StyleSheet } from "react-native";
import { colors } from "styles/GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
  },

  swiper: {
    flex: 1,
  },

  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    width: "100%",
    position: "relative",
    fontFamily: "Montserrat_Bold",
    fontSize: 28,
    color: colors.textPrimary,
    textAlign: "center",
  },

  description: {
    width: "100%",
    position: "relative",
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Montserrat_Medium",
  },

  button: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    height: 55,
    borderRadius: 50,
    alignItems: "center",
  },

  buttonText: {
    width: "100%",
    position: "relative",
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
  },
});

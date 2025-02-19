import { StyleSheet } from "react-native";
import { GlobalStyles, colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  message: {
    textAlign: "center",
    paddingBottom: 10,
  },

  camera: {
    flex: 1,
  },

  overlay: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 10,
  },

  scannedText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    justifyContent: "flex-end",
    width: "100%",
    paddingHorizontal: 20,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },

  centeredView: {
    padding: 20,
  },

  message: {
    ...GlobalStyles.label,
    fontSize: 18,
    marginBottom: 10,
  },

  buttonBack: {
    ...GlobalStyles.button,
    backgroundColor: "transparent",
  },

  buttonText: {
    ...GlobalStyles.buttonText,
    color: colors.textSecondary,
  }
});

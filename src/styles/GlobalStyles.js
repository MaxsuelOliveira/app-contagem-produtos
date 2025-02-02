import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const lightTheme = {
  primaryBackground: "#f8f9fa",
  textPrimary: "#212529",
  textSecondary: "#6c757d",
  buttonBackground: "#122238",
  inputBackground: "#ecebeb",
  borderColor: "#8887884e",
  menubarBackground: "#f3f2f2",
  menubarText: "#000000",
  textDescription: "#646363",
  colorIcons: "#878e94",
  modalCover: "rgba(18, 34, 56, 0.65)",
  backgroundItem: "#f3f3f3",
};

const darkTheme = {
  primaryBackground: "#212529",
  textPrimary: "#f8f9fa",
  textSecondary: "#adb5bd",
  buttonBackground: "#20334c",
  inputBackground: "#162940",
  borderColor: "#6c757d4e",
  menubarBackground: "#132237",
  menubarText: "#f8f9fa",
};

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.primaryBackground,
    paddingTop: 30,
  },

  textPrimary: {
    color: lightTheme.textPrimary,
    fontSize: RFPercentage(2.5),
    // fontSize : 16,
  },

  textSecondary: {
    color: lightTheme.textSecondary,
    fontSize: 14,
  },

  input: {
    backgroundColor: lightTheme.inputBackground,
    borderColor: "#f1f5f955",
    borderRadius: 5,
    color: lightTheme.textPrimary,
    fontFamily: "Montserrat_Regular",
    fontSize: 15,
    height: 48,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    marginBottom: 20,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  label: {
    fontFamily: "Montserrat_Regular",
    color: lightTheme.textSecondary,
    marginBottom: 5,
    fontSize: 14,
  },

  small: {
    fontFamily: "Montserrat_Regular",
    color: lightTheme.textDescription,
    marginBottom: 5,
    fontSize: 12,
  },

  value: {
    fontFamily: "Montserrat_Regular",
    color: lightTheme.textPrimary,
    // fontSize: 14,
    fontSize: RFPercentage(2.1),
  },

  button: {
    fontFamily: "Montserrat_Medium",
    fontSize: "16px",
    width: "100%",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#20334c",
    height: 50,
  },

  buttonText: {
    fontFamily: "Montserrat_Regular",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },

  badge: {
    marginLeft: 5,
    backgroundColor: "#ababab",
    borderRadius: 30,
    color: "#fff",
    width: 20,
    height: 20,
    lineHeight: 20,
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: lightTheme.modalCover,
  },

  modalContainer: {
    flex: 1,
  },

  modalContent: {
    height: "100%",
    width: "100%",
  },

  inventoryContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 20,
    elevation: 5,
    minHeight: "40vh",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_Regular",
    textAlign: "center",
    flex: 1,
  },

  cardBody: {
    marginTop: 10,
  },

  closeButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  closeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  menubar: {
    backgroundColor: lightTheme.menubarBackground,
    borderRadius: "20 20 0 0",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
  },

  menubarItem: {
    alignItems: "center",
    minWidth: RFPercentage(12),
  },

  menubarText: {
    textAlign: "center",
    color: lightTheme.menubarText,
    fontFamily: "Montserrat_Regular",
    fontSize: 10,
  },
});

export { GlobalStyles, lightTheme, darkTheme };

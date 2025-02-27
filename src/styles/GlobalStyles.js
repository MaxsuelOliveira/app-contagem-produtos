import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

const theme = (darkMode) => {
  if (darkMode) {
    return {
      primary: "#0d6efd",
      danger: "#dc3545",
      warrning: "#ffc107",

      primaryTextEmphasis: "#a1c8ff",
      secondaryTextEmphasis: "#adb5bd",
      successTextEmphasis: "#198754",
      infoTextEmphasis: "#0dcaf0",
      warningTextEmphasis: "#ffc107",
      dangerTextEmphasis: "#dc3545",
      lightTextEmphasis: "#ced4da",
      darkTextEmphasis: "#f8f9fa",
      primaryBgSubtle: "#031b42",
      secondaryBgSubtle: "#1c1e21",
      successBgSubtle: "#0a3622",
      inputBorderColor: "#495057",
      inputBackground: "#212529",
      inputColor: "#f8f9fa",
      cardBackground: "#2b2f32",
      primaryBackground: "#121212",
      textPrimary: "#f8f9fa",
      textSecondary: "#adb5bd",
      buttonBackground: "#0d6efd",
      borderColor: "#343a40",
      menubarBackground: "#1e1e1e",
      menubarText: "#ffffff",
      textDescription: "#868e96",
      colorIcons: "#adb5bd",
      modalCover: "rgba(18, 34, 56, 0.85)",
      backgroundItem: "#292b2c",
      inventoryCategories: "#1e1e1e",
    };
  }

  return {
    primary: "#0d6efd",
    primaryTextEmphasis: "#052c65",
    secondaryTextEmphasis: "#2b2f32",
    successTextEmphasis: "#0a3622",
    infoTextEmphasis: "#055160",
    warningTextEmphasis: "#664d03",
    dangerTextEmphasis: "#58151c",
    lightTextEmphasis: "#495057",
    darkTextEmphasis: "#495057",
    primaryBgSubtle: "#cfe2ff",
    secondaryBgSubtle: "#e2e3e5",
    successBgSubtle: "#d1e7dd",

    inputBorderColor: "#f3f2f2",
    inputBackground: "#f3f2f2",
    inputColor: "#212529",
    cardBackground: "#f8f9fa",
    primaryBackground: "#f8f9fa",
    textPrimary: "#212529",
    textSecondary: "#6c757d",
    // buttonBackground: "#122238",
    buttonBackground: "#0d6efd",
    borderColor: "#f8f9fa",
    menubarBackground: "#f3f2f2",
    menubarText: "#000000",
    textDescription: "#646363",
    colorIcons: "#adb5bd",
    modalCover: "rgba(18, 34, 56, 0.65)",
    backgroundItem: "#ecebeb",
    danger: "#dc3545",
    warrning: "#ffc107",
  };
};

// const darkMode = (await AsyncStorage.getItem("darkMode")) || false;
// const colors = theme(darkMode);
const colors = theme(false);

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    paddingTop: 30,
  },

  textPrimary: {
    color: colors.textPrimary,
    fontSize: RFPercentage(2.5),
  },

  textSecondary: {
    color: colors.textSecondary,
    fontSize: 14,
  },

  input: {
    backgroundColor: colors.inputBackground,
    borderColor: colors.inputBackground,
    borderWidth: 0.3,
    borderRadius: 5,
    color: colors.inputColor,
    fontFamily: "Montserrat_Medium",
    fontSize: 16,
    height: 48,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 3,
  },

  textArea: {
    height: 70,
    textAlignVertical: "top",
    paddingLeft: 8,
    paddingTop: 3,
  },

  label: {
    fontFamily: "Montserrat_Bold",
    color: colors.textPrimary,
    marginBottom: 3,
    fontSize: 14,
  },

  labelError: {
    fontFamily: "Montserrat_Medium",
    color: colors.textDescription,
    marginBottom: 3,
    fontSize: 14,
  },

  small: {
    fontFamily: "Montserrat_Medium",
    color: colors.textDescription,
    marginBottom: 5,
    fontSize: 12,
  },

  value: {
    fontFamily: "Montserrat_Medium",
    color: colors.textPrimary,
    fontSize: 13,
  },

  button: {
    fontFamily: "Montserrat_Medium",
    fontSize: "16px",
    width: "100%",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.buttonBackground,
    minHeight: 55,
  },

  buttonText: {
    position: "relative",
    width: "100%",
    fontFamily: "Montserrat_Medium",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },

  badge: {
    fontFamily: "Montserrat_Bold",
    backgroundColor: "#ababab",
    borderRadius: 5,
    color: "#fff",
    width: 20,
    height: 20,
    textAlign: "center",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.modalCover,
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

  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    margin: 10,
  },

  card: {
    backgroundColor: colors.cardBackground,
    padding: 20,
    elevation: 5,
    minHeight: 300,
    borderRadius: 20,
    width: "100%",
    gap: 10,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_Bold",
    textAlign: "center",
    flex: 1,
    color: colors.textPrimary,
    marginTop: 20,
    position: "relative",
  },

  cardBody: {
    marginTop: 10,
  },

  cardFooter: {},

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
    backgroundColor: colors.menubarBackground,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    position: "relative",
    left: 0,
    right: 0,
    margin: 10,
  },

  menubarItem: {
    alignItems: "center",
    minWidth: RFPercentage(12),
    padding: 5,
  },

  menubarText: {
    textAlign: "center",
    color: colors.menubarText,
    fontFamily: "Montserrat_Medium",
    fontSize: 10,
    position: "relative",
    zIndex: 1,
    width: "100%",
  },

  link: {
    fontFamily: "Montserrat_Medium",
    color: colors.primary,
    fontSize: 14,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.3,
    marginTop: 5,
  },

  separator: {
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    margin: 10,
  },

  textSeparator: {
    fontFamily: "Montserrat_Medium",
    fontSize: RFValue(14),
    color: colors.textSecondary,
  },

  hr: {
    borderBottomWidth: 1,
    borderColor: colors.borderColor,
    borderType: "solid",
    width: "100%",
  },

  btnHeader: {
    width: 40,
    height: 40,
    backgroundColor: colors.primaryBackground,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export { GlobalStyles, colors };

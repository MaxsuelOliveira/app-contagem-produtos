import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const theme = (options) => {
  if (options) {
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
      borderColor: "#212529",
      menubarBackground: "#f3f2f2",
      menubarText: "#000000",
      textDescription: "#646363",
      colorIcons: "#878e94",
      modalCover: "rgba(18, 34, 56, 0.65)",
      backgroundItem: "#ecebeb",
      danger: "#dc3545",
      warrning: "#ffc107",
    };
  } else {
    return {
      primary: "#0d6efd",
      inputBorderColor: "#ffffff",
      inputBackground: "transparent",
      inputColor: "#f8f9fa",
      cardBackground: "#19273a",
      primaryBackground: "#122238",
      textPrimary: "#ffffff",
      textSecondary: "#adb5bd",
      buttonBackground: "#0b5ed7",
      inputBackground: "#162940",
      borderColor: "#6c757d4e",
      menubarBackground: "#132237",
      menubarText: "#f8f9fa",
      textDescription: "#646363",
      colorIcons: "#878e94",
      modalCover: "rgba(18, 34, 56, 0.65)",
      backgroundItem: "rgb(12 22 35)",
      danger: "#dc3545",
      warrning: "#ffc107",
    };
  }
};

const colors = theme(true);

const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackground,
    paddingTop: 30,
  },

  textPrimary: {
    color: colors.textPrimary,
    fontSize: RFPercentage(2.5),
    // fontSize : 16,
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
    fontSize: 14,
    height: 48,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 3,
  },

  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingLeft: 8,
    paddingTop: 3,
  },

  label: {
    fontFamily: "Montserrat_SemiBold",
    color: colors.textSecondary,
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
    fontFamily: "Montserrat_Medium",
    color: "#fff",
    textAlign: "center",
    fontSize: 14,
  },

  badge: {
    fontFamily: "Montserrat_Bold",
    backgroundColor: "#ababab",
    borderRadius: 7,
    color: "#fff",
    width: 20,
    height: 20,
    textAlign: "center",
    position: "absolute",
    right: 10,
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

  card: {
    backgroundColor: colors.cardBackground,
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
    fontFamily: "Montserrat_Medium",
    textAlign: "center",
    flex: 1,
    color: colors.textPrimary,
    marginTop: 20,
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
    backgroundColor: colors.menubarBackground,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    position: "relative",
    left: 0,
    right: 0,
    margin: 10,
  },

  menubarItem: {
    alignItems: "center",
    minWidth: RFPercentage(12),
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


  link : {
    fontFamily: "Montserrat_Medium",
    color: colors.primary,
    fontSize: 14,
    borderBottomColor: colors.primary,
    borderBottomWidth: 0.3,
    marginLeft: 10,
    marginTop: 5,
  }
});

export { GlobalStyles, colors };

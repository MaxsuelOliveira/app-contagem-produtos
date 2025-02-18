import { StyleSheet } from "react-native";
import { GlobalStyles , colors } from "@styles/GlobalStyles";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardHeader: {
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 15,
    padding: 20,
    paddingBottom: 0,
  },

  cardBody: {
    marginTop: 0,
    padding: 10,
    paddingTop: 0,
    paddingBottom: 0,
  },

  btnClose: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  btnCloseText: {
    fontSize: 18,
    color: "#333",
  },

  cardTitle: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Montserrat_Bold",
    marginBottom :  5
  },

  cardDescription: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
    fontFamily: "Montserrat_Regular",
  },

  createInventarioInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginBottom : 10
  },

  createInventarioInfoItem: {
    flexDirection: "column",
    marginBottom: 8,
  },

  badge: {
    backgroundColor: "#007bff",
    color: "#fff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },

  menubar: {
    backgroundColor: "transparent",
  },

  menubarItemButton: {
    backgroundColor: "black",
    width: 70,
    height: 70,
    padding: "10",
    borderRadius: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  itemProduto: {
    flexDirection: "row",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  icon: {
    width: 30,
    height: 30,
  },

  itemInventarioDescription: {
    marginLeft: 12,
    flex: 1,
  },

  flexColumn: {
    marginBottom: 8,
  },

  itemDescriptionTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },

  itemInventarioDetails: {
    flexDirection: "row",
    gap: 16,
  },

  inventarioContainerItem: {
    flex: 1,
  },

  textBreak: {
    flexWrap: "wrap",
  },

  label: { ...GlobalStyles.label, fontSize: 12 },
  value: { ...GlobalStyles.value, fontSize: 14 },
  menuText: { ...GlobalStyles.menubarText, fontSize: 10 },

  title : {
    fontFamily: "Montserrat_Bold",
    fontSize: 18,
    color: "#333",
  },

  scrollView: {
    flexDirection: "row",
  },

  noProducts : {
    padding: 10,
  },

  noProductsText: {
    fontSize: 16,
    fontFamily: "Montserrat_Medium",
    color: "#333"
  },

  input: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 4,
    padding: 10,
    height: 40,
    borderRadius: 20,
    fontFamily: "Montserrat_Regular",
    fontSize: 14,
    color: "#333",
    width: "85%",
  },

  inputActive : {
    display: "flex",
  },

  buttonSearch : {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: 15,
  }

});

import { StyleSheet } from "react-native";
import { GlobalStyles } from "../../../styles/GlobalStyles";

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
    padding: 20,
    paddingBottom: 0,
    marginTop: 30,
    justifyContent: "center",
    alignContent: "center",
    display: "flex",
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
  },

  cardDescription: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
    fontFamily: "Montserrat_Regular",
  },

  createInventarioInfo: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
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
  }

});

import BarcodeScannerModal from "../../../utils/BarcodeScannerModal";

function App(params) {
  const [barcode, setBarcode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Text>{barcode}</Text>
      <Button
        title="Escanear Código de Barras"
        onPress={() => setModalVisible(true)}
      />

      <BarcodeScannerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onScan={(code) => setBarcode(code)}
      />
    </View>
  );
}

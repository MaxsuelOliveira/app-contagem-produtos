import { useState } from "react";
import { CameraView, useCameraPermissions } from "expo-camera";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ActivityIndicator,
} from "react-native";

// Styles
import { styles } from "./Styles";

// Icons
import { AntDesign } from "@expo/vector-icons";
import { GlobalStyles } from "@styles/GlobalStyles";

export default function ProductCaputeCodebarModal({
  isVisible,
  onClose,
  onBarcodeScanned,
}) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleBarcodeScanned({ data }) {
    setScannedData(data);
    onBarcodeScanned(data);
    setTimeout(() => {
      onClose();
      // onBarcodeScanned("");
    }, 500);
  }

  return (
    <Modal visible={isVisible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {!permission && (
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.message}>Carregando permissão...</Text>
          </View>
        )}

        {permission && !permission.granted && (
          <View style={styles.centeredView}>
            <Text style={styles.message}>
              Para continuar, precisamos da sua permissão para acessar a câmera.
            </Text>
            <TouchableOpacity
              style={GlobalStyles.button}
              onPress={requestPermission}
            >
              <Text style={GlobalStyles.buttonText}>Conceder permissão</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonBack} onPress={onClose}>
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        )}

        {permission?.granted && (
          <CameraView
            style={styles.camera}
            facing={facing}
            barcodeScannerSettings={{
              barcodeTypes: [
                "ean13",
                "ean8",
                "upc_a",
                "upc_e",
                "code39",
                "code93",
                "code128",
                "itf",
                "codabar",
                "qr",
                "datamatrix",
                "pdf417",
              ],
            }}
            onBarcodeScanned={handleBarcodeScanned}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={onClose}>
                <AntDesign name="close" size={30} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Trocar Câmera</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.overlay}>
              {scannedData ? (
                <Text style={styles.scannedText}>Código: {scannedData}</Text>
              ) : (
                <Text style={styles.scanMessage}>
                  Aponte para um código de barras
                </Text>
              )}
            </View>
          </CameraView>
        )}
      </View>
    </Modal>
  );
}

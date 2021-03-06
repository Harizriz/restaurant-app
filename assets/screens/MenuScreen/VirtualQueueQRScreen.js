import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import settings from "../../../settings";

export default function VirtualQueueQRScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [tableId, setTableId] = useState(null)
  const pax = route.params.pax
  const queueNumber = route.params.queueNumber

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setTableId(data);
    setScanned(true);
    if (data == 'aqFl0LxbRN') {
      try {
        let response = await fetch(
          settings.ipAddress+'/api/virtualQueue', 
          {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pax: pax,
                virtualQueueNumber: queueNumber
            })
          }
        );
        let json = await response.json();
        console.log(json); 

        Alert.alert(json.msg, "",
        { text: "Okay", onPress: () => console.log("Successful") });

        navigation.navigate("MainMenuScreen",
          { IsScreenQR: true, 
            params: { queueNumber: queueNumber }, 
            screen: "Virtual Queue",
          })

      } catch (error) {
          console.error(error);
      }

    }
    else {
      Alert.alert("Wrong QR Code", "",
      { text: "Okay", onPress: () => console.log("Successful") });
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
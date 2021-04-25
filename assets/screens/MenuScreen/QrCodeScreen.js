import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert, StatusBar } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

export default function QrCodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [tableId, setTableId] = useState(null)
  // const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setTableId(data);
    setScanned(true);
    // alert(`${data}`);
    // navigation.navigate("MainMenuScreen", { screen: "Menu", params: {tableId: data} })

    try {
      let response = await fetch(
        `http://172.20.10.5:5000/api/tables/status/${encodeURI(data)}`, 
        {
          method: 'PUT',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              tableId: data,
              occupyStatus: true
          })
        }
      );
      let json = await response.json();
      console.log(json); 

      Alert.alert("Table " + data, "")
      navigation.navigate("MainMenuScreen", { screen: "Menu", option: "update", params: {tableId: data, screenName: "QrCodeScreen"}})

    } catch (error) {
        console.error(error);
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
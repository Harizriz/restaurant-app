import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
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
    Alert.alert("Table " + data, "")
    // navigation.navigate("MainMenuScreen", { screen: "Menu", params: {tableId: data} })
    navigation.navigate("CartScreen", {tableId: data, screenName: "QrCodeScreen"})

    // try {
    //   let response = await fetch(
    //     'http://172.20.10.5:5000/api/orders/tableId', 
    //     {
    //       method: 'POST',
    //       headers: {
    //           Accept: 'application/json',
    //           'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({
    //           tableId: data
    //       })
    //     }
    //   );
    //   let json = await response.json();
    //   console.log(json); 

    //   // Alert.alert(json.msg, "",
    //   // { text: "Okay", onPress: () => console.log("Successful") });

    //   // this.props.navigation.goBack();

    // } catch (error) {
    //     console.error(error);
    // }
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
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
  },
  headingContainer: {
    height: 100,
    // backgroundColor: "yellow",
  },
  headingText: {
    fontSize: 35,
    color: "purple",
    top: 50,
    alignSelf: "center"
  },
});
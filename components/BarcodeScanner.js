import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarcodeScanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
const manualEntry = () =>{
    navigation.navigate('Details', {itemData: {name: '', category: '', date: ''}})
}
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const apiKey = '297b3qub6i91ek5lgcagn0yvqmbkbg';
    const uri = 'https://api.barcodelookup.com/v3/products?barcode='+data+'&formatted=y&key='+apiKey;
    fetch(uri).then(res => res.json()).then(data => {
        navigation.navigate('Details', {itemData: {
                name: data.products[0].title,
                category: '',
                date: ''
        }});
        //setScanned(false);
    }).catch(error => {
        console.log('Barcode API error: LIMIT EXCEEDED');
        console.log(error);
        console.log('URI: ', uri);
    });
    
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);

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
       <View style={styles.footerContainer}>
        <Button title={"Enter details manually"} onPress={manualEntry} />
      </View>
      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
  });
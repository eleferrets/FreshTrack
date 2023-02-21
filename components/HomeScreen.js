import { Text, View, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
export default function HomeScreen({ route, navigation }) {
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 50,
        },
        item: {
          padding: 20,
          fontSize: 15,
          marginTop: 5,
        }
      });
      const getAllKeys = async () => {
        let keys = []
        try {
          keys = await AsyncStorage.getAllKeys()
        } catch(e) {
          // read key error
        }
      
        console.log(keys);
        keys.map( async (key) => {
                let object = await getMyObject(key);
                console.log(object)
                data.push(object);
        })
        // example console.log result:
        // ['@MyApp_user', '@MyApp_key']
      }
      const getMyObject = async (key) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key)
          return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
          // read error
        }
      
        console.log('Done.')
      }
      const [data, setData] = useState(null);

      // Function to load all objects from local storage
      const loadAllObjects = async () => {
        try {
          const keys = await AsyncStorage.getAllKeys();
          const objects = await AsyncStorage.multiGet(keys);
          return objects.map(([, value]) => (JSON.parse(value) ));
        } catch (error) {
          console.error('Error loading objects: ', error);
          return null;
        }
      };
      useEffect(() => {
        const loadObjects = async () => {
        const data = await loadAllObjects();
        setData(data);
        };
        loadObjects();
      }, []);

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { data == null && <Text>Nothing here yet!</Text>}
        {data != null && data.map((person) => {
        return (
          <View>
            <Text style={styles.item} key={person.date}>{person.name}</Text>
          </View>
        );
      })}
      
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
        <Button
          title="Go to Barcode"
          onPress={() => navigation.navigate('Barcode')}
        />
      </View>
    );
  }
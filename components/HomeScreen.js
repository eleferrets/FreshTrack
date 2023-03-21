import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";

const Item = props => {
    return(
        <View>
            <Text>{props.name}</Text>
        </View>
    );
};

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@food_data')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        // error reading value
    }
}

export default function HomeScreen({ route, navigation }) {
    const [foodData, setFoodData] = useState([{category: "", date: "", name: "Nothing"}]);

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
      const data = [];
      if (route.params) {
        // const {name} = route.params;
        //console.log(route.params)
          // {"category": "sjjd", "date": "", "name": "shhd"}
        data.push(route.params);
        //console.log(data);
      }

      getData().then(value => {setFoodData(value)});

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { foodData.length == 0 && <Text>Nothing here yet!</Text>}
        {foodData.length > 0 && foodData.map((person) => {
        return (
          <View key={person.name}>
            <Text style={styles.item} key={person.name}>{person.name}</Text>
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
          <Button title={"Clear storage"}
          onPress={() => AsyncStorage.clear()}/>
      </View>
    );
  }
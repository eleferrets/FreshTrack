import { Text, View, Button, StyleSheet } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";
import {Entypo} from "@expo/vector-icons";

const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@food_data', jsonValue)
    } catch (e) {
        console.log('Failed to save data')
    }
}
const deleteItem = async (id) => {
    getData().then(data => {
        data.splice(id, 1);
        storeData(data);
    });
}

const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@food_data')
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
        // error reading value
    }
}

const Item = props => {
    return(
        <View>
            <Text>
                <Text>{props.name}</Text>
                <Entypo name="edit" size={24} color="black" onPress={() => getData().then(data => props.nav.navigate('Edit', {itemID: props.id, itemData: data[props.id]}))}/>
                <Entypo name="trash" size={24} color="black" onPress={() => {deleteItem(props.id)}}/>
            </Text>
        </View>
    );
};

export default function HomeScreen({ route, navigation }) {
    const [foodData, setFoodData] = useState([{category: "", date: "", name: ""}]);

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

    getData().then(value => {setFoodData(value)});

    const getItems = () => {
        let arr = [];
        for (let i = 0; i < foodData.length; i ++) {
            arr.push(<Item nav={navigation} id={i} key={i} name={foodData[i].name} category={foodData[i].category} date={foodData[i].date}/>);
        }
        return arr;
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {getItems()}
      
        <Button
          title="Add new"
          onPress={() => navigation.navigate('Details', {itemData: {name: '', category: '', date: ''}})}
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

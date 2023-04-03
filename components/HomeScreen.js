import { Text, View, Button, StyleSheet, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useState} from "react";
import {Entypo} from "@expo/vector-icons";
import logo from './banner_logo.png';

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

const getFormattedDate = date => {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return month + '/' + day + '/' + year;
}

const Item = props => {
    return(
        <View>
            <Text style={{fontSize: 20, fontFamily: "Verdana"}}>{props.name} - {getFormattedDate(new Date(props.date))}</Text>
            <Text style={{right:0}}>
                <Entypo name="edit" size={24} color="#759E58" onPress={() => getData().then(data => props.nav.navigate('Edit', {itemID: props.id, itemData: data[props.id]}))}/>
                <Entypo name="trash" size={24} color="black" onPress={() => {deleteItem(props.id)}}/>
            </Text>
            <Text></Text>
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
          fontSize: 25,
          marginTop: 5,
        }
      });

    getData().then(value => {
        for (let i = 0; i < value.length; i ++) {
            value[i].id = i;
        }
        value.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        setFoodData(value);
    });

    const getItems = () => {
        let arr = [];
        for (let i = 0; i < foodData.length; i ++) {
            arr.push(<Item nav={navigation} id={foodData[i].id} key={i} name={foodData[i].name} category={foodData[i].category} date={foodData[i].date}/>);
        }
        return arr;
    };

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0 }}>
        <View>
            <Image source={logo} alt="Logo" style={{maxWidth:415, maxHeight:125, top: 0}} />
        </View>

        <View style={{position: 'absolute', top: 150}}>
            {getItems()}
      
        <Button
            title="Add New Item"
            onPress={() => navigation.navigate('Details', {itemData: {name: '', category: '', date: ''}})}
            />
            <Button
            title="Scan a Barcode"
            onPress={() => navigation.navigate('Barcode')}
            />
            <Button title={"Clear List"}
            onPress={() => AsyncStorage.clear()}/>
      </View>
       
      </View>
    );
  }

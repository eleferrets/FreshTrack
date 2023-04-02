import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Input} from 'react-native-elements'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Text, Platform, DatePickerIOS, DatePickerAndroid } from 'react-native';

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@food_data')
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch(e) {
    // error reading value
  }
}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@food_data', jsonValue)
  } catch (e) {
    console.log('Failed to save data')
  }
}

export default function DetailsScreen({route, navigation}) {
  // const {itemData} = route.params;
  const itemData = {name: "H", category: "U"};
  
  const [name, setName] = useState(itemData.name);
  const [category, setCategory] = useState(itemData.category)
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date: date,
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          const selectedDate = new Date(year, month, day);
          setDate(selectedDate);
        }
      } catch ({ code, message }) {
        console.warn('Cannot open date picker', message);
      }
    } else if (Platform.OS === 'ios') {
      // For iOS, use the DatePickerIOS component
      return (
        <DatePickerIOS
          date={date}
          onDateChange={(newDate) => setDate(newDate)}
        />
      );
    }
  };

  const register = () => {
    getData().then(value => {
      let arr = value;
      arr.push({
            name: name,
            category: category,
            date: date.toString()
      });
      //console.log(arr);

      storeData(arr).then(() => {
          navigation.navigate('Home');
      });
    });
  }
  const styles = StyleSheet.create({
    datePickerStyle: {
      width: 230,
    },
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Input placeholder="Name" value={name} onChangeText={(text) =>setName(text)}/>
      <Input placeholder="Category" value={category} onChangeText={(text) =>setCategory(text)}/>
      {/* Add a profile option as a dropdown of all the profiles added */}
        {/* <Button title="Show Dates" onPress={showDatePicker} /> */}
      <Button title="Select Date" onPress={showDatePicker} />
      <Text>{date.toLocaleDateString()}</Text>
      <Button title="Save" onPress={register}/>
    </View>
  );
}
import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Input} from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DetailsScreen({navigation}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };
  const register = () => {
    const dateString = date.toString();
    const entryObject = {
      name: name,
      category: category,
      date: dateString
    }
    let keyName = name+dateString;
    setObjectValue(keyName, entryObject);
    navigation.navigate('Home', entryObject);
  }
  const setObjectValue = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
    } catch(e) {
      // save error
    }
  
    console.log('Done.')
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
        <Button title="Show Dates" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Confirm" onPress={register}/>
    </View>
  );
}
import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Input} from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        <Button title="Show Dates" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Button title="Save" onPress={register}/>
    </View>
  );
}
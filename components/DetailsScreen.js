import { useState } from 'react';
import {Text, View, StyleSheet, Button, Image } from 'react-native';
import {Input} from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import {useFoodData} from './useFoodData';
import logo from './banner_logo.png';

export default function DetailsScreen({route, navigation}) {
  let {itemData} = route.params;  
  if (!itemData) itemData = {name: '', category: '', date: ''};
  const [name, setName] = useState(itemData.name);
  const [category, setCategory] = useState(itemData.category)

  const {date, setDate, showDatePicker, setShowDatePicker, onDateChange, showPicker, getData, storeData} = useFoodData();

  const register = () => {
    getData().then(value => {
      let arr = value;
      if (name === "" || category === "") {
        throw new Error("Name and category cannot be empty");
      }
      arr.push({
            name: name,
            category: category,
            date: date.toString()
      });
      //console.log(arr);

      storeData(arr).then(() => {
          navigation.navigate('Home');
      });
    }).catch(error => {
      console.log(error.message);
    });
  }
  const styles = StyleSheet.create({
    datePickerStyle: {
      width: 230,
    },
  });
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', position: "absolute", top: 0 }}>
       <View>
            <Image source={logo} alt="Logo" style={{maxWidth:415, maxHeight:125, top: 0}} />
        </View>
      <Input placeholder="Item Name" value={name} onChangeText={(text) =>setName(text)}/>
      <Input placeholder="Kitchen Location" value={category} onChangeText={(text) =>setCategory(text)}/>
      {/* Add a profile option as a dropdown of all the profiles added */}
        {/* <Button title="Show Dates" onPress={showDatePicker} /> */}
        <Button title="Select Expiration Date" onPress={showPicker} />
        {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <Text>{date.toLocaleDateString()}</Text>
      <Button title="Save" onPress={register}/>
    </View>
  );
}
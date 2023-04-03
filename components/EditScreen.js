import { useState, useEffect } from 'react';
import {Text, View, StyleSheet, Button } from 'react-native';
import {Input} from 'react-native-elements'
import {useFoodData} from './useFoodData';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function EditScreen({route, navigation}) {
    const {itemID, itemData} = route.params;
    const [name, setName] = useState(itemData.name);
    const [category, setCategory] = useState(itemData.category)

    const {date, setDate, showDatePicker, setShowDatePicker, onDateChange, showPicker, getData, storeData} = useFoodData();
    useEffect(() => {
        setDate(new Date(itemData.date))
      }, []);
    const register = () => {
        getData().then(value => {
            let arr = value;
            arr[itemID] = {
                name: name,
                category: category,
                date: date.toString()
            };

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
        <Button title="Select Date" onPress={showPicker} />
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
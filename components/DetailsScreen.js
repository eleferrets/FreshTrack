import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import {Input} from 'react-native-elements'
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
    navigation.navigate('Home', {
      name: name,
      category: category,
      date: date
    })
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
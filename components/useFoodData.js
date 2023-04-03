import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFoodData = () => {
  const [foodData, setFoodData] = useState([]);

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
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showPicker = () => {
    setShowDatePicker(true);
  };


  return { date, setDate, showDatePicker, setShowDatePicker, onDateChange, showPicker, getData, storeData };
};

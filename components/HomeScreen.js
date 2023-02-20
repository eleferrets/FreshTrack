import { Text, View, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ route, navigation }) {
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
        // console.log(route.params)
        data.push(route.params);
      }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { data.length == 0 && <Text>Nothing here yet!</Text>}
        {data.length > 0 && data.map((person) => {
        return (
          <View>
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
      </View>
    );
  }
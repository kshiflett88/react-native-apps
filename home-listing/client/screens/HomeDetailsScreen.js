import React, {useEffect} from 'react'; 
import { StyleSheet, View, Text, ScrollView, Image, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as houseAction from '../redux/actions/houseAction';

const HomeDetailsScreen = props => {

  
  const dispatch = useDispatch();

  const {houseId} = props.route.params 
  const house = useSelector(state => state.house.houses.find(house => house._id == houseId))
  
  useEffect(() => {
  }, [])

  const removeHouse = (id) => {
    console.log(id)
    dispatch(houseAction.removeHome(id))
      .then(() => {
        Alert.alert('Removed Successfully')
      })
      .catch(() => {
        Alert.alert('An error occurred', [{text: 'Ok'}])
      })
      props.navigation.navigate('HomeList')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{house.title}</Text>
        </View>
        <View>
          <Image style={styles.image} source={{uri: house.image}} />
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Home Type: </Text>
          <Text style={styles.value}>{house.homeType}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Price: </Text>
          <Text style={styles.value}>{house.price}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Year Built: </Text>
          <Text style={styles.value}>{house.yearBuilt}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Adress: </Text>
          <Text style={styles.value}>{house.address}</Text>
        </View>
        <View style={styles.group}>
          <Text style={styles.label}>Description: </Text>
          <Text style={styles.value}>{house.description}</Text>
        </View>
      </View>
        <View style={styles.buttonContainer}>
          <Button title="Remove Home" onPress={() => removeHouse(house._id)} />
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20
  },
  heading: {
    marginHorizontal: 20,
    marginBottom: 10
  },
  title: {
    fontSize: 24
  },
  image: {
    width: '100%',
    height: 200
  },
  group: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row'
  },
  label: {
    fontSize: 18
  },
  value: {
    fontSize: 18, 
    fontWeight: 'bold',
    flexShrink: 1 
  },
  buttonContainer: {
    marginTop: 20
  }
});

export default HomeDetailsScreen;
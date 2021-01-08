import React, { useEffect, useState } from 'react'; 
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { FloatingAction } from 'react-native-floating-action'
import { set } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../components/Card';
import * as houseAction from '../redux/actions/houseAction';

const HomeListingScreen = props => {

  const dispatch = useDispatch();
  const {houses} = useSelector(state => state.house);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(houseAction.fetchHouses())
    .then(() => setIsLoading(false))
    .catch(() => setIsLoading(false))
  }, [dispatch])
  
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (houses.length === 0 && !isLoading) {
    return (
      <View style={styles.centered}>
        <Text>No home found. You can add one!</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={houses}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <Card 
            navigation={props.navigation}
            title={item.title}
            address={item.address}
            homeType={item.homeType}
            image={item.image}
            price={item.price}
            description={item.description}
            yearBuilt={item.yearBuilt}
            id={item._id}
          />
        )}
      />
      <FloatingAction 
        position="right"
        onPressMain={() => props.navigation.navigate('AddHome')}
        animated={false}
        showBackground={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HomeListingScreen;
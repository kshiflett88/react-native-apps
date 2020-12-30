import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
const Card = props => {
  
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('NewsDetails')}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image 
            source={require('../../assets/native-woman.jpg')} 
            // source={{uri: 'https://lh3.googleusercontent.com/proxy/ZTZXN3kueDPuPve_fEcOEHfT80ohRR8QbyYANHtsxEA8mZiVgH0mqYINw74eNrxGmPOg0HSJZ2em7U16Ptxqi7SLaz85X9QeQalfBDHt5P0nNf3FS3KitHsVTslBnQWqo0Xc-QHYCsVHwLDR0CguzLDIvzChpO7a-uxI7yCP3Fggux9xOPXV_W6FRGFjgw'}}
            style={styles.image}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Dummy title</Text>
          <MaterialIcons name='favorite-border' color='#72bcd4' size={24} />
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Dummy Description</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    height: 300,
    margin: 20,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5
  },
  imageWrapper: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  titleWrapper: {
    height: '10%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  descriptionWrapper: {
    paddingHorizontal: 15
  },
  image: {
    height: '100%',
    width: '100%'
  },
  title: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
  },
  description: {
    fontFamily: 'Ubuntu',
    marginTop: 10

  }
})

export default Card
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux';
import * as newsAction from '../redux/actions/newsAction';

const Card = props => {
  
  const dispatch = useDispatch();
  const isFav = useSelector(state => state.news.favorites.some(article => article.url === props.url));

  return (
    <TouchableOpacity onPress={() => {
      props.navigation.navigate('NewsDetails', {
        articleUrl: props.url
      })
    }}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <Image 
            // source={require('../../assets/native-woman.jpg')} 
            source={{uri: props.image ? props.image : '../../assets/native-woman.jpg'}}
            style={styles.image}
          />
        </View>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {props.title && props.title.length > 22 ? props.title.slice(0, 22) + '...' : props.title}
          </Text>
          <MaterialIcons 
            name={isFav ? 'favorite' : 'favorite-border'} 
            color='#72bcd4' 
            size={24} 
            onPress={() => {
              dispatch(newsAction.toggleFavorites(props.url))
            }}
          />
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>
            {props.description && props.description.length > 100 ? props.description.slice(0, 100) + '...' : props.description}
          </Text>
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
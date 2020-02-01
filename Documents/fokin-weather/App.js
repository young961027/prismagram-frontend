import React from 'react';
import Loading from './Loading';
import {Alert} from 'react-native';
import * as Location from 'expo-location';


export default class extends React.Component {
  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      console.log(response);
      const { coords } = await Location.getCurrentPositionAsync();
      console.log(coords.latitude, coords.longitude);
    } catch(error) {
      Alert.alert("Can't find you", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
   return <Loading />;
  }
}
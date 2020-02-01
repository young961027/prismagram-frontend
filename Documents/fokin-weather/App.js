import React from 'react';
import Loading from './Loading';
import {Alert} from 'react-native';
import * as Location from 'expo-location';


export default class extends React.Component {
  state = {
    isLoading: true
  };
  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude} 
      } = await Location.getCurrentPositionAsync();
      //Send to API and get weather
    } catch(error) {
      Alert.alert("Can't find you", "So sad");
    }
  };
  componentDidMount() {
    this.getLocation();
  }
  render() {
   const { isLoading } = this.state;
   return isLoading ? <Loading /> : null;
  }
}
import React from 'react';
import Loading from './Loading';
import {Alert} from 'react-native';
import * as Location from 'expo-location';
import axios from "axios";

const API_KEY = "39543f76e029ae39ad2b20f072bbe7a5"


export default class extends React.Component {
  state = {
    isLoading: true
  };
  getWeather = async (latitude,longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
  };
  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude} 
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
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
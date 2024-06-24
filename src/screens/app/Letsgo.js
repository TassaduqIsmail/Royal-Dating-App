import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import { saveProfileData } from './Components/saveProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Users from "../../fakedata/users.json";

// import Button1 from '../components/Button1';
const Letsgo = ({navigation}) => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  // const onChange = () => {
  //     setDimension(Dimensions.get('window'));
  // };

  // useEffect(() => {
  //     Dimensions.addEventListener('change', onChange);
  //     return () => {
  //         //   Dimensions.removeEventListener('change', onChange);
  //     };
  // });

 
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['rgba(229, 58, 150, 20)', '#ff0096']}
        style={styles.container}>
        <ImageBackground
          resizeMode={'cover'}
          source={require('../../assets/Images/splash.png')}
          style={styles.background}>
          <View
            style={{
              height: dimension.height * 0.9,
              justifyContent: 'space-between',
              paddingTop: dimension.height * 0.1,
            }}>
            <Image
              resizeMode={'contain'}
              source={require('../../assets/Images/avatar1.jpg')}
              style={{
                alignSelf: 'center',

                width: dimension.width * 0.6,
                height: dimension.width * 0.6,
                borderRadius: 300,
                borderColor: 'white',
                borderWidth: 5,
              }}
            />
            <Text
              style={{
                alignSelf: 'center',
                color: 'white',
                fontSize: 30,
              }}>
              Great!
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                color: 'white',
                width: dimension.width * 0.7,
                fontSize: 18,
              }}>
              "You've got an amazing story now you are in Royaltydating soo tell
              us what you're looking for in your future partner.
            </Text>
            <TouchableOpacity
              style={{
                ...styles.loginScreenButton,
                width: dimension.width * 0.8,
                height: dimension.height * 0.07,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 10,
              }}
              onPress={() => {
                // sendDataToBackend(),
                navigation.navigate('Broadcast');
              }}>
              <Text style={styles.loginText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginScreenButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#E63A96',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 20,
  },
});

export default Letsgo;

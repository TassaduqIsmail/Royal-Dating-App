import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Component,
} from 'react';
import {
  StyleSheet,
  TextInput,
  ScrollView,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  ToastAndroid,
  Button,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../store/reducer/authSlice';
import {API} from './Apimanager';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import localStorage from 'redux-persist/es/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Actions } from 'react-native-router-flux';
//   import Form from "../components/SignInForm";
//   import Subject from "../components/Subject";
//   import SocialConnect from "../components/SocialConnect";
//   import { Button } from "../components";
const Phonene = ({navigation, route}) => {
  const dispatch = useDispatch();
  const Response = useSelector(state => state.auth);
  const error = useSelector(state => state.auth.error);
  const [Phone, setPhone] = useState('');
  const [Local, setLocal] = useState('');
  const {email, password} = route.params;
  console.log('emailand pass', email, password);

  // signup() {
  //     Actions.signup()
  // }
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  useEffect(() => {
    requestLocationPermission();
   
  }, []);
  
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Location Permission',
          message:
            'Cool Photo App needs access to your location ' +
            'so you can provide location-based services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
 

  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {type: 'Point', coordinates: [longitude, latitude]};
        handleSignup(location);
        const positionString = JSON.stringify(position); // Stringify position object
        console.log('Position to be saved in AsyncStorage:', positionString); // Log position before saving
        AsyncStorage.setItem('location', positionString)
          .then(() => {
            console.log('Position saved successfully in AsyncStorage');
          })
          .catch(error => {
            console.log('Error saving position in AsyncStorage:', error);
          });
        console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };
  const handleSignup = async () => {
    try {
      // Retrieve location from AsyncStorage
      const location = await AsyncStorage.getItem('location');
      console.log(location);
      console.log('Retrieved location from AsyncStorage:', location);

      // Parse location JSON
      const parsedLocation = JSON.parse(location);
      console.log('Parsed location:', parsedLocation);
      const locak = {
        longitude: parsedLocation.coords.longitude,
        latitude: parsedLocation.coords.latitude,
      };
      console.log(":ajhdsaas",locak);
      // Set local state with the parsed location
      setLocal(locak); // Set local state with the parsed location object

      // Check if Phone number is provided
      if (!Phone) {
        ToastAndroid.show('Please fill in all fields', ToastAndroid.SHORT);
        return; // Exit function if Phone number is missing
      }

      // Make API call with signup data including location
      const response = await axios.post(API.USER.SIGNUP, {
        email: email,
        password: password,
        phoneNumber: Phone,
        location: {
          type: 'Point', // Add type field as required by the backend
          coordinates: [  longitude= Local?.longitude,  latitude= Local?.latitude,]
        
         
        },
      });

      console.log('Signup response:', response.data);

      // Handle response based on message
      if (response.data.message === 'OTP sent to your email. Please verify.') {
        navigation.navigate('Verify', {Type: 'Signup', email: email});
      } else {
        ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image source={require('../../assets/Images/Back.png')} />
          </TouchableOpacity>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '600',
              marginLeft: 30,
            }}>
            Back
          </Text>
        </View>
        <View style={{width: 30}}></View>
      </View>

      <View style={{padding: 20, paddingTop: 80}}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#15224F',
            fontSize: 20,
            textAlign: 'left',
          }}>
          Enter Your Phone Number
        </Text>
        <Text
          style={{
            color: '#6E7077',
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'left',
          }}>
          Enter phone number to create account
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
        }}>
        <Text
          style={{
            width: dimension.width * 0.8,
            paddingTop: 10,
            fontSize: 15,
            alignSelf: 'center',
            marginTop: 5,
            color: '#969AA8',
          }}>
          Phone number
        </Text>

        <TextInput
          value={Phone}
          onChangeText={text => {
            setPhone(text);
          }}
          style={{...styles.inputBox, width: dimension.width * 0.8}}
          selectionColor="#000"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="+87 3268987521"
          placeholderTextColor="black"
        />

        <Text
          style={{
            color: '#000',
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'left',
            padding: 10,
            width: dimension.width * 0.8,
            alignSelf: 'center',
          }}></Text>

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
            handleSignup();
          }}
          underlayColor="#fff">
          <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  signupTextCont: {
    marginBottom: 30,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 15,
    flexDirection: 'row',
  },
  signupText: {
    color: '#bd157a',
    fontSize: 15,
  },
  signupButton: {
    color: '#000',
    fontSize: 15,
    fontWeight: '500',
  },
  forgotButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#700d49',
    fontSize: 15,
    fontWeight: '500',
  },
  inputBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'black',
    borderWidth: 1,
    borderColor: '#E53A96',
    marginVertical: 5,
  },
  loginScreenButton: {
    backgroundColor: '#E63A96',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E63A96',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',

    fontSize: 20,
  },
});
export default Phonene;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import {Slider} from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service';
// import {Slider} from 'react-native';
// import Slider from 'react-native-elements';
import {
  Circle,
  ClipPath,
  Defs,
  G,
  Mask,
  Path,
  Rect,
  Svg,
} from 'react-native-svg';
import { API } from './Apimanager';

const MakeOffer = ({navigation}) => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  const [weight, setWeight] = useState(0);
  const onValueChange = value => {
    setWeight(value);
  };
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

  // useEffect(() => {
  //   getLocation();
  // }, []);
  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       const location = {type: 'Point', coordinates: [longitude, latitude]};
  //       console.log('Position to be saved in AsyncStorage:', location)
  //         .then(() => {
  //           console.log('Position saved successfully in AsyncStorage');
  //         })
  //         .catch(error => {
  //           console.log('Error saving position in AsyncStorage:', error);
  //         });
  //       console.log(position);
  //     },
  //     error => {
  //       // See error code charts below.
  //       console.log(error.code, error.message);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // };

  const [Local, setLocal] = useState('');

  // const createOffer = async () => {
  //   try {
  //     // Retrieve location from AsyncStorage
  //     const location = await AsyncStorage.getItem('location');
  //     console.log('Retrieved location from AsyncStorage:', location);

  //     // Parse location JSON
  //     const parsedLocation = JSON.parse(location);
  //     console.log('Parsed location:', parsedLocation);
  //     const local = {
  //       longitude: parsedLocation.coords.longitude,
  //       latitude: parsedLocation.coords.latitude,
  //     };

  //     const offerData = {
  //       type: 'Your offer type',
  //       town: 'Offer town',
  //       latitude: local?.latitude, // User's current latitude
  //       longitude: local?.longitude, // User's current longitude
  //     };

  //     console.log('Local:', local);

  //     const response = await axios.post(
  //       'http://192.168.18.44:9000/api/createoffer/offers',
  //       offerData,
  //     );
  //     console.log('Offer created successfully:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating offer:', error);
  //     throw error;
  //   }
  // };


  const createOffer = async () => {
    try {
      // Retrieve location from AsyncStorage
      const location = await AsyncStorage.getItem('location');
      console.log('Retrieved location from AsyncStorage:', location);
  
      // Parse location JSON
      const parsedLocation = JSON.parse(location);
      console.log('Parsed location:', parsedLocation);
      const local = {
        longitude: parsedLocation.coords.longitude,
        latitude: parsedLocation.coords.latitude,
      };
  
      const offerData = {
        type: 'Your offer type',
        town: 'Offer town',
        latitude: local?.latitude, // User's current latitude
        longitude: local?.longitude, // User's current longitude
      };
  
      console.log("Local:", offerData);
  
      const response = await axios.post(API.OFFER.CREAT_OFFER, offerData);
      console.log('Offer created successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw error;
    }
  };
  // const getOffersWithinRadius = async (latitude, longitude, radius) => {
  //   try {
  //     const response = await axios.get(
  //       API.OFFER.GET_ALL_OFFER,
  //       {
         
  //           latitude,
  //           longitude,
  //           radius,
       
  //       },
  //     );
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching offers within radius:', error);
  //     throw error;
  //   }
  // };

  // // Usage
  // const userLatitude = Local?.latitude; // User's current latitude
  // const userLongitude = Local?.longitude; // User's current longitude
  // const radius = 10; // Search radius in kilometers

  // getOffersWithinRadius(userLatitude, userLongitude, radius)
  //   .then(data => {
  //     console.log('Offers within radius:', data);
  //   })
  //   .catch(error => {
  //     console.error('Error fetching offers within radius:', error);
  //   });

  const {height, width} = Dimensions.get('window');
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
          width: width,
        }}>
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
          Make Offer
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.1,
          alignSelf: 'center',
          height: dimension.height * 0.1,
          width: dimension.width * 0.8,
          //   position: 'absolute',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6349 20C16.5084 20 21.2698 15.5228 21.2698 10C21.2698 4.47715 16.5084 0 10.6349 0C4.76142 0 0 4.47715 0 10C0 15.5228 4.76142 20 10.6349 20Z"
              fill="#F35BAC"
            />
            <Path
              d="M13.231 9.38416L11.4288 11.0635C11.051 11.4151 10.6745 11.7667 10.2988 12.1177C10.0584 12.3417 9.64938 12.3417 9.40763 12.1177C9.3339 12.0483 9.26017 11.9795 9.18786 11.9108C8.66608 11.4237 8.14571 10.938 7.62464 10.4502C7.3758 10.2189 7.39282 9.85473 7.62464 9.6201C7.85434 9.38614 8.28254 9.40267 8.51578 9.6201C8.59022 9.68884 8.66395 9.75757 8.73626 9.82631C9.3662 10.4136 10.3427 10.4155 10.9726 9.82823C11.1894 9.62615 11.4062 9.424 11.6231 9.22158L12.7531 8.16809C13.002 7.93611 13.3926 7.95197 13.6443 8.16809C13.8945 8.38421 13.8768 8.78207 13.6436 8.99951C13.5067 9.12707 13.3678 9.25661 13.231 9.38416Z"
              fill="white"
            />
          </Svg>
          <Text
            style={{
              // textAlignVertical: 'center',
              // marginTop: dimension.height * 0.1,
              paddingLeft: 20,
              // position: 'absolute',
              color: '#000',
              fontWeight: '600',
            }}>
            Choose Categories
          </Text>
        </View>
        <TextInput
          style={{...styles.inputBox, height: 40, width: dimension.width * 0.8}}
          placeholder="Choose Categories"
          placeholderTextColor="#6E7077"
          selectionColor="#000"
        />
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.05,
          alignSelf: 'center',
          height: dimension.height * 0.1,
          width: dimension.width * 0.8,
          //   position: 'absolute',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6349 20C16.5084 20 21.2698 15.5228 21.2698 10C21.2698 4.47715 16.5084 0 10.6349 0C4.76142 0 0 4.47715 0 10C0 15.5228 4.76142 20 10.6349 20Z"
              fill="#F35BAC"
            />
            <Path
              d="M13.231 9.38416L11.4288 11.0635C11.051 11.4151 10.6745 11.7667 10.2988 12.1177C10.0584 12.3417 9.64938 12.3417 9.40763 12.1177C9.3339 12.0483 9.26017 11.9795 9.18786 11.9108C8.66608 11.4237 8.14571 10.938 7.62464 10.4502C7.3758 10.2189 7.39282 9.85473 7.62464 9.6201C7.85434 9.38614 8.28254 9.40267 8.51578 9.6201C8.59022 9.68884 8.66395 9.75757 8.73626 9.82631C9.3662 10.4136 10.3427 10.4155 10.9726 9.82823C11.1894 9.62615 11.4062 9.424 11.6231 9.22158L12.7531 8.16809C13.002 7.93611 13.3926 7.95197 13.6443 8.16809C13.8945 8.38421 13.8768 8.78207 13.6436 8.99951C13.5067 9.12707 13.3678 9.25661 13.231 9.38416Z"
              fill="white"
            />
          </Svg>
          <Text
            style={{
              // textAlignVertical: 'center',
              // marginTop: dimension.height * 0.1,
              paddingLeft: 20,
              // position: 'absolute',
              color: '#000',
              fontWeight: '600',
            }}>
            Search by town
          </Text>
        </View>
        <TextInput
          style={{...styles.inputBox, height: 40, width: dimension.width * 0.8}}
          placeholder="Enter Your Town"
          placeholderTextColor="#6E7077"
          selectionColor="#000"
        />
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.05,
          alignSelf: 'center',
          height: dimension.height * 0.1,
          width: dimension.width * 0.8,
          //   position: 'absolute',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="20"
            viewBox="0 0 22 20"
            fill="none">
            <Path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.6349 20C16.5084 20 21.2698 15.5228 21.2698 10C21.2698 4.47715 16.5084 0 10.6349 0C4.76142 0 0 4.47715 0 10C0 15.5228 4.76142 20 10.6349 20Z"
              fill="#F35BAC"
            />
            <Path
              d="M13.231 9.38416L11.4288 11.0635C11.051 11.4151 10.6745 11.7667 10.2988 12.1177C10.0584 12.3417 9.64938 12.3417 9.40763 12.1177C9.3339 12.0483 9.26017 11.9795 9.18786 11.9108C8.66608 11.4237 8.14571 10.938 7.62464 10.4502C7.3758 10.2189 7.39282 9.85473 7.62464 9.6201C7.85434 9.38614 8.28254 9.40267 8.51578 9.6201C8.59022 9.68884 8.66395 9.75757 8.73626 9.82631C9.3662 10.4136 10.3427 10.4155 10.9726 9.82823C11.1894 9.62615 11.4062 9.424 11.6231 9.22158L12.7531 8.16809C13.002 7.93611 13.3926 7.95197 13.6443 8.16809C13.8945 8.38421 13.8768 8.78207 13.6436 8.99951C13.5067 9.12707 13.3678 9.25661 13.231 9.38416Z"
              fill="white"
            />
          </Svg>
          <Text
            style={{
              // textAlignVertical: 'center',
              // marginTop: dimension.height * 0.1,
              paddingLeft: 20,
              // position: 'absolute',
              color: '#000',
              fontWeight: '600',
            }}>
            Search near by
          </Text>
        </View>
        <View
          style={{
            width: '95%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'black', fontSize: 16}}>1</Text>
          <Text style={{color: 'black', fontSize: 16}}>10</Text>
        </View>
        <Slider
          value={weight}
          onValueChange={onValueChange}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#F35BAC" // Light blue color
          maximumTrackTintColor="#EAEBEC"
          step={1}
          thumbStyle={{
            backgroundColor: '#FFF',
            height: 30,
            width: 30,
            borderWidth: 5,
            borderColor: '#F35BAC',
          }}
          trackStyle={{height: 13, borderRadius: 20}}
        />
      </View>
      <Text style={{color: 'black', fontSize: 16, alignSelf: 'center'}}>
        {weight} Miles
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
          marginTop: 50,
        }}
        onPress={() => {
          // createOffer();
          navigation.navigate('OfferDetails');
        }}
        underlayColor="#fff">
        <Text style={styles.loginText}>Search</Text>
      </TouchableOpacity>
      {/* {=========================================Bottombar==============================} */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.tab}>
          <Svg
            width="34"
            height="35"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M1 10.3988C1 9.43981 1.45843 8.53865 2.23351 7.97399L10.0399 2.28692C11.0927 1.51995 12.5201 1.51995 13.5728 2.28692L21.3792 7.97399C22.1543 8.53865 22.6127 9.43981 22.6127 10.3988V21.6769C22.6127 22.7815 21.7173 23.6769 20.6127 23.6769H3C1.89543 23.6769 1 22.7815 1 21.6769V10.3988Z"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <Path
              d="M8.19922 17.3499C8.19922 15.3574 9.81444 13.7422 11.8069 13.7422V13.7422C13.7994 13.7422 15.4146 15.3574 15.4146 17.3499V23.6768H8.19922V17.3499Z"
              fill="#9EA2BE"
              fill-opacity="0.15"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <Path
              d="M10.2607 8.60754H13.353"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('MakeOffer');
          }}
          style={styles.tab}>
          <Image
            source={require('../../assets/Images/2303951.png')}
            style={{height: 30, width: 30, tintColor: '#F35BAC'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Notification');
          }}
          style={styles.tab}>
          <Image
            source={require('../../assets/Images/Bell.png')}
            style={{height: 30, width: 30, tintColor: '#9EA2BE'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Messages');
          }}
          style={styles.tab}>
          <Svg
            width="33"
            height="35"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              d="M5.45115 17.0163L6.92881 18.7955C7.32159 19.2684 8.04406 19.2782 8.44962 18.8162L10.057 16.9851C10.3418 16.6607 10.7525 16.4747 11.1843 16.4747H16.5915C18.2483 16.4747 19.5915 15.1315 19.5915 13.4747V4.36926C19.5915 2.71241 18.2483 1.36926 16.5915 1.36926H4.06152C2.40467 1.36926 1.06152 2.71241 1.06152 4.36926V13.4747C1.06152 15.1315 2.40467 16.4747 4.06152 16.4747H4.29724C4.74327 16.4747 5.16617 16.6732 5.45115 17.0163Z"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Circle cx="7.08444" cy="9.05209" r="1.853" fill="#9EA2BE" />
            <Circle cx="13.5698" cy="9.05209" r="1.853" fill="#E0E1EF" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}
          style={styles.tab}>
          <Svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Circle cx="11.8231" cy="11.8231" r="10.8231" fill="white" />
            <Path
              d="M18.4138 20.3009C17.1943 17.8994 14.7009 16.2538 11.8231 16.2538C8.94531 16.2538 6.45187 17.8994 5.23242 20.3009C9.33414 23.3814 14.1865 23.3434 18.4138 20.3009Z"
              fill="#E0E1EF"
            />
            <Path
              d="M18.4138 20.3009C17.1943 17.8994 14.7009 16.2538 11.8231 16.2538C8.94531 16.2538 6.45187 17.8994 5.23242 20.3009"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Circle
              cx="11.8233"
              cy="9.686"
              r="3.65536"
              fill="#E0E1EF"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Circle
              cx="11.8231"
              cy="11.8231"
              r="10.8231"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  inputBox: {
    alignSelf: 'center',
    backgroundColor: 'white',

    paddingHorizontal: 15,
    fontSize: 12,
    color: '#6E7077',
    borderBottomWidth: 2,
    borderColor: 'black',
    marginVertical: 20,
  },
  sliderValueText: {
    fontSize: 20,
    color: '#FFF',
  },
  slider: {
    width: '95%',
    height: 40,
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFF',
    height: height * 0.08,

    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginHorizontal: 5,
    elevation: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
  },
});

export default MakeOffer;

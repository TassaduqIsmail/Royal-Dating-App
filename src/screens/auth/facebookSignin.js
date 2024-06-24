
import auth from '@react-native-firebase/auth';
import { View, Button, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';
import { API } from '../app/Apimanager'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GoogleSignIn from './googleLogin';
import { checkCredidentials } from './authentication';
import { useState } from 'react';
import { Text } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Idicat from './Idicat';
import Geolocation from 'react-native-geolocation-service';
function FacebookSignIn() {

  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  const [Lock,setLocal] = useState()


  useFocusEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {type: 'Point', coordinates: [longitude, latitude]};
        // handleSignup(location);
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
  async function onFacebookButtonPress() {
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
        setLocal(locak); // Set local s
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if (result.isCancelled) {
      setIsActive(false)
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccessToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      setIsActive(false)
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    const currentUser = auth().currentUser;
    if (currentUser) {
      setIsActive(true)
    }
    console.log(facebookCredential);
    console.log('Current user:', currentUser);

    const userData = {
      providerName: 'facebook',
      providerUId: currentUser?.uid,
      email: currentUser?.email,
      name: currentUser?.displayName,
      status: 'activate'
    }
    const response = await axios.post(API.USER.SIGNUP, {
      email: userData?.email,
      status: 'google.com',
      location: {
        type: 'Point', // Add type field as required by the backend
        coordinates: [
          (longitude = Lock?.longitude),
          (latitude = Lock?.latitude),
        ],
      },
    });

    console.log('Signup response:', response.data);

    // Handle response based on message
    if (
      response.data.message === 'OTP sent to your email. Please verify.'
    ) {
      navigation.navigate('Verify', {Type: 'Signup', email: userData?.email});
    } else {
      ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
    }

    console.log('erorr occur', error);

  // Sign-in the user with the credential
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }

  // const handleSignOut = async () => {
  //   try {
  //     await LoginManager.logOut();
  //     // setLoggedIn(false);
  //     console.log('Facebook logout :');
  //   } catch (error) {
  //     console.log('Facebook logout error:', error);
  //   }
  // };


  // .then(() => navigation.navigate('Started'))
  return (


    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginVertical: 30, }}>

      <TouchableOpacity

        onPress={() => onFacebookButtonPress()}
      >

        <Image
          source={require('../../assets/Images/Face.png')}

        />
        <Text>facebook signin</Text>
      </TouchableOpacity>

      {/* <GoogleSignIn /> */}
      {/* <Button title='fb signout' onPress={handleSignOut} /> */}

      {/* <View style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", position: "absolute", right: 80 }}>
        {isActive && <Idicat />}
      </View> */}
    </View>
  )
}

export default FacebookSignIn;
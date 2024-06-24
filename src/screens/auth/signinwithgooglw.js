import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {
  View,
  Button,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {useEffect, useState} from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {generateUsername} from '../../Componets/genrateUserName';
import {useDispatch, useSelector} from 'react-redux';
import {loginWithGoogle} from '../../../redux/reducer/authSlice';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../app/Apimanager';
import axios from 'axios';
GoogleSignin.configure({
  webClientId:
    '109673927552-tf2llth6r5jb96prlf1ss10ludch2qpu.apps.googleusercontent.com',
});
console.log('google key', GoogleSignin);
function Google() {
  const navigation = useNavigation();
  useEffect(() => {
    getLocation();
  }, []);
  const [Lock,setLocal] = useState()
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

  async function onGoogleButtonPress() {
    try {
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
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // console.log(idToken);
      const currentUser = await GoogleSignin.getCurrentUser();
      // console.log(currentUser);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log(googleCredential);
      // const userData = {
      //   providerName: 'google',
      //   providerUId: currentUser.user.id,
      //   email: currentUser.user.email,
      //   name: currentUser.user.name,
      //   status:'activate'
      // }
      // ---------------------------------------
      const userData = {
        // username: generateUsername(currentUser?.user?.name),
        loginWith: 'google.com',
        googleId: currentUser?.user?.id,
        email: currentUser?.user?.email,
        fullName: currentUser?.user?.name,
        // status: currentUser?.user?.loginWith,
        // status: 'activate',
      };
      console.log('hello this us user', userData); 
 
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
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        ToastAndroid.show('cancelled the login', ToastAndroid.SHORT);
      }
        else
        if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          ToastAndroid.show(
            'operation (e.g. sign in) is in progress already',
            ToastAndroid.SHORT,
          );
        }
      else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        ToastAndroid.show(
          'play services not available or outdated',
          ToastAndroid.SHORT,
        );
      } else {
        console.log(error);
        // some other error happened
        ToastAndroid.show('some other error happened', ToastAndroid.SHORT);
      }
    }
  }
  // .then(() => {
  //   navigation.navigate('Gender');
  // });
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      // setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  // if (profileData[0]?.name || profileData[0]?.pic_url || profileData[0]?.price || profileData[0]?.username) {
  //   navigation.navigate('Home')
  // }
  // else {
  //   navigation.navigate('Started')
  // }
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => {
          onGoogleButtonPress();
        }}>
        <Image source={require('../../assets/Images/G.png')} />
        {/* <Text>google signin</Text> */}
      </TouchableOpacity>
    </View>
  );
}
export default Google;

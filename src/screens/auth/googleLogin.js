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
 

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get the user's ID token
      const { idToken } = await GoogleSignin.signIn();
  
      // Get current user info
      const currentUser = await GoogleSignin.getCurrentUser();
  
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
      // Check if the user exists with the provided email
      const userData = {
        email: currentUser?.user?.email,
      };
      const response = await axios.post(API.USER.LOGIN, {
        email: userData?.email,
      });
  
      if (response.data.error === "User does not exist") {
        // User doesn't exist, handle this case (e.g., create a new user profile)
        // You might choose to create a new user profile with the Google-provided information
      } else {
        // User exists, check if they have a provider UID
        if (currentUser?.user?.providerId) {
          // User has a provider UID (e.g., signed in with Google)
          // Proceed with sign-in using Google credential
          await auth().signInWithCredential(googleCredential);
        } else {
          // User doesn't have a provider UID, proceed with email verification
          navigation.navigate('Verify', { Type: 'login', email: userData?.email });
        }
      }
    } catch (error) {
      // Handle errors
      console.error(error);
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
      </TouchableOpacity>
    </View>
  );
}
export default Google;

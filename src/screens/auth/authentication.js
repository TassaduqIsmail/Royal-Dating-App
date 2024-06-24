import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
// import { API } from "../../app/API/apis";
import {useDispatch} from 'react-redux';
import {setCheckPage, setIsIntro} from '../../../Store/Lang';
import {API} from '../app/Apimanager';
// import { useNavigation } from '@react-navigation/native';

// const dispatch = useDispatch();
// Your utility functions

export async function checkCredidentials({userData, navigation, providerUId}) {
  try {
    const loginData = {
      email: userData?.email.toLowerCase(),
      password: ' ',
      providerUId: providerUId,
    };
    console.log(loginData);
    const response = await axios.post(API.USER.LOGIN, loginData);

    if ('Sign In Successfully' === response.data.message) {
      await AsyncStorage.setItem('profileUid', response.data.uid);
      const profile = await checkProfileAndStatus(navigation);
      return profile;
    } else {
      const credential = await saveCredidentials({userData, navigation});
      return credential;
    }
  } catch (error) {
    console.error('Error in checkCredidentials:', error);
    return null;
  }
}

async function saveCredidentials({userData, navigation}) {
  try {
    const response = await axios.post(API.USER.SIGNUP, userData);

    if ('User registered successfully' === response.data.message) {
      ToastAndroid.show('Register in successfully', ToastAndroid.SHORT);
      await AsyncStorage.setItem('profileUid', response.data.uid);
      return 'register user';
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error in saveCredidentials:', error);
    return null;
  }
}

async function checkProfileAndStatus(navigation) {
  try {
    const uid = await AsyncStorage.getItem('profileUid');
    const response = await axios.get(`${API.USER.GET_USERS_BY_ID}/${uid}`);

    if (response?.data?.data?.status === 'activate') {
      ToastAndroid.show('sign in successfully', ToastAndroid.SHORT);

      const profileResponse = await axios.get(API.PROFILE.GET_ALL_PROFILE);
      const profileData = profileResponse?.data?.data?.filter(
        item => item?.uid === uid,
      );

      if (profileData[0]?.name || profileData[0]?.pic_url) {
        return 'profile found';
      } else {
        return 'profile not found';
      }
    }
  } catch (error) {
    console.error('Error in checkProfileAndStatus:', error);
    return null;
  }
}


import auth from '@react-native-firebase/auth';
import { View, Button, Image, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Text } from 'react-native-svg';

function FacebookLogin() {

  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  async function onFacebookButtonPress() {
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
    // const status = await checkCredidentials({ userData, navigation: navigation, providerUId: currentUser?.uid })

    // if (status == 'profile found'||'profile not found'  ) {
    //   setIsActive(false)
    //   dispatch(setIsIntro(true))
    //   dispatch(setCheckPage(false))
    // }
    // else if (status == 'register user') {
    //   setIsActive(false)
    //   dispatch(setIsIntro(false))
    //   dispatch(setCheckPage(true))
    // }
    // else if (status == 'deactivate') {
    //   setIsActive(false)
    //   ToastAndroid.show('admin deactive your account', ToastAndroid.SHORT);
    //   dispatch(setIsIntro(null))
    //   dispatch(setCheckPage(null))
    // }
    // else
     if (status == null) {
      setIsActive(false)
      ToastAndroid.show('some error occure', ToastAndroid.SHORT);
    }
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

export default FacebookLogin;
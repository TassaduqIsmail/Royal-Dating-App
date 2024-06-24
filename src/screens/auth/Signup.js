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
} from 'react-native';
import Google from './signinwithgooglw';
import FacebookSignIn from './facebookSignin';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// import { Actions } from 'react-native-router-flux';
//   import Form from "../components/SignInForm";
//   import Subject from "../components/Subject";
//   import SocialConnect from "../components/SocialConnect";
//   import { Button } from "../components";
const SignUp = ({navigation}) => {
  const [Email, setEmail] = useState('');
  // signup() {
  //     Actions.signup()
  // }
  const [dimension, setDimension] = useState(Dimensions.get('window'));

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

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
          Sign Up
        </Text>
        <Text
          style={{
            color: '#6E7077',
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'left',
          }}>
          Signup to create account
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
        }}>
        <Text
          style={{
            fontSize: 15,
            width: dimension.width * 0.8,
            alignSelf: 'center',
            color: '#969AA8',
          }}>
          Email or Phone Number
        </Text>
        <TextInput
          value={Email}
          onChangeText={text => {
            setEmail(text);
          }}
          style={{...styles.inputBox, width: dimension.width * 0.8}}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="User ID"
          placeholderTextColor="black"
          selectionColor="#000"
          keyboardType="email-address"
          // onSubmitEditing={() => this.password.focus()}
        />
        <Text
          style={{
            color: '#6E7077',
            fontWeight: '600',
            fontSize: 14,
            textAlign: 'left',
            padding: 10,
            width: dimension.width * 0.8,
            alignSelf: 'center',
          }}>
          By continuing, you agree to our Terms of Service & Privacy Policy.
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
            if (!Email) {
              ToastAndroid.show('Please Enter Email', ToastAndroid.SHORT);
            } else navigation.navigate('Passw', {email: Email});
          }}
          underlayColor="#fff">
          <Text style={styles.loginText}>Next</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: dimension.width * 0.9,
          alignItems: 'center',
          justifyContent: 'space-around',
          marginTop: 40,
        }}>
        <View
          style={{
            backgroundColor: '#BEBEBE',
            width: '25%',
            height: 3,
            borderRadius: 50,
          }}></View>
        <Text
          style={{
            color: '#969AA8',
            fontSize: 15,
          }}>
          You can Connect With
        </Text>
        <View
          style={{
            backgroundColor: '#BEBEBE',
            width: '25%',
            height: 3,
            borderRadius: 50,
          }}></View>
      </View>
      <View style={{ flexDirection: 'row',  paddingHorizontal: 170, marginVertical: 30, alignItems: 'center' }}>
        <Google />
        <FacebookSignIn />
      </View>

      <View style={styles.signupTextCont}>
        <Text style={styles.signupButton}>Do you have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Introduction');
          }}>
          <Text style={styles.signupText}>Login</Text>
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
export default SignUp;

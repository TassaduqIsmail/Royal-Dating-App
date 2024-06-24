import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Component,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Button,
} from 'react-native';
import {API} from './Apimanager';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { Button } from '../components';
const Verify = ({navigation, route}) => {
  const [Code3, setCode3] = useState('');
  const [Code2, setCode2] = useState('');
  const [Code1, setCode1] = useState('');
  const [Code, setCode] = useState('');
  const inputRefs = useRef([]);
  const CODE_LENGTH = new Array(4).fill(0);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  const {Type, email} = route.params;
  console.log('hello this is type', Type, email);
  const state = {
    value: '',
  };
  const input = React.createRef();
  const {value} = state;
  const values = value.split('');
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

  // const [otp, setOTP] = useState('');

  // const handleVerify = () => {
  //       const code = verificationCode.join('');
  //       console.log('Verification Code:', code);
  //       console.log('state:', res?.user?.verificationCode);
  //       if (res?.user?.verificationCode == code) {
  //         setError('');
  //         console.log('They are equal.');
  //         navigation.navigate('AddBestPhoto');
  //         dispatch(resetError());
  //       } else {
  //         setError('Invalid code');
  //       }
  //     };
  const handleInputChange = (index, value) => {
    const updatedVerificationCode = [...verificationCode];
    updatedVerificationCode[index] = value;
    setVerificationCode(updatedVerificationCode);
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const code = verificationCode.join('');
      console.log('tyu chall raha ha');
      const response = await axios.post(
        Type === 'Signup' ? API.USER.VERIFY_USERS : API.USER.VERIFY_USER_LOGIN,
        {
          email: email,
          otp: code,
        },
      );
      console.log('tu bhi ');
      console.log('verifation responce ', response.data);
      // Handle response from server
      if (
        response.data.message ==
          'OTP verified successfully and user registered' ||
        response.data.message == 'Login successful'
      ) {
        AsyncStorage.setItem('profileUid', response.data.uid);
        navigation.navigate('AddBestPhoto');
        ToastAndroid.show('OTP Verified Successfully', ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error(error);
      ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
    }
  };

  console.log(verificationCode);
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
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#15224F',
            fontSize: 20,
            textAlign: 'left',
            marginLeft: 20,
            marginTop: 50,
          }}>
          Code Verification
        </Text>
        <Text
          style={{
            width: dimension?.width * 0.7,
            color: '#6E7077',
            fontWeight: '600',
            fontSize: 14,
            marginLeft: 20,
            textAlign: 'left',
          }}>
          Check your email for verification code, and you can continue.
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: '20%',
        }}>
        {verificationCode.map((value, index) => (
          <TextInput
            keyboardType="numeric"
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            inputMode="numeric"
            textAlign="center"
            maxLength={1}
            value={value}
            onChangeText={text => handleInputChange(index, text)}
            style={{
              borderWidth: 1,
              fontSize: 20,
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              paddingHorizontal: 15,
              color: '#000',
            }}
          />
        ))}
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 20,
          marginTop: 80,
        }}>
        <TextInput
          value={Code}
          keyboardType="number-pad"
          style={{
            borderWidth: 1,
            fontSize: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingHorizontal: 15,
            color: '#000',
          }}
          maxLength={1}
          onChangeText={text => setCode(text)}
        />
        <TextInput
          value={Code1}
          keyboardType="number-pad"
          style={{
            borderWidth: 1,
            fontSize: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#000',
            paddingHorizontal: 15,
          }}
          maxLength={1}
          onChangeText={text => setCode1(text)}
        />
        <TextInput
          value={Code2}
          keyboardType="number-pad"
          style={{
            borderWidth: 1,
            fontSize: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: '#000',
            paddingHorizontal: 15,
          }}
          maxLength={1}
          onChangeText={text => setCode2(text)}
        />
        <TextInput
          value={Code3}
          keyboardType="number-pad"
          style={{
            borderWidth: 1,
            fontSize: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            paddingHorizontal: 15,
            color: '#000',
          }}
          maxLength={1}
          onChangeText={text => setCode3(text)}
        />
      </View> */}

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
          handleVerifyOTP();
          // navigation.navigate('AddBestPhoto');
        }}
        underlayColor="#fff">
        <Text style={styles.loginText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#ffffff',
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
    color: '#700d49',
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
  wrap: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',

    flexDirection: 'row',
  },
  display: {
    borderRightWidth: 3,
    borderRightColor: 'rgba(0, 0, 0, 0.5)',
    width: 56,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
  },
  text: {
    fontSize: 32,
  },
  noBorder: {
    borderRightWidth: 0,
  },
  input: {
    position: 'absolute',
    fontSize: 32,
    textAlign: 'center',
    backgroundColor: 'transparent',
    width: 32,
    top: 0,
    bottom: 0,
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
export default Verify;

// import React, {useEffect, useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   ToastAndroid,
// } from 'react-native';

// import {useDispatch, useSelector} from 'react-redux';
// import {resetError} from '../../../redux/reducer/authSlice';
// const Verify = ({navigation}) => {
//   const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
//   const [error, setError] = useState('');
//   const inputRefs = useRef([]);
//   const dispatch = useDispatch();
//   const res = useSelector(state => state.auth);
//   const handleInputChange = (index, value) => {
//     const updatedVerificationCode = [...verificationCode];
//     updatedVerificationCode[index] = value;
//     setVerificationCode(updatedVerificationCode);
//     if (value && index < inputRefs.current.length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };
//   const handleVerify = () => {
//     const code = verificationCode.join('');
//     console.log('Verification Code:', code);
//     console.log('state:', res?.user?.verificationCode);
//     if (res?.user?.verificationCode == code) {
//       setError('');
//       console.log('They are equal.');
//       navigation.navigate('Verify');
//       dispatch(resetError());
//     } else {
//       setError('Invalid code');
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <TouchableOpacity
//           style={{
//             backgroundColor: '#292526',
//             padding: 10,
//             borderRadius: 30,
//             alignSelf: 'flex-start',
//             marginTop: '5%',
//           }}
//           onPress={() => {
//             navigation.pop();
//           }}>
//           <Image
//             source={require('../../../assets/Images/PNG/alsoback.png')}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//         <Image
//           source={require('../../../assets/Images/PNG/Login.png')}
//           style={styles.logo}
//         />
//         <Text style={styles.title}>Enter Code</Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             marginVertical: '20%',
//           }}>
//           {verificationCode.map((value, index) => (
//             <TextInput
//               keyboardType="numeric"
//               key={index}
//               ref={ref => (inputRefs.current[index] = ref)}
//               inputMode="numeric"
//               textAlign="center"
//               maxLength={1}
//               value={value}
//               onChangeText={text => handleInputChange(index, text)}
//               style={{
//                 borderColor: 'gray',
//                 borderWidth: 1,
//                 marginBottom: 20,
//                 padding: 10,
//                 color: '#000',
//                 borderRadius: 20,
//                 elevation: 10,
//                 fontSize: 20,
//                 backgroundColor: '#FFF',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontWeight: 'bold',
//               }}
//             />
//           ))}
//         </View>
//         <View>
//           {error && res.isForget && <Text style={{color: 'red'}}>{error}</Text>}
//         </View>
//         <TouchableOpacity onPress={handleVerify} style={styles.loginButton}>
//           <Text style={styles.buttonText}>Verify</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#FFF',
//   },
//   logo: {
//     marginVertical: 20,
//     alignSelf: 'center',
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     color: '#000',
//     alignSelf: 'center',
//   },
//   loginButton: {
//     backgroundColor: '#2C3995',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     marginVertical: 15,
//     elevation: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });
// export default Verify;

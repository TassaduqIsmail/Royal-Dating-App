import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ToastAndroid,
  Alert,
} from 'react-native';
import {ActivityIndicator} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../store/reducer/authSlice';
import {API} from './Apimanager';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import Google from '../auth/googleLogin';
import FacebookLogin from '../auth/facebookLogin';
import { requestUserPermission } from '../../util/nofifecationservices';

const Introduction = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('hasibexpoacc10@gmail.com');
  const [Password, setPassword] = useState('123');
  const dispatch = useDispatch();
  const openModal = () => {
    setModalVisible(true);
  };
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  const closeModal = () => {
    setModalVisible(false);
  };
  // useEffect(()=> {
  //   GoogleSignin.configure({
  //       webClientId: '109673927552-tf2llth6r5jb96prlf1ss10ludch2qpu.apps.googleusercontent.com',
  //   });
  //   })
  // GoogleSignin.configure({
  //   // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //   webClientId:
  //     '109673927552-tf2llth6r5jb96prlf1ss10ludch2qpu.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
  //   offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //   hostedDomain: '', // specifies a hosted domain restriction
  //   forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  //   accountName: '', // [Android] specifies an account name on the device that should be used
  //   iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  //   googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  //   openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
  //   profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  // });

  // const [State, setState] = useState();
  // const signIn = async () => {
  //   await GoogleSignin.hasPlayServices();
  //   console.log(GoogleSignin);
  //   const userInfo = await GoogleSignin.signIn();
  //   // setState({ userInfo });
  //   console.log(userInfo);
  //   // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //   //   console.log(statusCodes);
  //   //   // user cancelled the login flow
  //   // } else if (error.code === statusCodes.IN_PROGRESS) {
  //   //   // operation (e.g. sign in) is in progress already
  //   // } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //   //   // play services not available or outdated
  //   // } else {
  //   //   // some other error happened
  //   console.log('SJSSJKS');
  //   // }
  // };
  useEffect(() => {
    const hideSplash = () => {
      RNBootSplash.hide();
    };

    const timeoutId = setTimeout(hideSplash, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollRef = useRef();
  let intervalId = null;

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  useEffect(() => {
    requestUserPermission()
  }, []);
  useEffect(() => {
    
    console.log('this is lodaing data ', loading, error);
    //   Dimensions.addEventListener("change", onChange);
    //   return () => {
    //     //   Dimensions.removeEventListener('change', onChange);
    //   };
  }, [loading]);
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });
  console.log('asdfa', error);
  const onTouchStart = () => {
    // As soon as the user touches the slide, stop the automatic sliding
    clearInterval(intervalId);
  };

  const onTouchEnd = () => {
    // As soon as the user stops touching the slide, releases it, start the automatic sliding again
    startInterval();
  };

  // dispatch(loginUser({ Email, Password }));
  const userLogin = async () => {
    if (!email || !Password) {
      ToastAndroid.show('Please Fill all Fields', ToastAndroid.SHORT);
    } else {
      const userData = {
        email: email,
        password: Password,
      };

      await axios
        .post(API.USER.LOGIN, userData)
        .then(async response => {
          console.log('shdhh', response.data);
          if (response.data.error == 'User does not exist') {
            ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
          } else if ('Invalid password' == response.data.error) {
            ToastAndroid.show(response.data.error, ToastAndroid.SHORT);
          } else if (
            'OTP sent to your email. Please verify to complete login.' ==
            response.data.message
          ) {
            ToastAndroid.show('OTP send to your email', ToastAndroid.SHORT);
            setTimeout(() => {
              navigation.navigate('Verify', {Type: 'login', email: email});
              // navigation.navigate('Started')
            }, 600);

            setEmail('');
            setPassword('');
          }
        })
        .catch(error => {
          console.error('Axios POST request error:', error);
        });
    }
  };
  // const checkProfileAndStatus = async () => {

  //   const uid = await AsyncStorage.getItem('uid');
  //   await axios.get(`${API.USER.GET_USERS_BY_ID}/${uid}`)
  //     .then(async (response) => {
  //       // console.log(response.data);
  //       console.log('uid', uid);

  //       console.log('profile', response.data.data.status);

  //       if (response?.data?.data?.status == 'activate') {

  //         Toast.show({
  //           type: 'success',
  //           text1: 'sign in successfully',
  //         }
  //         );

  //         await axios.get(API.PROFILE.GET_ALL_PROFILE)
  //           .then(response => {
  //             // console.log(response.data);
  //             // console.log('uid', uid);
  //             const profileData = response?.data?.data?.filter(item => item?.uid === uid);

  //             if (profileData[0]?.name || profileData[0]?.pic_url || profileData[0]?.price || profileData[0]?.username) {
  //               navigation.navigate('Home')
  //             }
  //             else {
  //               navigation.navigate('Started')
  //             }
  //             // console.log('profile', profileData);

  //           })
  //           .catch(error => {
  //             console.error('Axios POST request error:', error);
  //           });

  //       } else if (response?.data?.data?.status == 'deactivate') {

  //         Toast.show({
  //           type: 'error',
  //           text1: 'admin deactivate your account',
  //         })
  //       }

  //     })

  // };

  const carouselImages = [
    {
      url: require('../../assets/Images/intro.png'),
      title: 'Find Your Special Someone',
      content: 'With our new exciting features',
    },
    {
      url: require('../../assets/Images/intro.png'),
      title: 'More Profiles, More Dates',
      content: 'With our new exciting features',
    },
    {
      url: require('../../assets/Images/intro.png'),
      title: 'Get Exicited Offers',
      content: 'With our new exciting features',
    },
  ];

  const setIndex = event => {
    let viewSize = event.nativeEvent.layoutMeasurement.width;
    let contentOffset = event.nativeEvent.contentOffset.x;
    let carouselIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(carouselIndex);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ScrollView
        horizontal
        ref={scrollRef}
        onMomentumScrollEnd={setIndex}
        showsHorizontalScrollIndicator={false}
        // onTouchStart={onTouchStart}
        // onTouchEnd={onTouchEnd}
        pagingEnabled
        style={{width: dimension?.width * 0.8}}>
        {carouselImages.map((value, key) => (
          <Image
            source={`${value.url}`}
            style={{
              width: dimension?.width * 0.8,
              height: dimension?.height * 0.6,
              resizeMode: 'contain',
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: 'column',

          alignSelf: 'center',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {carouselImages.map((val, key) => (
          <Text
            style={
              key === selectedIndex
                ? {
                    fontWeight: 'bold',
                    color: '#15224F',
                    fontSize: 20,
                    textAlign: 'center',
                  }
                : {display: 'none'}
            }>
            ⬤ {key === selectedIndex && val.title}
          </Text>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'column',

          alignSelf: 'center',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        {carouselImages.map((val, key) => (
          <Text
            style={
              key === selectedIndex
                ? {
                    width: dimension?.width * 0.7,
                    color: '#6E7077',
                    fontWeight: '600',
                    fontSize: 14,
                    textAlign: 'center',
                  }
                : {display: 'none'}
            }>
            ⬤ {key === selectedIndex && val.content}
          </Text>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',

          alignSelf: 'center',
          marginBottom: 20,
        }}>
        {carouselImages.map((val, key) => (
          <Text
            key={key}
            style={{
              ...(key === selectedIndex
                ? {color: '#E53A96', paddingLeft: 5}
                : {color: 'gray', paddingLeft: 5}),
            }}>
            ⬤
          </Text>
        ))}
      </View>
      <View
        style={{
          flexDirection: 'column',

          alignSelf: 'center',
          textAlign: 'center',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={{
            ...styles.loginScreenButton,
            width: dimension.width * 0.7,
            height: dimension.height * 0.07,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            // openModal()
            setModalVisible(true);
          }}
          underlayColor="#fff">
          <Text style={styles.loginText}>Get Started</Text>
        </TouchableOpacity>
      </View>
      {modalVisible == true ? (
        // <Modal
        //       animationType="slide"
        //       transparent={true}
        //       visible={modalVisible}
        //       onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <ScrollView>
            <View
              style={{
                backgroundColor: '#FFF',
                height: dimension.height * 0.9,
                width: dimension.width,
                marginTop: dimension.height * 0.2,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                padding: 30,
              }}>
              <View
                style={{
                  backgroundColor: '#BEBEBE',
                  width: 80,
                  height: 10,
                  borderRadius: 50,
                  alignSelf: 'center',
                }}></View>
              <TouchableOpacity
                onPress={() => {
                  closeModal();
                }}
                style={{
                  backgroundColor: '#E53A96',
                  padding: 5,
                  borderRadius: 50,
                  alignSelf: 'flex-end',
                }}>
                <Image
                  source={require('../../assets/Images/close.png')}
                  style={{height: 30, width: 30, tintColor: '#FFF'}}
                />
              </TouchableOpacity>
              <View style={styles.container}>
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: '#15224F',
                      fontSize: 20,
                      textAlign: 'left',
                    }}>
                    Welcome Back!
                  </Text>
                  <Text
                    style={{
                      color: '#6E7077',
                      fontWeight: '600',
                      fontSize: 14,
                      textAlign: 'left',
                    }}>
                    Let's go for explore continues
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
                    value={email}
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
                      width: dimension.width * 0.8,
                      paddingTop: 10,
                      fontSize: 15,
                      alignSelf: 'center',
                      marginTop: 5,
                      color: '#969AA8',
                    }}>
                    Password
                  </Text>
                  <TextInput
                    value={Password}
                    onChangeText={text => {
                      setPassword(text);
                    }}
                    style={{...styles.inputBox, width: dimension.width * 0.8}}
                    selectionColor="#000"
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Enter Password"
                    secureTextEntry={true}
                    placeholderTextColor="black"
                  />
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
                      if (!email && !Password) {
                        ToastAndroid.show(
                          'Please Enter Email And Password',
                          ToastAndroid.SHORT,
                        );
                      }
                      //  else navigation.navigate('Verify',{Type:"login",email:email});
                      // userLogin();
                      // closeModal();
                      userLogin();
                    }}
                    underlayColor="#fff">
                    <Text style={styles.loginText}>SignIn</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 15,
                      fontWeight: '500',
                      marginTop: 10,
                    }}>
                    Forgot password?
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    width: dimension.width * 0.9,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: 10,
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
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 170,
                    marginVertical: 30,
                    alignItems: 'center',
                  }}>
                  <Google />
                  <FacebookLogin />
                </View>
                <View style={styles.signupTextCont}>
                  <Text style={styles.signupText}>Dont have an account? </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignUp');
                      closeModal();
                    }}>
                    <Text style={styles.signupButton}>Sign Up here</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : // </Modal>

      null}
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {},
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D75E9F',
    position: 'absolute',
  },

  modalText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },

  closeModalText: {
    fontSize: 16,
    color: 'white',
  },
  inputBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 15,
    color: 'black',
    borderWidth: 1,
    borderColor: '#E53A96',
    marginVertical: 5,
  },
  button: {
    width: 299,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E53A96',
    borderRadius: 10,
    marginVertical: 9,
    paddingVertical: 11,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
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
    color: '#000',
    fontSize: 15,
  },
  signupButton: {
    color: '#bd157a',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Introduction;

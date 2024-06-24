import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
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
import {crownsend} from './Components/crownSendind';
import axios from 'axios';
import { API } from './Apimanager';

const Home = ({navigation,route}) => {
  const { data} = route.params;
// console.log("dTaaa",data.pic);
  const [dimension, setDimension] = useState(Dimensions.get('window'));

  const [visibleModel, setVisibleModel] = useState(false);
  const [sendCrown, setSendCrown] = useState(false);
  const [Crown, setCrown] = useState(false);

  const [visibleHeart, setVisibleHeart] = useState(false);
  const [visibleHeartModel, setVisibleHeartModel] = useState(null);
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    // return () => {
    //   Dimensions.removeEventListener('change', onChange);
    // };
  });

  // const handleLikes = async () => {
  //   setSendCrown(!sendCrown);
  //   const id =data.id ;

  //   await crownsend(id,sendCrown);
  // };


const  crownsend = async()=> {

    try {
         const uid = await AsyncStorage.getItem('profileUid');
        const id =data.id ;
        await axios.post(`${API.PROFILE.CROWN}/${id}`, {id: id,uid:uid})
            .then(response => {
                console.log('Liked');
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    } catch (error) {
        console.log(error);
    }

}
const  crownlike = async()=> {

    try {
         const uid = await AsyncStorage.getItem('profileUid');
        const id =data.id ;
        await axios.post(`${API.PROFILE.LIKE}/${id}`, {id: id,uid:uid})
            .then(response => {
                console.log('Liked');
                // console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    } catch (error) {
        console.log(error);
    }

}
  // const _renderButton = (text, onPress) => (
  //     <TouchableOpacity onPress={onPress}>
  //         <View style={styles.button}>
  //             <Text>{text}</Text>
  //         </View>
  //     </TouchableOpacity>
  // );

  // const heartModal = () => {
  //     return (
  //         <View style={{ borderTopRightRadius: dimension.width * 0.05, borderTopLeftRadius: dimension.width * 0.05, height: dimension.height * 0.45, backgroundColor: 'white' }}>
  //             <TouchableOpacity style={{ marginTop: -dimension.height * 0.03, alignItems: 'center' }}  >
  //                 <Image source={require('../../assets/Images/heart.png')} />
  //             </TouchableOpacity>
  //             <Text style={{ fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', width: dimension.width * 0.8, marginTop: dimension?.height * 0.05, color: '#15224F', fontSize: 20, }}>
  //             What do you like about my pic?
  //             </Text>
  //             <TextInput style={{ ...styles.inputBox, height: 40, width: dimension.width * 0.8, }} placeholder="Write something here"
  //                 placeholderTextColor="black" selectionColor="#000"
  //             />
  //             <Button title={'Send Admire!'} onPress={() => { setVisibleHeart(null); setVisibleHeartModel(null); navigation.navigate('Request')}} />
  //             <Text style={{ position: 'absolute', fontWeight: 'bold', textAlign: 'center', alignSelf: 'center', width: dimension.width * 0.8, marginTop: dimension?.height * 0.35, color: 'black', fontSize: 16, }}>
  //                 I changed my mind
  //             </Text>

  //         </View>
  //     )

  // };

  return (
    <View
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontWeight: '600',
              marginLeft: 30,
            }}>
            Dating For You
          </Text>
        </View>
        <View style={{width: 30}}></View>
      </View>
      <ImageBackground
        style={{
          borderTopLeftRadius: dimension.width * 0.05,
          borderTopRightRadius: dimension.width * 0.05,
          width: dimension.width * 0.9,
          height: dimension.height * 0.8,
          alignSelf: 'center',
          marginTop: 20,
        }}
        resizeMode={'stretch'}
        // source={require('../../assets/Images/start.png')}
        source={{uri:data.pic}}
        >
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
            height: dimension.height * 0.1,
            width: dimension.width * 0.9,
            alignSelf: 'center',
            alignItems: 'center',
            // marginTop: dimension.height * 0.6,
            textAlign: 'center',
            bottom: 80,
          }}>
          <TouchableOpacity style={{padding: 20}}>
            <Image source={require('../../assets/Images/delete.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 20, alignItems: 'center'}}
            onPress={
              () => {
                setVisibleModel(true);
              }
              // navigation.navigate("MakeOffer")
            }>
            <Image source={require('../../assets/Images/royal.png')} />
            <Image
              style={{position: 'absolute', alignSelf: 'center', marginTop: 30}}
              source={require('../../assets/Images/mark.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: 20}}
            onPress={() => {
              setVisibleHeart(true);
            }}>
            <Image source={require('../../assets/Images/favourite.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 10,
            justifyContent: 'space-between',
            backgroundColor: ' rgba(0, 0, 0, 0.7)',
            height: dimension.height * 0.1,
            width: dimension.width * 0.9,
            alignSelf: 'center',
            position: 'absolute',
            //   marginTop: dimension.height * 0.725,
            borderWidth: 1,
            borderColor: '#E63A96',
            bottom: 0,
          }}>
          <Text
            style={{color: 'white', textAlignVertical: 'center', fontSize: 20}}>
          {data.name} ,26
          </Text>
          <Text
            style={{color: 'white', textAlignVertical: 'center', fontSize: 14}}>
            just close to you
          </Text>
        </View>
      </ImageBackground>

      {/* <Modal
                isVisible={visibleHeartModel === 1}
                style={styles.bottomModal}
            >
                {heartModal()}
            </Modal> */}
      <View
        style={
          visibleHeart
            ? {...styles.container}
            : {display: 'none', ...styles.container}
        }>
        <Image
          resizeMode={'stretch'}
          source={require('../../assets/Images/whiteheart.png')}
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: dimension.height * 0.2,
            width: dimension.width * 0.3,
            height: dimension.width * 0.3,
          }}
        />
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            width: dimension.width * 0.8,
            marginTop: dimension.height * 0.4,
          }}>
          What do you like about my pic?
        </Text>
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            color: 'white',
            fontSize: 12,
            textAlign: 'center',
            width: dimension.width * 0.8,
            marginTop: dimension.height * 0.45,
          }}>
          Send Message
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: dimension.height * 0.5,
            paddingHorizontal: dimension.width * 0.08,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Queen');
              // setVisibleHeart(false);
              crownlike()
            }}
            style={{
              ...styles.loginScreenButton2,
              marginTop: dimension.height * 0.02,
              width: dimension.width * 0.4,
              height: dimension.height * 0.07,
              borderRadius: dimension.height * 0.035,
            }}
            // onPress={() => navigate('HomeScreen')}
            underlayColor="#fff">
            <Text style={styles.loginText2}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.loginScreenButton,
              marginTop: dimension.height * 0.02,
              width: dimension.width * 0.4,
              height: dimension.height * 0.07,
              borderRadius: dimension.height * 0.035,
            }}
            onPress={() => setVisibleHeart(false)}
            underlayColor="#fff">
            <Text style={styles.loginText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
      {visibleModel == true ? (
        <Modal isVisible={visibleModel === true} style={styles.bottomModal}>
          <View
            style={{
              flex: 1,
              // backgroundColor:"#000"
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
            <View style={{height: height * 0.45}}></View>
            <View
              style={{
                backgroundColor: 'white',
                height: height * 0.6,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              }}>
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  position: 'absolute',
                  top: -30,
                  alignSelf: 'center',
                }}>
                <Image source={require('../../assets/Images/royal.png')} />
                <Image
                  style={{
                    position: 'absolute',
                    alignSelf: 'center',
                    marginTop: 10,
                  }}
                  source={require('../../assets/Images/mark.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  alignSelf: 'center',
                  width: dimension.width * 0.7,
                  marginTop: dimension?.height * 0.08,
                  color: '#15224F',
                  fontSize: 20,
                }}>
                Make sure he notices you by sending a queen crown
              </Text>
              <TextInput
                style={{
                  ...styles.inputBox,
                  height: 40,
                  width: dimension.width * 0.8,
                }}
                placeholder="Write something here"
                placeholderTextColor="black"
                selectionColor="#000"
                // onChangeText={setCrown()}
              />

              <TouchableOpacity
                style={{
                  ...styles.loginScreenButton1,
                  width: dimension.width * 0.8,
                  height: dimension.height * 0.07,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 50,
                }}
                onPress={() => {
                  navigation.navigate('Requesst');
                  crownsend();
                  setSendCrown(sendCrown)
                  
                }}
                underlayColor="#fff">
                <Text style={styles.loginText}>Send Admire!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisibleModel(false);
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignSelf: 'center',
                    width: dimension.width * 0.8,
                    // marginTop: dimension?.height * 0.4,
                    color: 'black',
                    fontSize: 16,
                  }}>
                  I changed my mind
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}

      {/* {=========================================Bottombar==============================} */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Dashboard');
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
              stroke="#F35BAC"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <Path
              d="M8.19922 17.3499C8.19922 15.3574 9.81444 13.7422 11.8069 13.7422V13.7422C13.7994 13.7422 15.4146 15.3574 15.4146 17.3499V23.6768H8.19922V17.3499Z"
              fill="#F35BAC"
              fill-opacity="0.15"
              stroke="#F35BAC"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <Path
              d="M10.2607 8.60754H13.353"
              stroke="#F35BAC"
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
            style={{height: 30, width: 30, tintColor: '#9EA2BE'}}
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
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(229, 58, 150, 0.8)',
    width: '100%',
    height: '120%',

    // background: linear - gradient('180deg', rgba(229, 58, 150, 0), '#E53A96', '47.66%'),
    // borderRadius: 30
  },
  background: {
    position: 'absolute',
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

  button: {
    backgroundColor: 'lightblue',
    padding: 12,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  bottomModal: {
    // justifyContent: 'flex-end',
    // margin: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  inputBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: 'black',
    marginVertical: 20,
  },
  loginScreenButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginScreenButton1: {
    alignSelf: 'center',
    backgroundColor: '#F35BAC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginScreenButton2: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E63A96',
    textAlign: 'center',
    alignItems: 'center',
  },
  loginText2: {
    color: '#E63A96',
    textAlign: 'center',
    lineHeight: 50,
    fontSize: 16,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default Home;

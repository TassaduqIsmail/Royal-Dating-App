import AsyncStorage from '@react-native-async-storage/async-storage';
import StripeProvider from './Components/stripe/StripeProvide';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API} from './Apimanager';
import axios from 'axios';

// import Slider from '@react-native-community/slider';

const RoyalGold = ({navigation}) => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [id, setId] = useState();
  const [booll, setbooll] = useState(false);
  const [stripe, setstripe] = useState(false);
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });
  const [pricee, setPrice] = useState(0);
  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const uid = await AsyncStorage.getItem('profileUid');
        console.log(uid);
        const response = await axios.get(API.PAYMENT.GET_SUB_STATUS);
        const subscriptions = response?.data?.data;
        console.log(subscriptions);
        const countSub = subscriptions?.filter(
          item => item?.subStatus == 'subscribed' && item?.subcriberId == uid,
        );
        console.log('sub status ', countSub);
        let totalprice = 0;
        countSub.forEach(price => {
          totalprice += Number(price?.price);
        });
        console.log('sdgsdf', totalprice);
        setPrice(countSub);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    getSubscriptions();
  }, []);
  console.log('status==========0', pricee);
  const uid = async () => {
    const id = await AsyncStorage.getItem('profileUid');
    setId(id);
  };
  const price = 10020;
  const {height, width} = Dimensions.get('window');
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
          Royal Gold
        </Text>

        <View style={{width: 30}}></View>
      </View>
      {/* <Image
                style={{ borderTopLeftRadius: dimension.width * 0.05, borderTopRightRadius: dimension.width * 0.05, width: dimension.width * 0.9, height: dimension.height * 0.2, alignSelf: 'center', marginTop: 20 }}
                resizeMode={'stretch'} source={require('../../Image/royalgold.png')} /> */}

      <ImageBackground
        style={{
          borderTopLeftRadius: dimension.width * 0.05,
          borderTopRightRadius: dimension.width * 0.05,
          width: dimension.width * 0.9,
          height: dimension.height * 0.25,
          alignSelf: 'center',
          marginTop: 20,
        }}
        resizeMode={'stretch'}
        source={require('../../assets/Images/royalgold.png')}
      />
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', '#ffffff']}
        style={{
          width: dimension.width * 0.9,
          height: dimension.height * 0.4,
          marginTop: 20,
          alignSelf: 'center',
          position: 'absolute',
        }}></LinearGradient>
      <Image
        style={{alignSelf: 'center', marginTop: -dimension.height * 0.05}}
        source={require('../../assets/Images/royalgold2.png')}
      />

      <Text
        style={{
          textAlignVertical: 'top',
          width: dimension.width * 0.9,
          borderColor: '#6E7077',
          fontWeight: 'bold',
          marginLeft: dimension?.width * 0.05,
          marginTop: dimension?.height * 0.03,
          color: '#15224F',
          fontSize: 24,
          textAlign: 'center',
        }}>
        Like Without Limits
      </Text>
      <Text
        style={{
          textAlignVertical: 'top',
          width: dimension.width * 0.7,
          alignSelf: 'center',
          borderColor: '#6E7077',
          marginLeft: dimension?.width * 0.05,
          marginTop: dimension?.height * 0.01,
          color: '#6E7077',
          fontSize: 18,
          textAlign: 'center',
        }}>
        With our new exciting features
      </Text>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignSelf: 'center',
          width: dimension.width * 0.9,
        }}>
        {pricee?.subStatus !== 'subscribed' ? booll === true ? (
          <Modal animationType="slide" transparent={true} visible={booll}>
            <TouchableOpacity
              onPress={() => setbooll(false)}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',

                // width: dimension.width * 0.4,
                // height: dimension.height * 0.4,
                // marginLeft: dimension.width * 0.05,
              }}>
              <StripeProvider
                payData={{
                  price: price,
                }}
              />
            </TouchableOpacity>
          </Modal>
        ) : null:null}

        <TouchableOpacity
          onPress={() => {
            setbooll(!booll);
          }}>
          <View
            style={{
              width: dimension.width * 0.4,
              height: dimension.height * 0.4,
              marginLeft: dimension.width * 0.05,
            }}>
            <Text
              style={{
                zIndex: 10,
                fontSize: 18,
                backgroundColor: '#FFB849',
                color: 'white',
                alignSelf: 'center',
                textAlignVertical: 'center',
                textAlign: 'center',
                fontWeight: 'bold',
                //   width: '80%',
                //   height: dimension.height * 0.06,
                borderRadius: dimension.height * 0.03,
                padding: 10,
              }}>
              Most Popular
            </Text>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#FFECF6',
                height: dimension.height * 0.28,
                borderRadius: dimension.height * 0.02,
                marginTop: -dimension.height * 0.03,
              }}>
              <Text
                style={{
                  fontSize: 50,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: '#E53A96',
                }}>
                12
              </Text>
              <Text
                style={{
                  fontSize: 30,
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: '#E53A96',
                }}>
                month
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  alignSelf: 'center',
                  color: '#15224F',
                }}>
                $150.00
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(229, 58, 150, 0.8)',
    width: '100%',
    height: '120%',

    // background: linear - gradient('180deg', rgba(229, 58, 150, 0), '#E53A96', '47.66%'),
    // borderRadius: 30
  },
  inputBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 12,
    color: '#6E7077',
    borderBottomWidth: 2,
    borderColor: 'black',
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default RoyalGold;

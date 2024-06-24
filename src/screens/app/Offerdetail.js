import React, {useEffect, useState, useRef, useCallback} from 'react';
import Share from 'react-native-share';
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
  Button,
} from 'react-native';
const OfferDetails = ({navigation}) => {
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
  // const shareProfile = async item => {
  //   try {
  //     const shareOptions = {
  //       username: currentProfile?.username,
  //       name: currentProfile?.name,
  //       // imageUrl: currentProfile?.pic_url,
  //       url: `${currentProfile?.pic_url}`,
  //     };
  //     await Share.open(shareOptions);
  //   } catch (error) {
  //     console.error('Error sharing article:', error);
  //   }
  // };
  const {width, height} = Dimensions.get('window');
  const sharoffer = async item => {
    try {
      const shareOptions = {
        // url: item?.sourl,
        // username: currentProfile?.username,
        // name: currentProfile?.name,
        // // imageUrl: currentProfile?.pic_url,
        // url: `${currentProfile?.pic_url}`,

        title: 'Hello',
        // message: item?.content,
        // imageUrl: item?.image,
        // url: `${item?.sourl}`,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing article:', error);
    }
  };
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
          Offers Detail
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <View
        style={{
          paddingHorizontal: dimension.width * 0.1,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: dimension.width * 0.9,
          marginTop: dimension.height * 0.1,
        }}>
        <View
          style={{
            textAlignVertical: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            Bookmyshow
          </Text>
          <Text style={{color: '#E53A96', fontSize: 12, fontWeight: 'bold'}}>
            Movie tickets
          </Text>
          <Text
            style={{
              color: '#E53A96',
              fontSize: 18,
              fontWeight: 'bold',
              marginTop: 20,
            }}>
            50% Cash Back
          </Text>
          <Text style={{color: '#6E7077'}}>For couple enter only</Text>
        </View>

        <Image
          source={require('../../assets/Images/qr.png')}
          style={{
            width: dimension.width * 0.25,
            height: dimension.width * 0.25,
          }}
        />
      </View>
      <View
        style={{
          paddingBottom: 10,
          // borderBottomWidth: 0.5,
          borderColor: '#6E7077',
          marginTop: dimension.height * 0.05,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: dimension.width * 0.8,
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
          Description
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // width: dimension.width * 0.12,
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../../assets/Images/save.png')}
              style={{width: 25, height: 25, marginRight: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={sharoffer}>
            <Image
              source={require('../../assets/Images/share.png')}
              style={{width: 22, height: 22}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          color: '#6E7077',
          width: dimension.width * 0.8,
          alignSelf: 'center',
          marginTop: dimension.height * 0.05,
        }}>
        With our new exciting features With our new exciting features.
        {'\n'}
      </Text>
      <View style={{marginTop: dimension.height * 0.07}}>
        <Text
          style={{
            color: 'black',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Coupon Code
        </Text>
        <Text
          style={{
            color: '#E53A96',
            fontSize: 36,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          Flat 50
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
            marginTop: 50,
          }}
          // onPress={()=>{navigation.navigate("SearchResult")}}
          underlayColor="#fff">
          <Text style={styles.loginText}>BUY NOW</Text>
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

export default OfferDetails;

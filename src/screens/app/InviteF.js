import React, {useEffect, useState, useRef, useCallback} from 'react';
import { TouchableOpacity } from 'react-native';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Button,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const InvitF = ({navigation}) => {
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
const {height,width}=Dimensions.get("window")
  return (
    <View style={{}}>
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
          Profile
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <LinearGradient
        colors={['rgba(229, 58, 150, 20)', '#ff0096']}
        style={styles.container}>
        <ImageBackground
          resizeMode={'stretch'}
          source={require('../../assets/Images/splash.png')}
          style={styles.background}
        />
      </LinearGradient>
      <Image
        resizeMode={'stretch'}
        source={require('../../assets/Images/goldmark.png')}
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
          fontSize: 24,
          textAlign: 'center',
          width: dimension.width * 0.8,
          marginTop: dimension.height * 0.4,
        }}>
        You can join your friends and get 25% discount off membership
      </Text>
      <Text
        style={{
          position: 'absolute',
          alignSelf: 'center',
          color: 'white',
          fontSize: 18,
          textAlign: 'center',
          width: dimension.width * 0.8,
          marginTop: dimension.height * 0.55,
        }}>
        You've got an amazing story now you are in Royaltydating soon tell us
        what you're looking for in your future partner.
      </Text>
      {/* <View
        style={{
          alignSelf: 'center',
          position: 'absolute',
          marginTop: dimension.height * 0.75,
        }}> */}
        <TouchableOpacity
                
                style={{
                  ...styles.loginScreenButton,
                  width: dimension.width * 0.8,
                  height: dimension.height * 0.07,
                  borderRadius: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                //   marginTop: 50,
                    position: 'absolute',
                }}
                // onPress={()=>{navigation.navigate("SearchResult")}}
                underlayColor="#fff">
                <Text style={styles.loginText}>REFER PEOPLE!</Text>
              </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',

    // background: linear - gradient('180deg', rgba(229, 58, 150, 0), '#E53A96', '47.66%'),
    // borderRadius: 30
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loginScreenButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E63A96',
    textAlign: 'center',
    alignItems: 'center',bottom:50
  },
  loginText: {
    color: '#E63A96',
    textAlign: 'center',

    fontSize: 20,
  },
 
});

export default InvitF;

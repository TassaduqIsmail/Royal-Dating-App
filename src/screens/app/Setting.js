import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Switch,
  FlatList,
  TextInput,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

// import Slider from '@react-native-community/slider';

const Settings = ({navigation}) => {
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
  const [Mess, setMess] = useState(false);
  const [Like, setLike] = useState(false);
  const [Othern, setOthern] = useState(false);
  const [Insta, setInsta] = useState(false);
  const [Face, setFace] = useState(false);
  const [Terms, setTerms] = useState(false);
  const [Policy, setPolicy] = useState(false);

  const {height, width} = Dimensions.get('window');
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
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
          Settings
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.03,
          width: dimension.width * 0.9,
          alignSelf: 'center',
          borderBottomWidth: 0.5,
          borderColor: '#6E7077',
        }}>
        <Text
          style={{
            color: '#F35BAC',
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom: dimension.height * 0.02,
          }}>
          Notification
        </Text>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Message
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setMess(value)}
          value={Mess}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Like
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setLike(value)}
          value={Like}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Other Notifications
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setOthern(value)}
          value={Othern}
        />
      </View>
      </View>

      <View
        style={{
          marginTop: dimension.height * 0.03,
          width: dimension.width * 0.9,
          alignSelf: 'center',
          borderBottomWidth: 0.5,
          borderColor: '#6E7077',
        }}>
        <Text
          style={{
            color: '#F35BAC',
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom: dimension.height * 0.02,
          }}>
          Connected Accounts
        </Text>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Instagram
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setInsta(value)}
          value={Insta}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Facebook
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setFace(value)}
          value={Face}
        />
      </View>
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.03,
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: dimension.width * 0.9,
          borderBottomWidth: 0.5,
          borderColor: '#6E7077',
          alignSelf: 'center',
        }}>
        <Text
          style={{color: '#6E7077', fontSize: 14, textAlignVertical: 'center'}}>
          Distance Unit
        </Text>
        <TextInput
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlignVertical: 'center',
            paddingVertical: 5,

          }}
        placeholder='Miles' 
        placeholderTextColor={"#000"}
        />
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.03,
          width: dimension.width * 0.9,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: '#F35BAC',
            fontSize: 18,
            fontWeight: 'bold',
            paddingBottom: dimension.height * 0.02,
          }}>
          Legal
        </Text>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Terms & Conditions of use
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setTerms(value)}
          value={Terms}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 5,
          width: width * 0.95,
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
         Privacy Policy
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setPolicy(value)}
          value={Policy}
        />
      </View>
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

export default Settings;

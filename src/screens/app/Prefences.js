import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Switch,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Button, Slider} from 'react-native-elements';
// import Slider from '@react-native-community/slider';

const Preferences = ({navigation}) => {
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
  const [age,setAge]=useState(18)
  const [distance,setdistance]=useState(0)
  const [Men,setmen]=useState(false)
  const [WoMen,setWomen]=useState(false)
  const [AgeHide,setAgeHide]=useState(false)
  const [StaHide,setStaHide]=useState(false)
  const [DisHide,setDisHide]=useState(false)


  const handlemen=()=>{
    setmen(!Men)
    setWomen(false)
  }
  const handlewomen=()=>{
    setmen(false)
    setWomen(!WoMen)
  }


  const Item = ({title}) => {
    const [toggle, setToggle] = useState(false);

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          {title}
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={value => setToggle(value)}
          value={toggle}
          style={{width: 80, height: 50}}
        />
      </View>
    );
  };
const {height,width}=Dimensions.get("window")
  return (
    <View
      style={{
        backgroundColor: 'white',
    flex:1
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
          Preferences
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
            <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Men
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={
            
            handlemen}
          value={Men}
          style={{width: 80, height: 50}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Women
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={
            
            handlewomen}
          value={WoMen}
          style={{width: 80, height: 50}}
        />
      </View>
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.03,
          alignSelf: 'center',
          height: dimension.height * 0.1,
          width: dimension.width * 0.9,
        }}>
        <Text
          style={{
            color: '#6E7077',
            textAlignVertical: 'center',
            textAlign: 'left',
          }}>
          Age
        </Text>
        {/* <Slider
          style={{height: 40, width: dimension.width * 0.9}}
          minimumValue={0}
          maximumValue={10}
          width={5}
          minimumTrackTintColor="#E63A96"
          maximumTrackTintColor="#000000"
          thumbImage={require('../../assets/Images/Oval.png')}
          thumbTintColor="#E63A96"
        /> */}
                 <Slider
                    value={age}
                    onValueChange={setAge}
                    minimumValue={18}
                    maximumValue={60}
                    minimumTrackTintColor="#F35BAC" // Light blue color
                    maximumTrackTintColor="#EAEBEC"
                    
                    step={1}
                    thumbStyle={{
                      backgroundColor: '#FFF',
                      height: 20,
                      width: 20,borderWidth:5,borderColor:"#F35BAC"
                    }}
                    trackStyle={{height: 5, borderRadius: 20}}
                
                      />

        <View
          style={{
            flexDirection: 'row',
            width: dimension.width * 0.9,
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#6E7077', textAlignVertical: 'center'}}>
            18
          </Text>
          <Text style={{color: '#000', textAlignVertical: 'center'}}>
            {age} years old
          </Text>
          <Text style={{color: '#6E7077', textAlignVertical: 'center'}}>
            60
          </Text>
        </View>
        <Text
          style={{
            marginTop: dimension.height * 0.03,
            color: '#6E7077',
            textAlignVertical: 'center',
            textAlign: 'left',
          }}>
          Distance
        </Text>
        {/* <Slider
          style={{height: 40, width: dimension.width * 0.9}}
          minimumValue={0}
          maximumValue={10}
          width={5}
          minimumTrackTintColor="#E63A96"
          maximumTrackTintColor="#000000"
        //   thumbImage={require('../../assets/Images/Oval.png')}
          thumbTintColor="#E63A96"
        /> */}
         <Slider
                    value={distance}
                    onValueChange={setdistance}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#F35BAC" // Light blue color
                    maximumTrackTintColor="#EAEBEC"
                    
                    step={1}
                    thumbStyle={{
                      backgroundColor: '#FFF',
                      height: 20,
                      width: 20,borderWidth:5,borderColor:"#F35BAC"
                    }}
                    trackStyle={{height: 5, borderRadius: 20}}
                
                      />
        <View
          style={{
            flexDirection: 'row',
            width: dimension.width * 0.9,
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: '#6E7077', textAlignVertical: 'center'}}>
            0Km
          </Text>
          <Text style={{color: '#6E7077', textAlignVertical: 'center'}}>
            {distance}Km
          </Text>
          <Text style={{color: '#6E7077', textAlignVertical: 'center'}}>
            10Km
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.2,
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
          More Privacy Controls
        </Text>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
          Hide my age
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={()=>{
            
            setAgeHide(!AgeHide)}}
          value={AgeHide}
          style={{width: 80, height: 50}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
        Hide my online status
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={()=>{
            
            setStaHide(!StaHide)}}
          value={StaHide}
          style={{width: 80, height: 50}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#0E0D0D',
            fontSize: 20,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
        Hide my distance
        </Text>
        <Switch
          trackColor={{false: '#6E7077', true: '#F35BAC', alignItems: 'center'}}
          thumbColor="#F35BAC"
          ios_backgroundColor="gray"
          onValueChange={()=>{
            
            setDisHide(!DisHide)}}
          value={DisHide}
          style={{width: 80, height: 50}}
        />
      </View>
      </View>
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
                onPress={()=>{navigation.navigate("Profile")}}
                underlayColor="#fff">
                <Text style={styles.loginText}>Add Preference</Text>
              </TouchableOpacity>
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

export default Preferences;

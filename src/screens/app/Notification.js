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
} from 'react-native';
import {Circle, ClipPath, Defs, G, Mask, Path, Rect, Svg} from 'react-native-svg';

// import Slider from '@react-native-community/slider';

const Notification = ({navigation}) => {
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
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
  ];
  const Item = ({title}) => (
    <TouchableOpacity
      style={{
        // paddingTop: dimension.height * 0.02,
        paddingBottom: 6,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: '#6E7077',
      }}>
      <Image
        source={require('../../assets/Images/avatar1.jpg')}
        style={{
          borderRadius: dimension.width * 0.075,
          width: dimension.width * 0.15,
          height: dimension.width * 0.15,
        }}
      />
      <View
        style={{
          paddingLeft: 10,
          textAlignVertical: 'center',
          paddingVertical: 5,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
          Your new connection is waiting
        </Text>
        <Text style={{color: '#6E7077'}}>28 min ago</Text>
      </View>

    </TouchableOpacity>
  );
  const renderItem = ({item}) => <Item title={item.title} />;

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
        Notifications
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <SafeAreaView
        style={{
          paddingTop: 20,
          width: dimension.width * 0.9,
          height: dimension.height * 0.85,
          alignSelf: 'center',
        }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
       {/* {=========================================Bottombar==============================} */}
       <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
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
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <Path
              d="M8.19922 17.3499C8.19922 15.3574 9.81444 13.7422 11.8069 13.7422V13.7422C13.7994 13.7422 15.4146 15.3574 15.4146 17.3499V23.6768H8.19922V17.3499Z"
              fill="#E0E1EF"
              stroke="#9EA2BE"
              stroke-width="1.5"
              stroke-linejoin="round"
            />
            <Path
              d="M10.2607 8.60754H13.353"
              stroke="#9EA2BE"
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
     <Image source={require("../../assets/Images/2303951.png")} 
     style={{height:30,width:30,tintColor:"#9EA2BE"}}
     
     />

        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Home');
          }}
          style={styles.tab}>
     <Image source={require("../../assets/Images/Bell.png")} 
     style={{height:30,width:30,tintColor:"#F35BAC"}}
     
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
const {height,width}=Dimensions.get("window")
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

});

export default Notification;

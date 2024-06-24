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

// import Slider from '@react-native-community/slider';

const Queen = ({navigation}) => {
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
  ];
  const Item = ({title}) => (
    <View>
      <TouchableOpacity
        style={{
          paddingTop: dimension.height * 0.02,
          paddingBottom: 6,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: '#6E7077',justifyContent:"space-between"
        }}
        onPress={() => {
          navigation.navigate('ChatField');
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              Royaltydating
            </Text>
            <Image
              source={require('../../assets/Images/goldmark.png')}
              style={{
                marginTop: -dimension.height * 0.01,
                marginLeft: dimension.width * 0.01,
                width: dimension.width * 0.08,
                height: dimension.width * 0.08,
              }}
            />
          </View>

          <Text style={{color: '#6E7077'}}>Welcome to Royaltydating</Text>
        </View>
        <Text
          style={{
            color: '#6E7077',
            // marginLeft: dimension.width * 0.15,
            marginTop: dimension.height * 0.05,fontSize:8
          }}>
          28 min ago
        </Text>
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({item}) => <Item title={item.title} />;
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
         Queen
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <SafeAreaView
        style={{
          // paddingTop: 20,
          width: dimension.width * 0.9,
          // height: dimension.height * 0.85,
          flex:1,
          alignSelf: 'center',padding:10
        }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'rgba(229, 58, 150, 0.8)',
    // width: '100%',
    // height: '120%',

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

export default Queen;

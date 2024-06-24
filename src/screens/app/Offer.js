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
import { Path, Svg } from 'react-native-svg';

// import Slider from '@react-native-community/slider';

const Offer = ({navigation}) => {
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
  ];
  const Item = ({title}) => (
    <View>
      <TouchableOpacity
        style={{
          paddingTop: dimension.height * 0.03,
          paddingBottom: 6,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: '#6E7077',alignItems:"center",justifyContent:"space-between"
        }}
        onPress={() => {
          navigation.navigate('OfferDetails');
        }}>
            <View style={{flexDirection:"row"}} >
        <Image
          source={require('../../assets/Images/Card.png')}
          style={{
            width: dimension.width * 0.15,
            height: dimension.width * 0.15,
          }}
        />
        <View
          style={{
            paddingLeft: 10,
            textAlignVertical: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Text style={{color: 'black', fontSize: 18, fontWeight: 'bold'}}>
            Fashion
          </Text>
          <Text style={{color: '#6E7077'}}>3330 offers</Text>
        </View>
        </View>
<View>
<Svg xmlns="http://www.w3.org/2000/svg" width="12" height="30" viewBox="0 0 7 12" fill="none">
  <Path d="M1 11L6 6L1 1" stroke="#CDCACB" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</Svg>
</View>
          {/* style={{
            marginVertical: dimension.width * 0.05,
            marginHorizontal: dimension.width * 0.45,
            width: dimension.width * 0.03,
            height: dimension.width * 0.05,
          }} */}
    
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
         Offers
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <SafeAreaView
        style={{
        //   marginTop: dimension.height * 0.05,
          width: dimension.width * 0.9,
        //   height: dimension.height * 0.8,
          alignSelf: 'center',flex:1
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

export default Offer;

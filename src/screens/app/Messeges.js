import axios from 'axios';
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
import {API} from './Apimanager';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Messages = ({navigation}) => {
  const [dimension, setDimension] = useState(Dimensions.get('window')); 
  const [ddee, setCurrentImages] = useState(); 
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });
  useEffect(() => {
    const getAssets = async () => {
      const uid = await AsyncStorage.getItem('profileUid');
      // console.log('adfasdsf', uid);

      await axios
        .get(`${API.IMAGE_VIDEO.GET_ASSETS}`)
        .then(response => {
          // console.log('assets data', response.data);

          const filteredData = response?.data?.filter(item => item?.uid == uid);
          // console.log('assets', filteredData);
          if (filteredData) {
            const images = filteredData.filter(
              item => item?.pic_format == 'jpg' || item?.pic_format == 'png',
            );
            // console.log('img', images);/
            // console.log('images', images);
            const picData = images.map(item => {
              return {
                format: item?.pic_format,
                pubId: item?.pic_public_id,
                pic_url: item?.pic_url,
                id: item?._id,
                likes: item?.likes,
                likedBy: item?.likedBy,
                views: item?.views,
                ratings: item?.ratings,
              };
            });
            // console.log('pic dta', picData);

            setCurrentImages(picData);
          }
        })
        .catch(error => {
          console.error('Axios POST request error:', error);
        });
    };
    getAssets();
  }, []);

  const [selectedImage, setProfile] = useState(null);
  const [Name, setName] = useState([]);
  const [Pic, setPic] = useState([]);
  const [senderId, setSenderId] = useState([]);
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const uid = await AsyncStorage.getItem('profileUid');
        console.log(uid);
        setSenderId(uid)
        const response = await axios.get(API.PROFILE.GET_ALL_PROFILE);
        console.log('pro res', response.data);
        const filteredData = response?.data?.data?.find(
          item => item.uid === uid,
        );
        const messData = [];

        if (filteredData && filteredData.crownBy) {
          console.log(filteredData.crownBy);
          for (const uid of filteredData.crownBy) {
            const userProfileResponse = await axios.get(`${API.PROFILE.GET_PROFILE}/${uid}`);
            const userProfile = userProfileResponse.data;
            console.log(userProfile);
            messData.push(userProfile);
          }
        }
        const namesAndUrls = messData.map(profile => ({
          name: profile?.data?.name,
          pic_url: profile?.data?.pic_url,
         uid: profile?.data?.uid
        }));
        const crownByNames = namesAndUrls.map(item => item.name);
        const pic = namesAndUrls.map(item => item.pic_url);
        setName(crownByNames)
        setPic(pic)
        console.log('Mess data with profiles of users who sent a crown:', messData);
      
          setProfile(namesAndUrls);
       
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    getProfileData();
  }, []);
  console.log("hello this the data of crownby",selectedImage);
 
  const renderItem = ({title,index,item}) => (
    console.log(item),
    <View>
      <TouchableOpacity
        style={{
          paddingTop: dimension.height * 0.02,
          paddingBottom: 6,
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          borderColor: '#6E7077',
          justifyContent: 'space-between',
        }}
        onPress={() => {
          navigation.navigate('ChatField',{id:item?.uid,senderid:senderId});
        }}>
        <Image
          source={{uri:item?.pic_url || "data:image/png;base64,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"}}
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
            {item?.name || "user"}
          </Text>
          <Text style={{color: '#6E7077'}}>Welcome to Royaltydating</Text>
        </View>
        <Text
          style={{
            color: '#6E7077',
            // marginLeft: dimension.width * 0.15,
            marginTop: dimension.height * 0.05,
            fontSize: 10,
          }}>
          28 min ago
        </Text>
      </TouchableOpacity>
    </View>
  );
  // const renderItem = ({item}) => <Item title={item.title} />;

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
          Messages
        </Text>

        <View style={{width: 30}}></View>
      </View>
      <SafeAreaView
        style={{
          //   paddingTop: 20,
          width: dimension.width * 0.9,
          //   height: dimension.height * 0.85,
          alignSelf: 'center',
          flex: 1,
          marginBottom: 50,
        }}>
        <FlatList
          data={selectedImage}
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
            // navigation.navigate('Longv');
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
              stroke="#E53A96"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Circle cx="7.08444" cy="9.05209" r="1.853" fill="#E53A96" />
            <Circle
              cx="13.5698"
              cy="9.05209"
              r="1.853"
              fill="#F35BAC"
              fill-opacity="0.15"
            />
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
const {width, height} = Dimensions.get('window');
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

export default Messages;

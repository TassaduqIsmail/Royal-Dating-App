import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
  ToastAndroid,
} from 'react-native';
import {Circle, Ellipse, Path, Rect, Svg} from 'react-native-svg';
import {API} from './Apimanager';
import {launchImageLibrary} from 'react-native-image-picker';
import {saveProfileData, updateProfilePic} from './Components/saveProfile';

const Profile = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageAssets, setImageAssets] = useState(null);

  const handleLogout = async () => {
    // Perform logout action
    // For example, clear authentication state, navigate to login screen, etc.
    // After logout, close the modal
    await AsyncStorage.clear();
    setModalVisible(false);
  };

  const [profile, setProfile] = useState(null);
  const [id, setid] = useState(null);
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const uid = await AsyncStorage.getItem('profileUid');
        console.log(uid);
        const response = await axios.get(API.PROFILE.GET_ALL_PROFILE);
        console.log('pro res', response.data);
        const filteredData = response?.data?.data?.find(
          item => item.uid === uid,
        );
        console.log('filter data for display', filteredData);
        setid(filteredData?._id);

        if (filteredData) {
          setProfile({
            name: filteredData.name,
            gender: filteredData.gender,
            aboutme: filteredData.aboutme,
            workandeducation: filteredData.workandeducation,
            profilePic: filteredData.pic_url,
            crowns: filteredData.crownBy,
            crowns: filteredData.crown,
            likes: filteredData.Like,
            pic_public_id: filteredData.pic_public_id,
            id: filteredData._id,
          });
        } else {
          console.log('Profile not found for the current user.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    getProfileData();
  }, [selectedImage]);

  // const openImagePicker = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     includeBase64: true,
  //     maxHeight: 250,
  //     maxWidth: 250,
  //     // storageOptions: {
  //     //   skipBackup: true,
  //     //   path: 'images',
  //     // },
  //   };

  //   launchImageLibrary(options, async response => {
  //     console.log(response);
  //     if (response.didCancel) {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'User cancelled image picker',
  //       });
  //     } else if (response.error) {
  //       Toast.show({
  //         type: 'error',
  //         text1: response.error,
  //       });
  //     } else {
  //       let base64Img = `data:image/jpg;base64,${response?.assets[0].base64}`;
  //       let imageUri = response?.uri || response.assets?.[0]?.uri;

  //       setSelectedImage(imageUri);
  //       setImageAssets(base64Img);
  //       const uid = await AsyncStorage.getItem('profileUid');

  //       const profileData = {
  //         uid: uid,
  //         profilePic: imageAssets,
  //         name: '',
  //         gender: '',
  //         aboutme: '',
  //         workandeducation: {
  //           company: '',
  //           role: '',
  //           education: '',
  //         },
  //       };

  //       console.log('data', profileData);

  //       console.log('to chl raha hn finish ');
  //       try {
  //         await axios({
  //           method: 'post',
  //           url: API.PROFILE.SET_PROFILE,
  //           data: JSON.stringify({profileData}),
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         })
  //           .then(async response => {
  //             console.log("res of upload ",response.data);
  //             if (response.data.succes) {
  //               console.log('res', response.data);
  //               await  AsyncStorage.setItem("profileid",response.data.profileId)
  //               ToastAndroid.show(`${response.data.msg}`, ToastAndroid.SHORT);
  //             }
  //           })
  //           .catch(function (error) {
  //             console.log('err', error);
  //           });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  // };

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 250,
      maxWidth: 250,
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'User cancelled image',
        });
        ToastAndroid.show('User cancelled image', ToastAndroid.SHORT);
      } else if (response.error) {
        ToastAndroid.show(`${response.error}`, ToastAndroid.SHORT);
        // console.log('Image picker error: ', response.error);
      } else {
        let base64Img = `data:image/jpg;base64,${response?.assets[0].base64}`;
        let imageUri = response?.uri || response.assets?.[0]?.uri;
        console.log(base64Img);
        setSelectedImage(imageUri);
        setImageAssets(base64Img);
        const uid = await AsyncStorage.getItem('profileUid');

        const profileData = {
          uid: uid,
          profilePic: imageAssets,
          name: '',
          gender: '',
          aboutme: '',
          workandeducation: {
            company: '',
            role: '',
            education: '',
          },
        };
console.log(profileData);
        try {
          const pic_public_id = profile?.pic_public_id;
          console.log(pic_public_id);
          const proId = profile?.id;
          console.log(proId);
          console.log('pro id ', pic_public_id);

          if (proId == '' || proId == undefined) {
            saveProfileData(profileData);
            // console.log('chll raha hn ');
          } else if (proId) {
            updateProfilePic(imageAssets, pic_public_id, proId);
          }

          // const profileUid = await AsyncStorage.getItem('profileUid');
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // console.log("hello",profile);
  return (
    <View style={styles.container}>
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
      <ScrollView style={{flex: 1, width: width}}>
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            // borderBottomWidth: 1,
            width: '100%',
            borderColor: '#A1A3A7',
            paddingBottom: 10,
          }}
          onPress={() => {
            openImagePicker();
          }}>
          <Image
            source={{
              uri: profile?.profilePic || 'https://via.placeholder.com/150',
            }} // Placeholder image
            style={styles.profilePic}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('RoyalGold');
          }}>
          <Image
            style={{
              alignSelf: 'center',
              marginTop: 20,
              width: width * 0.6,
              height: height * 0.07,
            }}
            resizeMode={'stretch'}
            source={require('../../assets/Images/level.png')}
          />
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
            }}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="35"
                  height="34"
                  viewBox="0 0 25 24"
                  fill="none">
                  <Path
                    d="M17.543 6.42999C17.9258 6.36688 18.3187 6.41647 18.6738 6.57272C19.0289 6.72897 19.3309 6.98513 19.543 7.30999C19.623 7.42999 19.693 7.50999 19.783 7.65999C19.873 7.80999 19.953 7.95999 20.033 8.11999C20.1938 8.45965 20.2556 8.83775 20.2114 9.21093C20.1672 9.58411 20.0187 9.93729 19.783 10.23C19.4005 10.7179 19.1928 11.32 19.193 11.94C19.2009 12.5633 19.4115 13.167 19.793 13.66C20.03 13.9497 20.181 14.3001 20.2287 14.6713C20.2764 15.0426 20.219 15.4198 20.063 15.76C19.9221 16.0453 19.7652 16.3224 19.593 16.59C19.3849 16.9203 19.0846 17.1825 18.7292 17.3442C18.3738 17.506 17.9788 17.5601 17.593 17.5C16.9795 17.4219 16.3573 17.5485 15.823 17.86C15.2843 18.1707 14.8653 18.6531 14.633 19.23C14.4947 19.5954 14.2525 19.9122 13.9361 20.1415C13.6198 20.3707 13.2433 20.5023 12.853 20.52C12.5634 20.54 12.2727 20.54 11.983 20.52C11.5939 20.5031 11.2182 20.373 10.902 20.1456C10.5858 19.9182 10.3429 19.6035 10.203 19.24C9.96434 18.6625 9.53937 18.1815 8.99574 17.8734C8.4521 17.5653 7.82105 17.448 7.20301 17.54C6.82021 17.6031 6.42732 17.5535 6.07221 17.3973C5.7171 17.241 5.4151 16.9848 5.20301 16.66C5.12301 16.54 5.06301 16.43 4.97301 16.28C4.88301 16.13 4.80301 15.98 4.72301 15.82C4.56224 15.4803 4.50042 15.1022 4.54464 14.729C4.58885 14.3559 4.73731 14.0027 4.97301 13.71C5.35549 13.2221 5.56324 12.62 5.56301 12C5.55154 11.3882 5.34481 10.796 4.97301 10.31C4.73601 10.0203 4.58506 9.66989 4.53733 9.29865C4.48959 8.9274 4.547 8.55022 4.70301 8.20999C4.8439 7.92468 5.00082 7.64757 5.17301 7.37999C5.38115 7.04963 5.68145 6.78743 6.03684 6.62573C6.39224 6.46402 6.7872 6.40988 7.17301 6.46999C7.78655 6.54805 8.4087 6.42151 8.94301 6.10999C9.48175 5.79928 9.90075 5.3169 10.133 4.73999C10.2699 4.37762 10.5091 4.06281 10.8216 3.83381C11.134 3.60481 11.5062 3.47147 11.893 3.44999C12.1827 3.43 12.4734 3.43 12.763 3.44999C13.1521 3.46686 13.5278 3.59697 13.844 3.82435C14.1602 4.05173 14.4032 4.36649 14.543 4.72999C14.6058 4.88201 14.6816 5.02735 14.769 5.1646"
                    stroke="#15224F"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M12.373 14.31C13.6488 14.31 14.683 13.2758 14.683 12C14.683 10.7242 13.6488 9.69 12.373 9.69C11.0972 9.69 10.063 10.7242 10.063 12C10.063 13.2758 11.0972 14.31 12.373 14.31Z"
                    stroke="#F35BAC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText}>Settings</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F35BAC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none">
                  <Path
                    d="M4.23138 12.8517L5.73394 17.0255C5.87677 17.4222 6.25314 17.6868 6.67482 17.6868H18.0709C18.4926 17.6868 18.8689 17.4222 19.0118 17.0255L20.5143 12.8517C20.6629 12.439 20.246 12.0487 19.8439 12.2241L16.1305 13.8445C15.8852 13.9515 15.5991 13.8464 15.4814 13.6061L12.8219 8.17315C12.6391 7.79959 12.1066 7.79959 11.9238 8.17315L9.26431 13.6061C9.14664 13.8464 8.86055 13.9515 8.61525 13.8445L4.90179 12.2241C4.49976 12.0487 4.0828 12.439 4.23138 12.8517Z"
                    fill="white"
                  />
                  <Ellipse
                    cx="12.3736"
                    cy="5.0346"
                    rx="1.42241"
                    ry="1.42241"
                    fill="white"
                  />
                  <Path
                    d="M6.76807 20.3875H17.9786"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <Circle cx="2.79595" cy="10.0058" r="1.42241" fill="white" />
                  <Ellipse
                    cx="21.9512"
                    cy="10.0058"
                    rx="1.42241"
                    ry="1.42241"
                    fill="white"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText2}>Subscribe for premium </Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Preferences');
            }}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none">
                  <Rect width="40" height="40" rx="5" fill="#F4F8FC" />
                  <Path
                    d="M11 20.7422H13.9917L16.4648 15.5765C16.5496 15.3944 16.6874 15.2421 16.8602 15.1396C17.033 15.0371 17.2327 14.9891 17.4332 15.0021C17.6337 15.015 17.8256 15.0882 17.9837 15.2121C18.1419 15.3359 18.259 15.5047 18.3197 15.6962L21.3114 24.8607C21.3694 25.0454 21.48 25.2092 21.6296 25.3321C21.7792 25.455 21.9613 25.5317 22.1537 25.5529C22.3462 25.574 22.5406 25.5387 22.7133 25.4512C22.886 25.3637 23.0295 25.2278 23.1263 25.0602L26.0083 20.1438H29"
                    stroke="#1C2D57"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText}>My Preferences</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Queen');
            }}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/Images/goldmark.png')}
                  style={{height: 30, width: 30}}
                />
              </View>
              <Text style={styles.buttonText}>My Queen</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EditIntro');
            }}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none">
                  <Rect width="40" height="40" rx="5" fill="#F4F8FC" />
                  <Path
                    d="M25.549 11H14.451C13.0973 11 12 12.2345 12 13.7574V26.2426C12 27.7655 13.0973 29 14.451 29H25.549C26.9027 29 28 27.7655 28 26.2426V13.7574C28 12.2345 26.9027 11 25.549 11Z"
                    stroke="#1C2D57"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M17 17H21"
                    stroke="#F35BAC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M17 23H24"
                    stroke="#F35BAC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText}>Edit Info</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Offer');
            }}
            style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Image
                  source={require('../../assets/Images/heart.png')}
                  style={{height: 40, width: 40}}
                />
              </View>
              <Text style={styles.buttonText}>My Offers</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('InvitF');
            }}
            style={styles.button2}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F35BAC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none">
                  <Path
                    d="M4.23138 12.8517L5.73394 17.0255C5.87677 17.4222 6.25314 17.6868 6.67482 17.6868H18.0709C18.4926 17.6868 18.8689 17.4222 19.0118 17.0255L20.5143 12.8517C20.6629 12.439 20.246 12.0487 19.8439 12.2241L16.1305 13.8445C15.8852 13.9515 15.5991 13.8464 15.4814 13.6061L12.8219 8.17315C12.6391 7.79959 12.1066 7.79959 11.9238 8.17315L9.26431 13.6061C9.14664 13.8464 8.86055 13.9515 8.61525 13.8445L4.90179 12.2241C4.49976 12.0487 4.0828 12.439 4.23138 12.8517Z"
                    fill="white"
                  />
                  <Ellipse
                    cx="12.3736"
                    cy="5.0346"
                    rx="1.42241"
                    ry="1.42241"
                    fill="white"
                  />
                  <Path
                    d="M6.76807 20.3875H17.9786"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <Circle cx="2.79595" cy="10.0058" r="1.42241" fill="white" />
                  <Ellipse
                    cx="21.9512"
                    cy="10.0058"
                    rx="1.42241"
                    ry="1.42241"
                    fill="white"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText2}>Invite Friends</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none">
                  <Rect width="40" height="40" rx="5" fill="#F4F8FC" />
                  <Path
                    d="M20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29Z"
                    stroke="#1C2D57"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M20.0002 25.4447C20.6173 25.4447 21.1176 24.9445 21.1176 24.3273C21.1176 23.7102 20.6173 23.21 20.0002 23.21C19.3831 23.21 18.8828 23.7102 18.8828 24.3273C18.8828 24.9445 19.3831 25.4447 20.0002 25.4447Z"
                    fill="#1C2D57"
                  />
                  <Path
                    d="M17.7856 16.6175C17.9837 16.1193 18.3499 15.7061 18.8207 15.4496C19.2915 15.1931 19.8372 15.1095 20.3632 15.2133C20.8892 15.317 21.3623 15.6016 21.7005 16.0177C22.0386 16.4337 22.2205 16.955 22.2145 17.4911C22.2145 19.6446 19.9188 19.9087 19.9188 20.7213V21.3613"
                    stroke="#1C2D57"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M20 29C24.9706 29 29 24.9706 29 20C29 15.0294 24.9706 11 20 11C15.0294 11 11 15.0294 11 20C11 24.9706 15.0294 29 20 29Z"
                    stroke="#1C2D57"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M20.0002 25.4447C20.6173 25.4447 21.1176 24.9445 21.1176 24.3273C21.1176 23.7102 20.6173 23.21 20.0002 23.21C19.3831 23.21 18.8828 23.7102 18.8828 24.3273C18.8828 24.9445 19.3831 25.4447 20.0002 25.4447Z"
                    fill="#F35BAC"
                  />
                  <Path
                    d="M17.7856 16.6175C17.9837 16.1193 18.3499 15.7061 18.8207 15.4496C19.2915 15.1931 19.8372 15.1095 20.3632 15.2133C20.8892 15.317 21.3623 15.6016 21.7005 16.0177C22.0386 16.4337 22.2205 16.955 22.2145 17.4911C22.2145 19.6446 19.9188 19.9087 19.9188 20.7213V21.3613"
                    stroke="#F35BAC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText}>Help</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.button3}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#F4F8FC',
                  padding: 5,
                  borderRadius: 10,
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none">
                  <Rect width="40" height="40" rx="5" fill="#F4F8FC" />
                  <Path
                    d="M20.8501 12H15.7758C15.0396 12 14.3336 12.2925 13.813 12.813C13.2925 13.3336 13 14.0396 13 14.7758V25.2241C13 25.9604 13.2925 26.6664 13.813 27.187C14.3336 27.7075 15.0396 28 15.7758 28H20.8501"
                    stroke="#1C2D57"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M23.4263 15.4086L28.0342 20.0054L23.4263 24.6022"
                    stroke="#F35BAC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <Path
                    d="M28.0342 20.0055H17.9634"
                    stroke="#F35BAC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </Svg>
              </View>
              <Text style={styles.buttonText}>Log out</Text>
            </View>
            <View>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="24"
                viewBox="0 0 8 14"
                fill="none">
                <Path
                  d="M1 1L7 7L1 13"
                  stroke="#C8C9CF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        // visible={visible}
        onRequestClose={() => setModalVisible(false)}
        visible={modalVisible}
        // onClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredVieww}>
          <View style={styles.modalVieww}>
            <Text style={styles.modalTextw}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.buttonContainerw}>
              <TouchableOpacity
                style={[styles.buttonw, styles.cancelButtonw]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextw}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonw, styles.logoutButtonw]}
                onPress={() => {
                  navigation.navigate('Introduction');
                }}>
                <Text style={styles.buttonTextw}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            // navigation.navigate('Profile');
          }}
          style={styles.tab}>
          <Svg
            width="35"
            height="35"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Circle cx="12.369" cy="11.6154" r="10.8231" fill="white" />
            <Path
              d="M18.9597 20.0932C17.7402 17.6917 15.2468 16.0461 12.369 16.0461C9.49121 16.0461 6.99777 17.6917 5.77832 20.0932C9.88004 23.1738 14.7324 23.1357 18.9597 20.0932Z"
              fill="#FABBDD"
            />
            <Path
              d="M18.9597 20.0932C17.7402 17.6917 15.2468 16.0461 12.369 16.0461C9.49121 16.0461 6.99777 17.6917 5.77832 20.0932"
              stroke="#E53A96"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Circle
              cx="12.3692"
              cy="9.47836"
              r="3.65536"
              fill="#FABBDD"
              stroke="#E53A96"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <Circle
              cx="12.369"
              cy="11.6154"
              r="10.8231"
              stroke="#E53A96"
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    alignSelf: 'center',
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
    alignSelf: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: width * 0.8,
    alignItems: 'center',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button3: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: width * 0.8,
    alignItems: 'center',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
  },
  button2: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    width: width * 0.8,
    alignItems: 'center',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonText2: {
    color: '#F35BAC',
    fontSize: 16,
    marginLeft: 10,
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
  centeredVieww: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalVieww: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTextw: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#000',
    fontSize: 20,
    width: width * 0.5,
  },
  buttonContainerw: {
    flexDirection: 'row',
  },
  buttonw: {
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
  },
  cancelButtonw: {
    backgroundColor: '#ccc',
  },
  logoutButtonw: {
    backgroundColor: 'red',
  },
  buttonTextw: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Profile;

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Button,
} from 'react-native';
import {API} from './Apimanager';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import {
  saveProfileData,
  updateName,
  updateUserName,
} from './Components/saveProfile';

// import Slider from '@react-native-community/slider';

const EditIntro = ({navigation}) => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [name, setName] = useState('');
  const [Gender, setGender] = useState('');
  const [aboutme, setaboutme] = useState('');
  const [workandeducation, setworkandeducation] = useState('');
  const [company, setcompany] = useState('');
  const [role, setrole] = useState('');
  const [education, seteducation] = useState('');
  const [selectedGender, setSelectedGender] = useState(null);
  const handleInputChange = (text, fieldIndex) => {
    // Split the current value into an array of lines
    const lines = workandeducation.split('');

    // Update the line corresponding to the field index with the new text
    lines[fieldIndex] = text;

    // Join the lines back into a single string with newline characters
    const updatedValue = lines.join('');

    // Update the state with the new combined value
    setworkandeducation(updatedValue);
  };

  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });
  const [profile, setProfile] = useState(null);
  const [id, setid] = useState();
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const uid = await AsyncStorage.getItem('profileUid');
        console.log('hello thus is ', uid);
        const response = await axios.get(API.PROFILE.GET_ALL_PROFILE);
        console.log('id id tshey', response.data);
        const filteredData = response?.data?.data?.find(
          item => item.uid === uid,
        );
        console.log(filteredData);
        setid(filteredData?._id);
        if (filteredData) {
          setProfile({
            name: filteredData.name,
            gender: filteredData.gender,
            aboutme: filteredData.aboutme,
            workandeducation: filteredData.workandeducation,
            crowns: filteredData.crownBy,
            crown: filteredData.crown,
            likes: filteredData.like,
          });
        } else {
          console.log('Profile not found for the current user.');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    getProfileData();
  }, []);
  // console.log(profile);

  const handleGenderChange = value => {
    setSelectedGender(value);
  };
  const genderOptions = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];
  // const handleFinished = async () => {
  //   const uid = await AsyncStorage.getItem('profileUid');

  //   const profileData = {
  //     crown: '',
  //     // crownby: [],
  //     uid: uid,
  //     name: name,
  //     gender: selectedGender,
  //     aboutme: aboutme,
  //     workandeducation: {
  //       company: company,
  //       role: role,
  //       education: education,
  //     },
  //   };

  //   console.log('data', profileData);
  //   console.log('to chl raha hn finish ');
  //   try {
  //     await axios({
  //       method: 'post',
  //       url: API.PROFILE.SET_PROFILE,
  //       data: JSON.stringify({profileData}),
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(response => {
  //         console.log('res', response?.data.profileId);
  //         if (response?.data?.succes == true) {
  //           AsyncStorage.setItem('profileid', response?.data.profileId);
  //           ToastAndroid.show(
  //             'profile  create Successfully',
  //             ToastAndroid.SHORT,
  //           );

  //           // navigation.navigate('Home');
  //           // await AsyncStorage.setItem('profile', JSON.stringify(profileData[0]?._id));
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log('err', error);
  //       });
  //   } catch (error) {
  //     ToastAndroid.show('Error: ' + error, ToastAndroid.SHORT);
  //   }
  // };

  const handleNameChange = text => {
    setName(text);
  };
  // const handleabutmechange = text => {
  //   setaboutme( text);
  // };
  const [edited, setEdited] = useState(false);

  const handlUserNameChange = text => {
    setaboutme(text);
  };

  const saveChanges = async () => {
    const currentProfileUid = id
    const Uid = await AsyncStorage.getItem('profileUid');
    console.log('change ', Uid);
    console.log(currentProfileUid);
    // const profileData = {
    //   crown: '',
    //   uid: uid,
    //   name: name,
    //   gender: selectedGender,
    //   aboutme: aboutme,
    //   workandeducation: {
    //     company: company,
    //     role: role,
    //     education: education,
    //   },
    const profileData = {
      uid: id,
      name: name == ""? profile?.name:name,
      gender: selectedGender == ""?profile?.gender : selectedGender,
      aboutme: aboutme == ""?profile?.aboutme : aboutme,
      workandeducation: {
        company: company == "" ? profile?.workandeducation?.company : company,
        role: role == "" ? profile?.workandeducation?.role:role,
        education: education == ""?profile?.workandeducation?.education : education,
      },
    };
    console.log('Profile Data:', profileData);

    try {
      // ToastAndroid.show('Username and About Me are required', ToastAndroid.SHORT);
      if (!profileData.uid) {
        ToastAndroid.show('UID is missing', ToastAndroid.SHORT);
      } else {
        updateName(profileData, currentProfileUid);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const saveChanges = async () => {
  //   const uid = await AsyncStorage.getItem('profileUid');
  //   const profileData = {
  //     crown: '',
  //     // crownby: [],
  //     uid: uid,
  //     name: name,
  //     gender: selectedGender,
  //     aboutme: aboutme,
  //     workandeducation: {
  //       company: company,
  //       role: role,
  //       education: education,
  //     },
  //   };
  //   console.log('djdui', profileData);
  //   try {
  //     // const profileUid = await AsyncStorage.getItem('profileUid');
  //     // console.log('userName', profileUid);

  //     if (profileData?.name || profileData?.aboutme != '') {
  //       ToastAndroid.show('Username is required', ToastAndroid.SHORT);
  //     } else if (profileData.uid == '' || profileData.uid == undefined) {
  //       const name = name;

  //       saveProfileData(
  //         (profileData.name = ''),
  //         profileData.aboutme,
  //         (price = ''),
  //         (base64Img = ''),
  //       );
  //       console.log('chll raha hn ');
  //     } else if (profileData.uid !== '' || profileData.uid !== undefined) {
  //       console.log(profileData);
  //       const username = profileData;
  //       updateUserName(username, profileData.uid);
  //     }
  //   } catch (error) {
  //     console.error(' error:', error);
  //   }
  // };

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
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Image source={require('../../assets/Images/Back.png')} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginTop: dimension.height * 0.07,
          flexDirection: 'row',
          alignSelf: 'center',
          width: dimension.width * 0.9,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextInput
          style={{
            // textAlignVertical: 'bottom',
            fontSize: 30,
            fontWeight: 'bold',
            color: '#000',
          }}
          placeholder={profile?.name}
          placeholderTextColor={'#000'}
          value={name}
          // value={name}
          onChangeText={handleNameChange}
        />
        <Text
          style={{
            // textAlignVertical: 'bottom',
            fontSize: 15,
            // marginLeft: dimension.width * 0.25,
            color: '#000',
          }}>
          {profile?.crown || 0} hellos
        </Text>
        <Text
          style={{
            // textAlignVertical: 'bottom',
            fontSize: 15,
            // marginLeft: dimension.width * 0.05,
            color: '#000',
          }}>
          {profile?.likes || 0}cruses
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: dimension.height * 0.03,
        }}>
        <Text
          style={{
            color: '#000',
            marginLeft: dimension.width * 0.05,
            fontWeight: '600',
          }}>
          Gender : {selectedGender || profile?.gender}
        </Text>

        <RNPickerSelect
          onValueChange={handleGenderChange}
          items={genderOptions}
          style={{
            inputIOS: {
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 4,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
            },
            inputAndroid: {
              fontSize: 16,
              paddingHorizontal: 10,
              paddingVertical: 8,
              borderWidth: 0.5,
              borderColor: 'purple',
              borderRadius: 8,
              color: 'black',
              paddingRight: 30, // to ensure the text is never behind the icon
            },
          }}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          //   height: dimension.height * 0.1,
          width: dimension.width * 0.9,
          marginTop: dimension.height * 0.05,
        }}>
        <Text
          style={{
            textAlignVertical: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
          }}>
          About me
        </Text>
        <TextInput
          onChangeText={handlUserNameChange}
          style={{
            ...styles.inputBox,
            height: 40,
            width: dimension.width * 0.9,
            paddingHorizontal: 10,
          }}
          placeholder={profile?.aboutme}
          placeholderTextColor="#6E7077"
          selectionColor="#000"
          value={aboutme}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          //   height: dimension.height * 0.1,
          width: dimension.width * 0.9,
          marginTop: dimension.height * 0.02,
        }}>
        <Text
          style={{
            textAlignVertical: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#000',
          }}>
          Work & Education
        </Text>
        <TextInput
          onChangeText={setcompany}
          style={{
            ...styles.inputBox,
            height: 40,
            width: dimension.width * 0.9,
            paddingHorizontal: 10,
          }}
          placeholder={profile?.workandeducation?.company}
          placeholderTextColor="#000"
          selectionColor="#000"
          value={company}
        />
        <TextInput
          onChangeText={setrole}
          style={{
            ...styles.inputBox,
            height: 40,
            width: dimension.width * 0.9,
            paddingHorizontal: 10,
          }}
          placeholder={profile?.workandeducation?.role}
          placeholderTextColor="#000"
          selectionColor="#000"
          value={role}
        />
        <TextInput
          onChangeText={seteducation}
          style={{
            ...styles.inputBox,
            height: 40,
            width: dimension.width * 0.9,
            paddingHorizontal: 10,
          }}
          placeholder={profile?.workandeducation?.education}
          placeholderTextColor="#000"
          selectionColor="#000"
          value={education}
        />
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
          marginTop: 30,
        }}
        onPress={() => {
          saveChanges();
        }}
        underlayColor="#fff">
        <Text style={styles.loginText}>Submit</Text>
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
    backgroundColor: 'white',
    // borderRadius: 15,

    fontSize: 12,
    color: 'black',
    borderBottomWidth: 2,
    borderColor: '#6E7077',
    marginVertical: 10,
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

export default EditIntro;

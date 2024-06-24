// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   Animated,
//   TouchableOpacity,
// } from 'react-native';

// import LinearGradient from 'react-native-linear-gradient';
// import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// const Broadcast = ({ navigation }) => {
//   const [dimension, setDimension] = useState(Dimensions.get('window'));
//   const [scaleValue] = useState(new Animated.Value(1));

// const [showpic,setshowpic]=useState(false)
//   const onChange = () => {
//     setDimension(Dimensions.get('window'));
//   };
//   useEffect(() => {
//     Dimensions.addEventListener('change', onChange);
//     // return () => {
//     //   Dimensions.removeEventListener('change', onChange);
//     // };
//   }, []);

//   useEffect(() => {
//     animateButton();

//   }, []);
//   useEffect(()=>{
//     setTimeout(() => {
//       setshowpic(true)
//       // navigation.navigate("Home")
//     }, 3000);
//   },[])

//   const animateButton = () => {
//     Animated.loop(
//       Animated.sequence([
//         Animated.timing(scaleValue, {
//           toValue: 0.8,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//         Animated.timing(scaleValue, {
//           toValue: 1,
//           duration: 500,
//           useNativeDriver: true,
//         }),
//       ]),
//       { iterations: -1 }
//     ).start();
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['rgba(229, 58, 150, 0.2)', '#ff0096']}
//         style={styles.container}
//       >
//         <ImageBackground
//           resizeMode="stretch"
//           source={require('../../assets/Images/splash.png')}
//           style={styles.background}
//         >
//           <View>
//          { showpic === true ?   <Image
//               resizeMode="stretch"
//               source={require('../../assets/Images/broadcast.png')}
//               style={{
//                 alignSelf: 'center',
//                 width: dimension.width * 0.8,
//                 height: dimension.width * 0.8,
//                 borderRadius: dimension.width * 0.4,
//                 borderColor: 'white',
//               }}
//             /> :
//           <Animated.View style={{
//   transform: [{ scale: scaleValue }]
// }}>

//             <Image
//               resizeMode="stretch"
//               source={require('../../assets/Images/broadcast.png')}
//               style={{
//                 alignSelf: 'center',
//                 width: dimension.width * 0.8,
//                 height: dimension.width * 0.8,
//                 borderRadius: dimension.width * 0.4,
//                 borderColor: 'white',
//                 // transform: [{ scale: scaleValue1 }]
//               }}
//             />
//           </Animated.View>

// }
//        {showpic == true ?
//        <TouchableOpacity onPress={()=>{
//         navigation.navigate("Home")
//        }} >
//        <Image

//        resizeMode={'stretch'}
//        source={require('../../assets/Images/avatar1.jpg')}
//        style={{
//            position : 'absolute',
//            // marginTop : dimension.height*0.27,
//            width:dimension.width*0.18,
//            height:dimension.width*0.18,
//            borderRadius:dimension.width*0.09,
//            borderColor : 'white',
//            borderWidth :2,
//          bottom:40,marginLeft:40,

//        }} />
//        </TouchableOpacity>

//        : null}
//                 </View>
//           <Text style={styles.text}>
//             Find Nearby Friends!
//           </Text>
//         </ImageBackground>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     alignSelf: 'center',
//     color: 'white',
//     fontSize: 24,
//     fontWeight: '600',
//     marginTop: 40,
//   },
// });

// export default Broadcast;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   Animated,
// } from 'react-native';
// import Svg, { Circle } from 'react-native-svg';

// import LinearGradient from 'react-native-linear-gradient';

// const Broadcast = ({ navigation }) => {
//   const [dimension, setDimension] = useState(Dimensions.get('window'));
//   const [showPic, setShowPic] = useState(false);
//   const [waveAnimation] = useState(new Animated.Value(0));

//   const onChange = () => {
//     setDimension(Dimensions.get('window'));
//   };

//   useEffect(() => {
//     Dimensions.addEventListener('change', onChange);
//     return () => {
//       Dimensions.removeEventListener('change', onChange);
//     };
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       setShowPic(true);
//       startWaveAnimation();
//     }, 3000);
//   }, []);

//   const startWaveAnimation = () => {
//     Animated.loop(
//       Animated.timing(waveAnimation, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       })
//     ).start();
//   };

//   const getWaveInterpolation = () => {
//     return waveAnimation.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0%', '100%'],
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['rgba(229, 58, 150, 0.2)', '#ff0096']}
//         style={styles.container}
//       >
//         <ImageBackground
//           resizeMode="stretch"
//           source={require('../../assets/Images/splash.png')}
//           style={styles.background}
//         >
//           <View style={styles.avatarContainer}>
//             <Animated.View
//               style={[
//                 styles.avatarWrapper,
//                 {
//                   width: dimension.width * 0.18,
//                   height: dimension.width * 0.18,
//                   borderRadius: dimension.width * 0.09,
//                   transform: [
//                     {
//                       translateX: dimension.width * 0.09,
//                     },
//                     {
//                       translateY: dimension.width * 0.09,
//                     },
//                   ],
//                 },
//               ]}
//             >
//               <Image
//                 resizeMode="stretch"
//                 source={require('../../assets/Images/avatar1.jpg')}
//                 style={styles.avatar}
//               />
//               {showPic && (
//                 <Svg
//                   style={styles.svg}
//                   height={dimension.width * 0.18}
//                   width={dimension.width * 0.18}
//                 >
//                   <Circle
//                     cx={dimension.width * 0.09}
//                     cy={dimension.width * 0.09}
//                     r={dimension.width * 0.09}
//                     fill="transparent"
//                     stroke="white"
//                     strokeWidth={2}
//                     strokeDasharray={showPic ? '4 8' : '0'}
//                     strokeDashoffset={getWaveInterpolation()}
//                   />
//                 </Svg>
//               )}
//             </Animated.View>
//           </View>
//           <Text style={styles.text}>Find Nearby Friends!</Text>
//         </ImageBackground>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarContainer: {
//     position: 'relative',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarWrapper: {
//     position: 'absolute',
//   },
//   avatar: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     borderRadius: '50%',
//   },
//   svg: {
//     position: 'absolute',
//   },
//   text: {
//     alignSelf: 'center',
//     color: 'white',
//     fontSize: 24,
//     fontWeight: '600',
//     marginTop: 40,
//   },
// });

// export default Broadcast;

import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Animated,
  TouchableOpacity,
  Easing,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import {API} from './Apimanager';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Geolocation from 'react-native-geolocation-service';
const Broadcast = ({navigation}) => {
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [scaleValue] = useState(new Animated.Value(1));

  const [showpic, setshowpic] = useState(false);
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    // return () => {
    //   Dimensions.removeEventListener('change', onChange);
    // };
  }, []);

  const [nearbyUsers, setNearbyUsers] = useState([]);
  const [NearProfile, setNearProfile] = useState();
  const [coordinates, setCoordinates] = useState('');
  // useEffect(() => {
  //   ();fetchNearbyUsers
  // }, []);


  useEffect(()=>{
  
    fetchNearbyUsers()
  },[])

  useEffect(() => {
    getLocation();
  }, []);
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        const location = {type: 'Point', coordinates: [longitude, latitude]};
  
        const positionString = JSON.stringify(position); // Stringify position object
        // console.log('Position to be saved in AsyncStorage:', positionString); // Log position before saving
        AsyncStorage.setItem('location', positionString)
          .then(() => {
            console.log('Position saved successfully in AsyncStorage');
          })
          .catch(error => {
            console.log('Error saving position in AsyncStorage:', error);
          });
        // console.log(position);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };






  useEffect(() => {
    const getAllusers = async () => {
      try {
        const uid = await AsyncStorage.getItem('profileUid');
        // console.log(uid);
        const response = await axios.get(API.USER.GET_ALL_USERS);
        // console.log("hello user",response?.data?.data);
        const filteredData = response?.data?.data?.filter(item => item._id != uid);
        const coordinates = filteredData.map(item => {
          if (item.location && item.location.coordinates) {
              return item.location.coordinates;
          }
      });
      
       console.log("Coordinates:", coordinates);
        
        // if (filteredData) {
        //   setLocal({
        //     name: filteredData.name,
        //     gender: filteredData.gender,
        //     aboutme: filteredData.aboutme,
        //     workandeducation: filteredData.workandeducation,
        //   });
        // } else {
        //   console.log("Profile not found for the current user.");
        // }
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    getAllusers();
  }, []);




  const fetchNearbyUsers = async () => {
    try {
      const location = await AsyncStorage.getItem('location');
      const parsedLocation = JSON.parse(location);
  
      if (
        parsedLocation &&
        parsedLocation.coords &&
        parsedLocation.coords.latitude &&
        parsedLocation.coords.longitude
      ) {
        const latitude = parsedLocation.coords.latitude;
        const longitude = parsedLocation.coords.longitude;
        const maxDistance = 5;
  
        const response = await axios.post(API.USER.FOUND_NEAR_FRIEND, {
          latitude: latitude,
          longitude: longitude,
          maxDistance: maxDistance,
        });
  
        const data = response.data;
        const uid = await AsyncStorage.getItem('profileUid');
  
        if (data) {
          // Filter out the current user's ID from the nearby users' data
          const filteredData = data.filter(item => item._id !== uid);
          console.log(filteredData);
          // Extract the IDs of nearby users
          const nearbyUserIds = filteredData.map(item => item._id);
          console.log(nearbyUserIds);
          // Fetch profiles for each nearby user ID
          fetchNearbyUserProfiles(nearbyUserIds);
        } else {
          console.error('Data is undefined or does not contain the expected structure.');
        }
      } else {
        console.error('Parsed location does not contain valid latitude and longitude.');
      }
    } catch (error) {
      console.error('Error during fetching nearby users:', error);
      ToastAndroid.show('Error: ' + error.message, ToastAndroid.SHORT);
    }
  };
  
  const fetchNearbyUserProfiles = async (userIds) => {
    try {
      const profiles = [];
      // Iterate over each user ID and fetch their profile
      for (const userId of userIds) {
        const response = await axios.get(`${API.PROFILE.GET_PROFILE}/${userId}`);
        const profileData = response.data;
  console.log("profiledata",profileData);
  // const data = profileData.find(item=>item.name)
        // Extract necessary profile information
        const profile = {
          name: profileData?.data?.name,
          pic_url: profileData?.data?.pic_url,
          uid: profileData?.data?.uid
        };
        
        console.log(profile); 
        // profiles.push(profile);
        setProfile(profile);
      }
  
      // Set the fetched profiles into state or do further processing as needed
    } catch (error) {
      console.error('Error fetching nearby user profiles:', error.message);
    }
  };
  
//  console.log(nearbyUsers);

  const [profile, setProfile] = useState(null);
  // console.log("profile to show",profile);
  // useEffect(() => {
  //   const getProfileData = async () => {
  //     try {
  //       const uid = await AsyncStorage.getItem('profileUid');
  //       // console.log(uid);
  //       const response = await axios.get(API.PROFILE.GET_ALL_PROFILE);
  //       // console.log("res",response?.data?.data);
  //       // const useid =nearbyUsers.map(item=>item._id)
  //       const filteredData = response?.data?.data?.find(item => item.uid == nearbyUsers);
  //       //  console.log("near ",useid);
  //       // console.log("filer frofile",filteredData);
        
  //       if (filteredData) {
  //         setProfile({
  //           id:filteredData._id,
  //           name: filteredData.name,
  //           gender: filteredData.gender,
  //           aboutme: filteredData.aboutme,
  //           workandeducation: filteredData.workandeducation,
  //           pic_url: filteredData.pic_url,
  //           uid: filteredData.uid
  //         });
  //       } else {
  //         console.log("Profile not found for the current user.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile data:", error.message);
  //     }
  //   };

  //   getProfileData();
  // }, [nearbyUsers]);
  //  console.log("====================================sdojsdisndjd",nearbyUsers.map(item=>item._id));

  const [waves, setWaves] = useState([]);
  const [waveId, setWaveId] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newWaveId = waveId + 1;
      setWaveId(newWaveId);
      addWave(newWaveId);
    }, 500); // Adjust the interval time as needed
    return () => clearInterval(intervalId);
  }, [waveId]);
  const addWave = id => {
    const newWave = new Animated.Value(0);
    Animated.timing(newWave, {
      toValue: 1,
      duration: 2000, // Adjust the duration of the wave animation
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setWaves(prevWaves => prevWaves.filter(wave => wave.id !== id));
    });
    setWaves(prevWaves => [...prevWaves, {id, animation: newWave}]);
  };
  useEffect(() => {
    animateButton();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setshowpic(true);
    }, 3000);
  }, []);

  const animateButton = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      {iterations: -1},
    ).start();
  };
  const {height, width} = Dimensions.get('window');
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../../assets/Images/splash.png')}
        style={styles.background}>
        <View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            {waves.map((wave, index) => (
              <Animated.View
                key={wave.id}
                style={[
                  styles.wave,
                  {
                    transform: [
                      {
                        scale: wave.animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, 10],
                        }),
                      },
                    ],
                    opacity: wave.animation.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 0.5, 0],
                    }),
                    // zIndex: waves.length - index, // Higher zIndex for later waves
                  },
                ]}
              />
            ))}
            <View
              style={{
                height: height * 0.4,
                width: width * 0.8,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode={'stretch'}
                source={require('../../assets/Images/broadcast.png')}
                style={{
                  // marginTop : dimension.height*0.27,
                  width: dimension.width * 0.18,
                  height: dimension.width * 0.18,
                  borderRadius: dimension.width * 0.09,

                  //  styles.button
                }}
              />
            </View>
          </View>

          {showpic == true ? (
            <Animated.View
              style={{
                transform: [{scale: scaleValue}],
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Home',{ data:{id:profile?.uid ? profile?.uid :"",name:profile?.name,pic:profile?.pic_url}  });
                }}>
                <Image
                  resizeMode={'stretch'}
                  // source={require('../../assets/Images/avatar1.jpg')}
                  source={{uri:profile?.pic_url}}
                  style={{
                    position: 'absolute',
                    // marginTop : dimension.height*0.27,
                    width: dimension.width * 0.12,
                    height: dimension.width * 0.12,
                    borderRadius: dimension.width * 0.09,
                    borderColor: 'white',
                    borderWidth: 2,
                    bottom: 60,
                    marginLeft: 80,
                  }}
                />
                <Image
                  resizeMode={'stretch'}
                  // source={require('../../assets/Images/avatar1.jpg')}
                  source={{uri:profile?.pic_url}}
                  style={{
                    position: 'absolute',
                    // marginTop : dimension.height*0.27,
                    width: dimension.width * 0.12,
                    height: dimension.width * 0.12,
                    borderRadius: dimension.width * 0.09,
                    borderColor: 'white',
                    borderWidth: 2,
                    bottom: 60,
                    marginLeft: 80,
                  }}
                />
              </TouchableOpacity>
            </Animated.View>
          ) : null}
        </View>
        <Text style={styles.text}>Find Nearby Friends!</Text>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#E53A96',
  },
  button: {
    width: 100,
    height: 100,
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderColor: 'white',
    borderWidth: 2,
  },
  wave: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#FFF',
  },
});

export default Broadcast;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Image,
//   Text,
//   StyleSheet,
//   Dimensions,
//   ImageBackground,
//   Animated,
// } from 'react-native';
// import Svg, { Circle } from 'react-native-svg';

// import LinearGradient from 'react-native-linear-gradient';

// const Broadcast = ({ navigation }) => {
//   const [dimension, setDimension] = useState(Dimensions.get('window'));
//   const [showPic, setShowPic] = useState(false);
//   const [waveAnimation] = useState(new Animated.Value(0));

//   const onChange = () => {
//     setDimension(Dimensions.get('window'));
//   };

//   useEffect(() => {
//     Dimensions.addEventListener('change', onChange);
//     return () => {
//       Dimensions.removeEventListener('change', onChange);
//     };
//   }, []);

//   useEffect(() => {
//     setTimeout(() => {
//       setShowPic(true);
//       startWaveAnimation();
//     }, 3000);
//   }, []);

//   const startWaveAnimation = () => {
//     Animated.loop(
//       Animated.timing(waveAnimation, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//       })
//     ).start();
//   };

//   const getWaveInterpolation = () => {
//     return waveAnimation.interpolate({
//       inputRange: [0, 1],
//       outputRange: ['0%', '100%'],
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['rgba(229, 58, 150, 0.2)', '#ff0096']}
//         style={styles.container}
//       >
//         <ImageBackground
//           resizeMode="stretch"
//           source={require('../../assets/Images/splash.png')}
//           style={styles.background}
//         >
//           <View style={styles.avatarContainer}>
//             <Animated.View
//               style={[
//                 styles.avatarWrapper,
//                 {
//                   width: dimension.width * 0.18,
//                   height: dimension.width * 0.18,
//                   borderRadius: dimension.width * 0.09,
//                   transform: [
//                     {
//                       translateX: dimension.width * 0.09,
//                     },
//                     {
//                       translateY: dimension.width * 0.09,
//                     },
//                   ],
//                 },
//               ]}
//             >
//               <Image
//                 resizeMode="stretch"
//                 source={require('../../assets/Images/avatar1.jpg')}
//                 style={styles.avatar}
//               />
//               {showPic && (
//                 <Svg
//                   style={styles.svg}
//                   height={dimension.width * 0.18}
//                   width={dimension.width * 0.18}
//                 >
//                   <Circle
//                     cx={dimension.width * 0.09}
//                     cy={dimension.width * 0.09}
//                     r={dimension.width * 0.09}
//                     fill="transparent"
//                     stroke="white"
//                     strokeWidth={2}
//                     strokeDasharray={showPic ? '4 8' : '0'}
//                     strokeDashoffset={getWaveInterpolation()}
//                   />
//                 </Svg>
//               )}
//             </Animated.View>
//           </View>
//           <Text style={styles.text}>Find Nearby Friends!</Text>
//         </ImageBackground>
//       </LinearGradient>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   background: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarContainer: {
//     position: 'relative',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatarWrapper: {
//     position: 'absolute',
//   },
//   avatar: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     borderRadius: '50%',
//   },
//   svg: {
//     position: 'absolute',
//   },
//   text: {
//     alignSelf: 'center',
//     color: 'white',
//     fontSize: 24,
//     fontWeight: '600',
//     marginTop: 40,
//   },
// });

// export default Broadcast;

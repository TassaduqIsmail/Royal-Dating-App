import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  Component,
} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
  StatusBar,
  Image,
  Button,
  FlatList,
  Alert,
} from 'react-native';
import {Yourb} from '../../Dummy';
import {launchImageLibrary} from 'react-native-image-picker';
import axios, {Axios} from 'axios';
import {API} from './Apimanager';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
// import { Actions } from 'react-native-router-flux';

// import { Button } from '../components';

const Spacer = ({spacing, axis = 'Vertical'}) => (
  <View style={axis === 'Vertical' ? {height: spacing} : {width: spacing}} />
);

const intersperse = (item, array) =>
  array.reduce((acc, each, index) => {
    const isLast = index + 1 === array.length;
    if (isLast) {
      return [...acc, each];
    }
    return [...acc, each, item];
  }, []);

const flexOne = {flex: 1};
const backgroundBlue = {backgroundColor: '#e9edf0'};

const GridView = ({
  children,
  crossAxisCount,
  mainAxisSpacing = 0,
  crossAxisSpacing = 0,
}) => {
  const defaultSection = Array.from({length: crossAxisCount}).map(() => null);
  const numberOfColumns = Math.round(children.length / crossAxisCount);

  let copiedChildren = children.slice();

  const flexRow = {
    flexDirection: 'row',
  };

  const getItemsForRow = () =>
    defaultSection.map(() =>
      copiedChildren.length ? (
        <View style={flexOne}>{copiedChildren.shift()}</View>
      ) : (
        <View style={flexOne} />
      ),
    );

  const list = Array.from({length: numberOfColumns}).map((_, idx) => (
    <View style={flexRow} key={idx}>
      {intersperse(
        <Spacer axis="Horizontal" spacing={crossAxisSpacing} />,
        getItemsForRow(),
      )}
    </View>
  ));

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      {intersperse(<Spacer spacing={mainAxisSpacing} />, list)}
    </ScrollView>
  );
};

const paddingTen = {padding: 10};

// const Choice = ({children, selectPhoto}) => (
//   <View
//     style={{
//       ...backgroundBlue,
//       borderRadius: 10,
//       height: Dimensions.get('window').height * 0.2,
//     }}>
//     <Image
//       style={{
//         width: '100%',
//         height: '100%',
//         borderRadius:10

//       }}
//       source={require('../../assets/Images/avatar.jpg')}
//     />
//     <TouchableOpacity
//       onPress={() => selectPhoto()}
//       style={{

//         position: 'absolute',
//         backgroundColor: '#E53A96',
//      bottom:5,right:5,borderRadius:50,alignItems:"center",justifyContent:"center",padding:5

//       }}
//       // onPress={() => navigate('HomeScreen')}
//       underlayColor="#fff">
//       {/* <Text
//         style={{

//           color: 'white',
//           fontSize: 20,

//         }}>
//         +
//       </Text> */}
// <Image source={require("../../assets/Images/plus.png")} style={{tintColor:"#FFF",height:20,width:20}} />
//     </TouchableOpacity>
//   </View>
// );

const AddBestPhoto = ({navigation}) => {
  // signup() {
  //     Actions.signup()
  // }
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const [isVisible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [currentImages, setCurrentImages] = useState([]);
  const toggleVisibility = () => setVisible(!isVisible);
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
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
            // console.log("pic dta",picData);

            setCurrentImages(picData);
          }
        })
        .catch(error => {
          console.error('Axios POST request error:', error);
        });
    };
    getAssets();
  }, [currentImages,selectedImage]);
  // console.log('Ok', currentImages);
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 250,
      maxWidth: 250,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        Toast.show({
          type: 'error',
          text1: 'User cancelled image picker',
        });
      } else if (response.error) {
        Toast.show({
          type: 'error',
          text1: response.error,
        });
        // console.log('Image picker error: ', response.error);
      } else {
        let base64Img = `data:image/jpg;base64,${response?.assets[0].base64}`;
        let imageUri = response?.uri || response.assets?.[0]?.uri;
        console.log(base64Img);

        try {
          const profileUid = await AsyncStorage.getItem('profileUid');
          // console.log('uid hun bhi ', profileUid);
          await axios
            .post(API.IMAGE_VIDEO.UPLOAD_ASSETS, {
              base64Img: base64Img,
              uid: profileUid,
            })
            .then(function (response) {
              
              // console.log('res', response.data);
              if (response.data.succes == true) {
                Toast.show({
                  type: 'success',
                  text1: response.data.msg,
                });
              }
              if (response?.data?.success == false) {
                // ToastAndroid.show({
                //   type: 'success',
                //   text1: response.data.msg,
                // });
                ToastAndroid.show('OTP Verified Successfully'+ response.data.msg, ToastAndroid.SHORT);

              }
            })
            .catch(function (error) {
              console.log('err', error);
            });
        } catch (error) {
          console.log(error);
        }

        setSelectedImage(imageUri);
        // setImageAssets(base64Img)
      }
    });
  };

  return (
    <View style={{backgroundColor: 'white', height: dimension.height}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            Add Your Best Photos
          </Text>
        </View>
        <View style={{width: 30}}></View>
      </View>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          alignSelf: 'center',

          marginTop: dimension.height * 0.1,
        }}>
        <View style={paddingTen}>
          {/* <GridView
            crossAxisCount={3}
            mainAxisSpacing={15}
            crossAxisSpacing={10}>
            <Choice selectPhoto={toggleVisibility}>One</Choice>
            <Choice selectPhoto={toggleVisibility}>Two</Choice>
            <Choice selectPhoto={toggleVisibility}>Three</Choice>
            <Choice selectPhoto={toggleVisibility}>Four</Choice>
            <Choice selectPhoto={toggleVisibility}>Five</Choice>
            <Choice selectPhoto={toggleVisibility}>Six</Choice>
            <Choice selectPhoto={toggleVisibility}>Seven</Choice>
            
          </GridView> */}
            <FlatList
            contentContainerStyle={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
            data={currentImages.length === 0 ? Yourb : currentImages}
            renderItem={({item, index}) => {
              // console.log("item hun bhi",item);
              return (
                <View
                  style={{
                    ...backgroundBlue,
                    borderRadius: 10,
                    height: Dimensions.get('window').height * 0.2,
                    width: dimension.width * 0.25,
                    marginBottom: 15,
                  }}>
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 10, 
                    }}
                    source={{ uri: item?.pic_url } ? { uri: item?.pic_url } : item.Pic}
                    />
                  <TouchableOpacity
                    onPress={() => openImagePicker()}
                    style={{
                      position: 'absolute',
                      backgroundColor: '#E53A96',
                      bottom: 5,
                      right: 5,
                      borderRadius: 50,
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                    }}>
                    <Image
                      source={require('../../assets/Images/plus.png')}
                      style={{tintColor: '#FFF', height: 20, width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
      {/* <Modal
        visible={isVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => toggleVisibility()}>
        <TouchableOpacity
          style={styles.modalContainer}
          onPressOut={() => toggleVisibility()}>
          <View style={{...styles.modalView, width: dimension.width}}>
            <View style={styles.alert}>
              <Text style={{...styles.alertTitle, textAlign: 'center'}}>
                Access Your Photos
              </Text>
              <Text style={{...styles.alertMessage, textAlign: 'center'}}>
                Tinder needs access to your photos so you can include them in
                your profile
              </Text>
              {/* <View style={styles.alertButtonGroup}>
                <View style={styles.alertButton}>
                  <TouchableOpacity
                    title="OK"
                    onPress={() => toggleVisibility()}
                  />
                </View>
              </View> */}
              {/* <View style={styles.alertButtonGroup}> */}
              {/* <View style={{
                backgroundColor: "#B3B3B3",height:2,
              }} ></View> 
              <TouchableOpacity onPress={openImagePicker}>
                <Text style={styles.alertSelect}>Select Photos</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.alertSelect}>
                  Allow Access To All Photos
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => toggleVisibility()}>
                <Text style={styles.alertSelect}>Don't Allow</Text>
              </TouchableOpacity>
              {/* </View> 
            </View>
          </View>
        </TouchableOpacity>
      </Modal> */}
      <View
        style={{
          backgroundColor: 'white',
          position: 'absolute',
          alignSelf: 'center',
          marginTop: dimension.height * 0.75,
        }}>
        <TouchableOpacity
          style={{
            ...styles.loginScreenButton,
            width: dimension.width * 0.8,
            height: dimension.height * 0.07,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
          }}
          onPress={() => {
            navigation.navigate('Letsgo');
          }}
          underlayColor="#fff">
          <Text style={styles.loginText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  itemsWrap: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    marginVertical: -(12 / 2),
    marginHorizontal: -(12 / 2),
  },
  singleItem: {
    marginHorizontal: 12 / 2,
  },
  alertButtonGroup: {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 8,
    marginLeft: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalContainer: {
    backgroundColor: '#ccc',
    opacity: 0.8,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
  },
  modalView: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  alert: {
    width: '100%',
    maxWidth: 300,
    margin: 48,
    // elevation: 24,
    borderRadius: 2,
    backgroundColor: '#fff',
    borderRadius: 30,
    alignSelf: 'center',
  },
  alertTitle: {
    margin: 24,
    fontWeight: 'bold',

    fontSize: 20,
    color: '#000',
  },
  alertSelect: {
    marginTop: 5,

    fontSize: 18,
    color: '#3B77F1',
    borderTopWidth: 1,
    textAlign: 'center',
    borderColor: '#B3B3B3',
    padding: 5,
  },
  alertMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    fontSize: 16,
    color: '#000',
  },
  alertButton: {
    marginTop: 12,
    marginRight: 8,
    width: 100,
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
export default AddBestPhoto;

// import React, {
//   useEffect,
//   useState,
//   useRef,
//   useCallback,
//   Component,
// } from 'react';
// import {
//   StyleSheet,
//   SafeAreaView,
//   Modal,
//   ScrollView,
//   TouchableOpacity,
//   View,
//   Dimensions,
//   Text,
//   StatusBar,
//   Image,
//   Button,
//   FlatList,
// } from 'react-native';
// import {Yourb} from '../../Dummy';
// import {launchImageLibrary} from 'react-native-image-picker';
// // import { Actions } from 'react-native-router-flux';

// // import { Button } from '../components';

// const Spacer = ({spacing, axis = 'Vertical'}) => (
//   <View style={axis === 'Vertical' ? {height: spacing} : {width: spacing}} />
// );

// const intersperse = (item, array) =>
//   array.reduce((acc, each, index) => {
//     const isLast = index + 1 === array.length;
//     if (isLast) {
//       return [...acc, each];
//     }
//     return [...acc, each, item];
//   }, []);

// const flexOne = {flex: 1};
// const backgroundBlue = {backgroundColor: '#e9edf0'};

// const GridView = ({
//   children,
//   crossAxisCount,
//   mainAxisSpacing = 0,
//   crossAxisSpacing = 0,
// }) => {
//   const defaultSection = Array.from({length: crossAxisCount}).map(() => null);
//   const numberOfColumns = Math.round(children.length / crossAxisCount);

//   let copiedChildren = children.slice();

//   const flexRow = {
//     flexDirection: 'row',
//   };

//   const getItemsForRow = () =>
//     defaultSection.map(() =>
//       copiedChildren.length ? (
//         <View style={flexOne}>{copiedChildren.shift()}</View>
//       ) : (
//         <View style={flexOne} />
//       ),
//     );

//   const list = Array.from({length: numberOfColumns}).map((_, idx) => (
//     <View style={flexRow} key={idx}>
//       {intersperse(
//         <Spacer axis="Horizontal" spacing={crossAxisSpacing} />,
//         getItemsForRow(),
//       )}
//     </View>
//   ));

//   return (
//     <ScrollView style={{backgroundColor: 'white'}}>
//       {intersperse(<Spacer spacing={mainAxisSpacing} />, list)}
//     </ScrollView>
//   );
// };

// const paddingTen = {padding: 10};

// // const Choice = ({children, selectPhoto}) => (
// //   <View
// //     style={{
// //       ...backgroundBlue,
// //       borderRadius: 10,
// //       height: Dimensions.get('window').height * 0.2,
// //     }}>
// //     <Image
// //       style={{
// //         width: '100%',
// //         height: '100%',
// //         borderRadius:10

// //       }}
// //       source={require('../../assets/Images/avatar.jpg')}
// //     />
// //     <TouchableOpacity
// //       onPress={() => selectPhoto()}
// //       style={{

// //         position: 'absolute',
// //         backgroundColor: '#E53A96',
// //      bottom:5,right:5,borderRadius:50,alignItems:"center",justifyContent:"center",padding:5

// //       }}
// //       // onPress={() => navigate('HomeScreen')}
// //       underlayColor="#fff">
// //       {/* <Text
// //         style={{

// //           color: 'white',
// //           fontSize: 20,

// //         }}>
// //         +
// //       </Text> */}
// // <Image source={require("../../assets/Images/plus.png")} style={{tintColor:"#FFF",height:20,width:20}} />
// //     </TouchableOpacity>
// //   </View>
// // );

// const AddBestPhoto = ({navigation}) => {
//   // signup() {
//   //     Actions.signup()
//   // }
//   const [dimension, setDimension] = useState(Dimensions.get('window'));
//   const [isVisible, setVisible] = useState(false);
//   const [selectedImage, setSelectedImage] = useState();
//   const toggleVisibility = () => setVisible(!isVisible);
//   const onChange = () => {
//     setDimension(Dimensions.get('window'));
//   };

//   useEffect(() => {
//     Dimensions.addEventListener('change', onChange);
//     return () => {
//       //   Dimensions.removeEventListener('change', onChange);
//     };
//   });

//   const openImagePicker = () => {
//     const options = {
//       mediaType: 'photo',
//       includeBase64: true,
//       maxHeight: 250,
//       maxWidth: 250,
//     };

//     launchImageLibrary(options, async response => {
//       if (response.didCancel) {
//         // Toast.show({
//         //   type: 'error',
//         //   text1: 'User cancelled image picker',
//         // })
//       } else if (response.error) {
//         // Toast.show({
//         //   type: 'error',
//         //   text1: response.error,
//         // })
//         // console.log('Image picker error: ', response.error);
//       } else {
//         let base64Img = `data:image/jpg;base64,${response?.assets[0].base64}`;
//         let imageUri = response?.uri || response.assets?.[0]?.uri;
//         console.log(imageUri, base64Img);

//         // try {
//         //   const profileUid = await AsyncStorage.getItem('profileUid');
//         //   const pic_public_id = currentProfile?.pic_public_id
//         //   await axios({
//         //     method: 'put',
//         //     url: `${API.PROFILE.UPDATE_PROFILE_PIC}/${profileUid}`,
//         //     data: JSON.stringify({ base64Img, pic_public_id }),
//         //     headers: {
//         //       'Content-Type': 'application/json',
//         //     }
//         //   }).then(function (response) {
//         //     console.log('res', response.data);
//         //     if (response.data.succes == true) {
//         //       Toast.show({
//         //         type: 'success',
//         //         text1: response.data.msg,
//         //       });
//         //     }
//         //   })
//         //     .catch(function (error) {
//         //       console.log('err', error);
//         //     });

//         // } catch (error) {
//         //   console.log(error);
//         // }

//         setSelectedImage(imageUri);
//         setVisible(false);
//         // setImageAssets(base64Img)
//       }
//     });
//   };

//   return (
//     <View style={{backgroundColor: 'white', height: dimension.height}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           padding: 10,
//         }}>
//         <View style={{flexDirection: 'row', alignItems: 'center'}}>
//           <TouchableOpacity
//             onPress={() => {
//               navigation.pop();
//             }}>
//             <Image source={require('../../assets/Images/Back.png')} />
//           </TouchableOpacity>
//           <Text
//             style={{
//               color: '#000',
//               fontSize: 20,
//               fontWeight: '600',
//               marginLeft: 30,
//             }}>
//             Add Your Best Photos
//           </Text>
//         </View>
//         <View style={{width: 30}}></View>
//       </View>
//       <SafeAreaView
//         style={{
//           backgroundColor: 'white',
//           alignSelf: 'center',

//           marginTop: dimension.height * 0.1,
//         }}>
//         <View style={paddingTen}>
//           {/* <GridView
//             crossAxisCount={3}
//             mainAxisSpacing={15}
//             crossAxisSpacing={10}>
//             <Choice selectPhoto={toggleVisibility}>One</Choice>
//             <Choice selectPhoto={toggleVisibility}>Two</Choice>
//             <Choice selectPhoto={toggleVisibility}>Three</Choice>
//             <Choice selectPhoto={toggleVisibility}>Four</Choice>
//             <Choice selectPhoto={toggleVisibility}>Five</Choice>
//             <Choice selectPhoto={toggleVisibility}>Six</Choice>
//             <Choice selectPhoto={toggleVisibility}>Seven</Choice>

//           </GridView> */}
//           {/* <Image source={{uri:selectedImage}} style={{height:80,width:80,backgroundColor: "red",}} /> */}

//           <FlatList
//             contentContainerStyle={{
//               flexWrap: 'wrap',
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-around',
//             }}
//             data={Yourb}
//             renderItem={({item, index}) => {
//               return (
//                 <View
//                   style={{
//                     ...backgroundBlue,
//                     borderRadius: 10,
//                     height: Dimensions.get('window').height * 0.2,
//                     width: dimension.width * 0.25,
//                     marginBottom: 15,
//                   }}>
//                   {/* <Image
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 borderRadius:10

//               }}
//               source={item.Pic}
//             /> */}
//                   <TouchableOpacity
//                     onPress={() => toggleVisibility()}
//                     style={{
//                       position: 'absolute',
//                       backgroundColor: '#E53A96',
//                       bottom: 5,
//                       right: 5,
//                       borderRadius: 50,
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       padding: 5,
//                     }}>
//                     <Image
//                       source={require('../../assets/Images/plus.png')}
//                       style={{tintColor: '#FFF', height: 20, width: 20}}
//                     />
//                   </TouchableOpacity>
//                 </View>
//               );
//             }}
//           />
//         </View>
//       </SafeAreaView>
//       <Modal
//         visible={isVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => toggleVisibility()}>
//         <TouchableOpacity
//           style={styles.modalContainer}
//           onPressOut={() => toggleVisibility()}>
//           <View style={{...styles.modalView, width: dimension.width}}>
//             <View style={styles.alert}>
//               <Text style={{...styles.alertTitle, textAlign: 'center'}}>
//                 Access Your Photos
//               </Text>
//               <Text style={{...styles.alertMessage, textAlign: 'center'}}>
//                 Tinder needs access to your photos so you can include them in
//                 your profile
//               </Text>
//               {/* <View style={styles.alertButtonGroup}>
//                 <View style={styles.alertButton}>
//                   <TouchableOpacity
//                     title="OK"
//                     onPress={() => toggleVisibility()}
//                   />
//                 </View>
//               </View> */}
//               {/* <View style={styles.alertButtonGroup}> */}
//               {/* <View style={{
//                 backgroundColor: "#B3B3B3",height:2,
//               }} ></View> */}
//               <TouchableOpacity onPress={openImagePicker}>
//                 <Text style={styles.alertSelect}>Select Photos</Text>
//               </TouchableOpacity>

//               <TouchableOpacity>
//                 <Text style={styles.alertSelect}>
//                   Allow Access To All Photos
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity onPress={() => toggleVisibility()}>
//                 <Text style={styles.alertSelect}>Don't Allow</Text>
//               </TouchableOpacity>
//               {/* </View> */}
//             </View>
//           </View>
//         </TouchableOpacity>
//       </Modal>
//       <View
//         style={{
//           backgroundColor: 'white',
//           position: 'absolute',
//           alignSelf: 'center',
//           marginTop: dimension.height * 0.75,
//         }}>
//         <TouchableOpacity
//           style={{
//             ...styles.loginScreenButton,
//             width: dimension.width * 0.8,
//             height: dimension.height * 0.07,
//             borderRadius: 50,
//             alignItems: 'center',
//             justifyContent: 'center',
//             alignSelf: 'center',
//             marginTop: 10,
//           }}
//           onPress={() => {
//             navigation.navigate('Letsgo');
//           }}
//           underlayColor="#fff">
//           <Text style={styles.loginText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // justifyContent: 'center', alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   itemsWrap: {
//     display: 'flex',
//     flexDirection: 'column',
//     flexWrap: 'wrap',
//     marginVertical: -(12 / 2),
//     marginHorizontal: -(12 / 2),
//   },
//   singleItem: {
//     marginHorizontal: 12 / 2,
//   },
//   alertButtonGroup: {
//     marginTop: 0,
//     marginRight: 0,
//     marginBottom: 8,
//     marginLeft: 5,
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//   },
//   modalContainer: {
//     backgroundColor: '#ccc',
//     opacity: 0.8,
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     position: 'absolute',
//   },
//   modalView: {
//     flex: 1,
//     alignContent: 'center',
//     justifyContent: 'center',
//     alignSelf: 'center',
//   },
//   alert: {
//     width: '100%',
//     maxWidth: 300,
//     margin: 48,
//     // elevation: 24,
//     borderRadius: 2,
//     backgroundColor: '#fff',
//     borderRadius: 30,
//     alignSelf: 'center',
//   },
//   alertTitle: {
//     margin: 24,
//     fontWeight: 'bold',

//     fontSize: 20,
//     color: '#000',
//   },
//   alertSelect: {
//     marginTop: 5,

//     fontSize: 18,
//     color: '#3B77F1',
//     borderTopWidth: 1,
//     textAlign: 'center',
//     borderColor: '#B3B3B3',
//     padding: 5,
//   },
//   alertMessage: {
//     marginLeft: 24,
//     marginRight: 24,
//     marginBottom: 24,
//     fontSize: 16,
//     color: '#000',
//   },
//   alertButton: {
//     marginTop: 12,
//     marginRight: 8,
//     width: 100,
//   },
//   loginScreenButton: {
//     backgroundColor: '#E63A96',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#E63A96',
//     textAlign: 'center',
//     alignItems: 'center',
//   },
//   loginText: {
//     color: 'white',
//     textAlign: 'center',

//     fontSize: 20,
//   },
// });
// export default AddBestPhoto;

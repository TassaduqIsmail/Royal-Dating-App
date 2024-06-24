import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Circle, Path, Svg} from 'react-native-svg';
import Emoji, {Camara, SendSvg} from '../../assets/Imagest/Emoji';

import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {API} from './Apimanager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import Messages from './Messeges';
import Toast from 'react-native-toast-message';
import socketService from '../../util/socketService';

const ChatField = ({navigation, route}) => {
  const {id, senderid} = route.params;
  console.log('reciver id', id, senderid);
  const [reciverId, setReciverid] = useState(id);
  const [senderId, setSenderId] = useState(senderid);
  const [messege, setMessege] = useState([]);
  const [getMessege, setGetMessege] = useState([]);
  const [UserChatId, setUserChatId] = useState('');
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };
  const [send, setSend] = useState(false);

  const [ima, setImage] = useState();
  const openCamera = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // You can display the image using response.uri:
        // const source = { uri: response.uri };
        // setAvatarSource(source);
        setImage(response?.assets[0]?.uri);
      }
    });
  };
  // const renderBubble = props => {
  //   // const marginBottom = props.nextMessage ? 0 : 10;
  //   return (
  //     <View style={{marginBottom: 2}}>
  //       <Bubble
  //         // onPress={handleDismissKeyboard}
  //         wrapperStyle={{
  //           left: {
  //             backgroundColor: '#575757',
  //             borderRadius: 20,
  //             //right: responsiveWidth(8),
  //             zIndex: 999,
  //             Bottom: 5,
  //           },
  //           right: {
  //             backgroundColor: '#000',
  //             borderRadius: 20,
  //             marginBottom: 3,
  //           },
  //         }}
  //         textStyle={{left: {color: '#FFF'}, right: {color: '#FFF'}}}
  //       />
  //     </View>
  //   );
  // };
  // useEffect(()=>{
  //   socketService.sockets()
  //   socketService.on("send_message",(data)=>{
  //     console.log("sended messag",data);
  //   })
  //   return()=>{
  //     socketService.removeListener("send_message")
  //   }
  // },[])

  // console.log(senderId);
  //   const onSend = useCallback((message = []) => {
  //     console.log('ahhahahh', message);

  // const data = {
  //   message: message[0]?.text,
  //   sender: senderId,
  //   receiver: reciverId,
  // }
  //     try {;
  //       axios
  //         .post(API.CHAT.SEND_MESSAGE, {
  //           message: message[0]?.text,
  //           user: senderId,
  //           receiver: reciverId,
  //         })

  //         .then(function (response) {
  //           setUserChatId(response?.id )

  //           console.log('res', response.data);
  //           socketService.emit("send_message",data)
  //           //  getMessages();
  //         })

  //         .catch(function (error) {
  //           console.log('err', error);
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }, []);

  const handleMessageReceive = newMessage => {
    setMessege(previousMessages =>
      GiftedChat.append(previousMessages, newMessage),
    );
  };

  useEffect(() => {
    socketService.sockets();
    socketService.on('send_message', data => {
      console.log('sended messag', data);
    });

    return () => {
      socketService.removeListener('send_message');
    };
  }, []);

  const onSend = newMessages => {
    const message = newMessages[0];
    const sentmessage = {
      ...message,
      senderId: senderId,
      reciverId: reciverId,
    };
    console.log('sent message', sentmessage);
    setMessege(previousMessages =>
      GiftedChat.append(previousMessages, sentmessage),
    );
    socketService.emit('send_message', sentmessage);
    axios
      .post(API.CHAT.SEND_MESSAGE, {
        message: message?.text,
        receiver: reciverId,
        sender: senderId,
        user: {
          _id: senderId,
        },
      })
      .then(response => {
        console.log('res:', response.data);
        // setMessege(previousMessages =>
        //   GiftedChat.append(previousMessages, response.data),
        // );
        getMessages();
      })
      .catch(error => {
        console.error('Error sending message:', error);
      });
  };

  const renderBubble = props => {
    // const marginBottom = props.nextMessage ? 0 : 10;
    return (
      <View style={{marginBottom: 2}}>
        <Bubble
          {...props}
          // onPress={handleDismissKeyboard}
          wrapperStyle={{
            left: {
              backgroundColor: '#575757',
              borderRadius: 20,
              //right: responsiveWidth(8),
              zIndex: 999,
              Bottom: 5,
            },
            right: {
              backgroundColor: '#000',
              borderRadius: 20,
              marginBottom: 3,
            },
          }}
          textStyle={{left: {color: '#FFF'}, right: {color: '#FFF'}}}
        />
      </View>
    );
  };
  // const sendmessage = async () => {
  //   const uid = await AsyncStorage.getItem('profileUid');
  //   console.log('adfasdsf', uid);
  //   setSenderId(uid);

  //   try {
  //     const profileUid = await AsyncStorage.getItem('profileUid');
  //     console.log('uid hun bhi ', profileUid);
  //     await axios
  //       .post(API.CHAT.SEND_MESSAGE, {
  //         message: messege,
  //         sender: uid,
  //         receiver: reciverId,
  //       })
  //       .then(function (response) {
  //         console.log('res', response.data);
  //         if (response.data.succes == true) {
  //           Toast.show({
  //             type: 'success',
  //             text1: response.data.msg,
  //           });
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log('err', error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getMessages = async () => {
    const uid = await AsyncStorage.getItem('profileUid');
    //   console.log('adfasdsf', uid);
    //   setSenderId(uid);

    await axios
      .get(`http://192.168.18.44:9000/chat/receive/${reciverId}`)
      .then(response => {
        console.log('assets data', response.data);

        const filteredData = response?.data?.filter(
          item => item?.sender == uid,
        );
        const messages = filteredData[0].message;
        setGetMessege(previousMessages =>
          GiftedChat.append(previousMessages, messages),
        );
        // Logging the message objects
        console.log(messages);
        console.log('filterchat', filteredData);
        if (messages) {
          setGetMessege(messages.filter(item=>item?.message));
        }

        // setMessege(previousMessages =>
        //   GiftedChat.append(previousMessages, getMessege),
        // );
      })
      .catch(error => {
        console.error('Axios POST request error:', error);
      });
  };

  console.log('assets', getMessege);

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      //   Dimensions.removeEventListener('change', onChange);
    };
  });

  const {height, width} = Dimensions.get('window');

  return (
    <View
      style={{
        backgroundColor: '#fff',
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
          Chat
        </Text>

        <View style={{width: 30}}></View>
      </View>
      {/* <ScrollView> */}
      {/* <View
        style={{
          width: dimension.width * 0.9,
          height: dimension.height * 0.82,
          marginTop: dimension.height * 0.1,
          alignSelf: 'center',
        }}> */}
      {/* <Chatitem1
            content={'Hello,White...How are you? It is nice to meet you!'}
          />
          <Chatitem2 content={'Hi,. It is very nice to meet you.'} />

          <Chatitem2 content={'You like, Music?'} />
          <Chatitem1 content={'Yeah, of course.'} /> */}
      {/* {send === true ? <Chatitem1 content={messege} /> : null} */}

      {/* <Image source={{uri: ima}} style={{height: 80, width: 80}} /> */}
      {/* </View> */}
      <GiftedChat
        messages={messege}
        renderBubble={renderBubble}
        onSend={messege => onSend(messege)}
        user={{
          _id: senderId,
        }}
      />

      {/* <KeyboardAvoidingView
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            borderColor: '#E53A96',
            borderWidth: 0.5,
            borderRadius: dimension.height * 0.04,
            alignSelf: 'center',
            width: dimension.width * 0.9,
            //   height: dimension.height * 0.08,
            //   marginTop: dimension.height * 0.8,
            flexDirection: 'row',
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            bottom: 0,
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={openCamera}>
            <Camara />
          </TouchableOpacity>
          <TouchableOpacity>
            <Emoji />
          </TouchableOpacity>
          <TextInput
            style={{
              width: dimension.width * 0.58,
              color: 'black',
              //   backgroundColor: 'red',
            }}
            selectionColor="#000"
            placeholder="Type a message..."
            // secureTextEntry={true}
            keyboardType="ascii-capable"
            placeholderTextColor="#000"
            onChangeText={text => {
              setMessege(text);
            }}
            value={messege}
          />
          <TouchableOpacity
            onPress={() => {
              onSend();
            }}>
            <SendSvg />
          </TouchableOpacity>
        </KeyboardAvoidingView> */}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',

    // background: linear - gradient('180deg', rgba(229, 58, 150, 0), '#E53A96', '47.66%'),
    // borderRadius: 30
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  inputBox: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 12,
    color: 'black',
    borderWidth: 1,
    borderColor: '#E53A96',
    marginVertical: 5,
  },
});

export default ChatField;

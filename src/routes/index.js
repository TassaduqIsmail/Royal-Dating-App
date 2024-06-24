import {View, Text, Linking} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Introduction from '../screens/app/Introduction';
import Verify from '../screens/app/Verify';
import AddBestPhoto from '../screens/app/AddBestPhoto';
import Letsgo from '../screens/app/Letsgo';
import Broadcast from '../screens/app/Broadcast';
import SignUp from '../screens/auth/Signup';

import Passw from '../screens/app/Passw';
import Phonene from '../screens/app/Phonene';
import Home from '../screens/app/Home';
import Bottombar from '../screens/app/Components/Bottombar';
import Profile from '../screens/app/Profile';
import Settings from '../screens/app/Setting';
import Myqueen from '../screens/app/Myqueen';
import MakeOffer from '../screens/app/Makeoffer';
import SearchResult from '../screens/app/Results';
import Preferences from '../screens/app/Prefences';
import Offer from '../screens/app/Offer';
import OfferDetails from '../screens/app/Offerdetail';
import EditIntro from '../screens/app/EditIntro';
import InvitF from '../screens/app/InviteF';
import RoyalGold from '../screens/app/RoyalGold';
import Queen from '../screens/app/Myqueen';
import Notification from '../screens/app/Notification';
import Messages from '../screens/app/Messeges';
import ChatField from '../screens/app/ChatField';
import Services from '../screens/app/Services';
import Requesst from '../screens/app/Request';
import messaging from '@react-native-firebase/messaging';


const NAVIGATION_IDS = ["SignUp","AddBestPhoto","Notification"];

const Stack = createNativeStackNavigator();


function buildDeepLinkFromNotificationData(data) {
  console.log("onclick data",data);
  const navigationId = data?.navigationId;
  console.log(navigationId);
  if (!NAVIGATION_IDS.includes(navigationId)) {
    console.warn('Unverified navigationId', navigationId)
    return null;
  }
  if (navigationId == 'Notification') {
    return 'myapp://Notification';
  }
  const postId = data?.postId;
  if ( navigationId === 'AddBestPhoto') {
    return `myapp://AddBestPhoto/${navigationId}`
  }
  console.warn('Missing postId')
  return null
}

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      Notification: 'Notification',
      AddBestPhoto: 'AddBestPhoto',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (typeof url === 'string') {
      return url;
    }
    //getInitialNotification: When the application is opened from a quit state.
    const message = await messaging().getInitialNotification();
    const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
    if (typeof deeplinkURL === 'string') {
      return deeplinkURL;
    }
  },
  subscribe(listener) {
    const onReceiveURL = ({url}) => listener(url);

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

    //onNotificationOpenedApp: When the application is running, but in the background.
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      const url = buildDeepLinkFromNotificationData(remoteMessage.data)
      if (typeof url === 'string') {
        listener(url)
      }
    });

    return () => {
      linkingSubscription.remove();
      unsubscribe();
    };
  },
};
const Route = () => {
  return (
    <NavigationContainer linking={linking} >
      <Stack.Navigator>
        <Stack.Screen
          name="Introduction"
          component={Introduction}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Passw"
          component={Passw}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Phonene"
          component={Phonene}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddBestPhoto"
          component={AddBestPhoto}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Letsgo"
          component={Letsgo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Broadcast"
          component={Broadcast}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Bottombar"
          component={Bottombar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Queen"
          component={Queen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MakeOffer"
          component={MakeOffer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchResult"
          component={SearchResult}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Preferences"
          component={Preferences}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Offer"
          component={Offer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OfferDetails"
          component={OfferDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditIntro"
          component={EditIntro}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="InvitF"
          component={InvitF}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RoyalGold"
          component={RoyalGold}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Messages"
          component={Messages}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ChatField"
          component={ChatField}
          options={{headerShown: false}}
        />
           <Stack.Screen
          name="Services"
          component={Services}
          options={{headerShown: false}}
        />
               <Stack.Screen
          name="Requesst"
          component={Requesst}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;

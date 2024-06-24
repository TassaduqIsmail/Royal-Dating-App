import {useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  Image,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
// const { initPaymentSheet, presentPaymentSheet } = useStripe();

import {API} from '../../Apimanager';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Screen} from 'react-native-screens';
// import { Image } from "react-native-svg";

export default function CheckoutScreen({payData}) {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [billId, setBillId] = useState('');
  // console.log(payData);
  const [booll, setbooll] = useState(false);
  const [dimension, setDimension] = useState(Dimensions.get('window'));
  const onChange = () => {
    setDimension(Dimensions.get('window'));
  };

  const fetchPaymentSheetParams = async () => {
    try {
      const uid = await AsyncStorage.getItem('profileUid');

      const bothData = {
        price: payData?.price,
        subcriberId: uid,
      };
      console.log(bothData);
      const response = await axios.post(API.PAYMENT.SUBSCRIPTION, bothData);
      console.log('kjh', response.data);
      const {paymentIntent, ephemeralKey, customer, billId} =
        await response.data;

      console.log(paymentIntent, ephemeralKey, customer, billId);

      setBillId(billId);

      console.log('bill id ', billId);
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();
    // console.log(paymentIntent);
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
    });
    if (!error) {
      setLoading(true);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      console.log(`Error code: ${error.code}`, error.message);
    } else {
      console.log('Success', 'Your order is confirmed!');

      try {
        const status = {
          paymentStatus: 'payment success',
          subStatus: 'subscribed',
          billId: billId,
        };
        const response = await axios.put(
          `${API.PAYMENT.UPDATE_SUB_STATUS}/${billId}`,
          status,
        );
        console.log('responce', response.data);
        if (response.data.succes) {
          setbooll(false);
          console.log({
            type: 'success',
            text1: response?.data?.msg,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [pricee, setPrice] = useState('');
  useEffect(() => {
    const getSubscriptions = async () => {
      try {
        const uid = await AsyncStorage.getItem('profileUid');
        console.log(uid);
        const response = await axios.get(API.PAYMENT.GET_SUB_STATUS);
        const subscriptions = response?.data?.data;
        console.log(subscriptions);
        const countSub = subscriptions?.filter(
          item => item?.subStatus == 'subscribed' && item?.subcriberId == uid,
        );
        const status = countSub.map(item=>item.subStatus)
        const date = status.map(item=>item)
        console.log('sub status ', date);
        let totalprice = 0;
        countSub.forEach(price => {
          totalprice += Number(price?.price);
        });
        console.log('sdgsdf', totalprice);
        setPrice(status);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    getSubscriptions();
  }, []);
console.log("hello this is stats",pricee);
  return (
    <Screen>
      <View
        style={{
          width: dimension.width * 0.4,
          marginTop: 100,
          // height: dimension.height * 0.4,
        }}>
        <TouchableOpacity
          onPress={openPaymentSheet}
          disabled={!loading}
          style={{
            zIndex: 10,
            fontSize: 18,
            backgroundColor: '#FFB849',
            color: 'white',
            alignSelf: 'center',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            //   width: '80%',
            //   height: dimension.height * 0.06,
            borderRadius: dimension.height * 0.03,
            padding: 10,
          }}>
          <Text
            style={{
              zIndex: 10,
              fontSize: 18,
              backgroundColor: '#FFB849',
              color: 'white',
              alignSelf: 'center',
              textAlignVertical: 'center',
              textAlign: 'center',
              fontWeight: 'bold',
              //   width: '80%',
              //   height: dimension.height * 0.06,
              borderRadius: dimension.height * 0.03,
              padding: 10,
            }}>
            Most Popular
          </Text>

          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#FFECF6',
              height: dimension.height * 0.8,
              width: dimension.width * 0.9,
              borderRadius: dimension.height * 0.02,
              marginTop: -dimension.height * 0.03,
            }}>
            {pricee != 'subscribed' ? <Image
              source={require('../../../../assets/Images/discount.jpeg')}
              style={{
                alignSelf: 'center',
                width: '90%',
                height: '30%',
              }}
            />:null}
            <Text
              style={{
                fontSize: 50,
                fontWeight: 'bold',
                textAlign: 'center',
                alignSelf: 'center',
                color: '#E53A96',
              }}>
              12
            </Text>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                alignSelf: 'center',
                color: '#E53A96',
              }}>
              month
            </Text>
            <Text
              style={{
                fontSize: 20,
                textAlign: 'center',
                alignSelf: 'center',
                color: '#15224F',
              }}>
              $ {payData?.price}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

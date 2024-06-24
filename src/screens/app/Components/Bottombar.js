
    // useFocusEffect(
    //   React.useCallback(() => {
    //     const currentRouteName = route.name;
    //     // Check if the current screen is Dashboard
    //     if (currentRouteName === 'Home') {
    //       setHom(false);
    //       setMag(true);
    //       setMes(false);
    //       setPro(false);
    //       setVid(false);
    //     } else {
    //       setMag(false);
    //     }
    //     return () => {
    //       setMag(false);
    //     };
    //   }, [route])
    // );
    // useFocusEffect(
    //   React.useCallback(() => {
    //     const currentRouteName = route.name;
    //     // Check if the current screen is Dashboard
    //     if (currentRouteName === 'UserProfile') {
    //       setHom(false);
    //       setMag(false);
    //       setMes(false);
    //       setPro(true);
    //       setVid(false);
    //     } else {
    //       setPro(false);
    //     }
    //     return () => {
    //       setPro(false);
    //     };
    //   }, [route])
    // );
    // useFocusEffect(
    //   React.useCallback(() => {
    //     const currentRouteName = route.name;
    //     // Check if the current screen is Dashboard
    //     if (currentRouteName === 'Longv') {
    //       setHom(false);
    //       setMag(false);
    //       setMes(false);
    //       setPro(false);
    //       setVid(true);
    //     } else {
    //       setVid(false);
    //     }
    //     return () => {
    //       setVid(false);
    //     };
    //   }, [route])
    // );
    // useFocusEffect(
    //   React.useCallback(() => {
    //     const currentRouteName = route.name;
    //     // Check if the current screen is Dashboard
    //     if (currentRouteName === 'Dashboard') {
    //       setHom(true);
    //       setMag(false);
    //       setMes(false);
    //       setPro(false);
    //       setVid(false);
    //     } else {
    //       setHom(false);
    //     }
    //     return () => {
    //       setHom(false);
    //     };
    //   }, [route])
    // );
    // useFocusEffect(
    //   React.useCallback(() => {
    //     const currentRouteName = route.name;
    //     // Check if the current screen is Dashboard
    //     if (currentRouteName === 'Dashboard') {
    //       setHom(true);
    //       setMag(false);
    //       setMes(false);
    //       setPro(false);
    //       setVid(false);
    //     } else {
    //       setHom(false);
    //     }
    //     return () => {
    //       setHom(false);
    //     };
    //   }, [route])
    // );
    import {
        View,
        Text,
        Dimensions,
        StyleSheet,
        TouchableOpacity,
        Image,
        Alert,
        ToastAndroid,
      } from 'react-native';
      import React, {useEffect, useState} from 'react';
      
      import {Circle, ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';
      import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
      const Bottombar = ({}) => {
        const routes =useRoute()
        const navigation=useNavigation()
        const [Hom, setHom] = useState(false);
        const [Mag, setMag] = useState(false);
        const [Mes, setMes] = useState(false);
        const [Pro, setPro] = useState(false);
      const [Vid,setVid]=useState(false)
      
      
      
        useFocusEffect(
          React.useCallback(() => {
            const currentRouteName = route.name;
            // Check if the current screen is Dashboard
            if (currentRouteName === 'Home') {
              setHom(true);
              setMag(false);
              setMes(false);
              setPro(false);
              setVid(false);
            } else {
              setHom(false);
            }
            return () => {
              setHom(false);
            };
          }, [route])
        );
    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Dashboard');
            setHom(true);
                  setMag(false);
                  setMes(false);
                  setPro(false);
                  setVid(false);
          }}
          style={styles.tab}>
          {Hom === true ? (
            <Svg
              width="34"
              height="35"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path
                d="M1 10.3988C1 9.43981 1.45843 8.53865 2.23351 7.97399L10.0399 2.28692C11.0927 1.51995 12.5201 1.51995 13.5728 2.28692L21.3792 7.97399C22.1543 8.53865 22.6127 9.43981 22.6127 10.3988V21.6769C22.6127 22.7815 21.7173 23.6769 20.6127 23.6769H3C1.89543 23.6769 1 22.7815 1 21.6769V10.3988Z"
                stroke="#F35BAC"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <Path
                d="M8.19922 17.3499C8.19922 15.3574 9.81444 13.7422 11.8069 13.7422V13.7422C13.7994 13.7422 15.4146 15.3574 15.4146 17.3499V23.6768H8.19922V17.3499Z"
                fill="#F35BAC"
                fill-opacity="0.15"
                stroke="#F35BAC"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <Path
                d="M10.2607 8.60754H13.353"
                stroke="#F35BAC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </Svg>
          ) : (
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
          )}
        
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Home');
            setMag(true);
            setHom(false);
            setVid(false);
            setMes(false);
            setPro(false);
          }}
          style={styles.tab}>
          {Mag === true ? (
            <Svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
         <Circle cx="9.34549" cy="9.59167" r="6.60826" transform="rotate(-45 9.34549 9.59167)" stroke="#E53A96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M5.93457 9.32463C5.93457 7.44602 7.45749 5.9231 9.33611 5.9231" stroke="#E44A9C" stroke-opacity="0.44" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M15.3381 15.5844L14.0723 14.3186" stroke="#E53A96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Rect x="13.6025" y="16.9641" width="4.40551" height="6.93732" rx="2.20275" transform="rotate(-45 13.6025 16.9641)" fill="#E44A9C" fill-opacity="0.44"/>

            </Svg>
          ) : (
            <Svg width="35" height="35" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
               <Circle cx="9.34549" cy="9.59167" r="6.60826" transform="rotate(-45 9.34549 9.59167)" stroke="#9EA2BE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M5.93457 9.32463C5.93457 7.44602 7.45749 5.9231 9.33611 5.9231" stroke="#E0E1EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Path d="M15.3381 15.5844L14.0723 14.3186" stroke="#9EA2BE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<Rect x="13.6025" y="16.9641" width="4.40551" height="6.93732" rx="2.20275" transform="rotate(-45 13.6025 16.9641)" fill="#E0E1EF"/>

            </Svg>
          )}
         
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('Longv');
      
            setHom(false);
            setMag(false);
            setMes(true);
            setPro(false);
            setVid(false);
          }}
          style={styles.tab}>
          {Mes === true ? (
          <Svg width="33" height="35" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <Path d="M5.45115 17.0163L6.92881 18.7955C7.32159 19.2684 8.04406 19.2782 8.44962 18.8162L10.057 16.9851C10.3418 16.6607 10.7525 16.4747 11.1843 16.4747H16.5915C18.2483 16.4747 19.5915 15.1315 19.5915 13.4747V4.36926C19.5915 2.71241 18.2483 1.36926 16.5915 1.36926H4.06152C2.40467 1.36926 1.06152 2.71241 1.06152 4.36926V13.4747C1.06152 15.1315 2.40467 16.4747 4.06152 16.4747H4.29724C4.74327 16.4747 5.16617 16.6732 5.45115 17.0163Z" stroke="#E53A96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <Circle cx="7.08444" cy="9.05209" r="1.853" fill="#E53A96"/>
          <Circle cx="13.5698" cy="9.05209" r="1.853" fill="#F35BAC" fill-opacity="0.15"/>
          </Svg>
          
          ) : (
            <Svg width="33" height="35" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M5.45115 17.0163L6.92881 18.7955C7.32159 19.2684 8.04406 19.2782 8.44962 18.8162L10.057 16.9851C10.3418 16.6607 10.7525 16.4747 11.1843 16.4747H16.5915C18.2483 16.4747 19.5915 15.1315 19.5915 13.4747V4.36926C19.5915 2.71241 18.2483 1.36926 16.5915 1.36926H4.06152C2.40467 1.36926 1.06152 2.71241 1.06152 4.36926V13.4747C1.06152 15.1315 2.40467 16.4747 4.06152 16.4747H4.29724C4.74327 16.4747 5.16617 16.6732 5.45115 17.0163Z" stroke="#9EA2BE" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <Circle cx="7.08444" cy="9.05209" r="1.853" fill="#9EA2BE"/>
            <Circle cx="13.5698" cy="9.05209" r="1.853" fill="#E0E1EF"/>
            </Svg>
            
          )}
         
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('UserProfile');
            setHom(false);
            setMag(false);
            setMes(false);
            setPro(true);
            setVid(false);
          }}
          style={styles.tab}>
          {Pro === true ? (
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
          ) : (
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
          )}
        
        </TouchableOpacity>
  
     
        
      </View>
    );
  };
  
  const {height, width} = Dimensions.get('window');
  const styles = StyleSheet.create({
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
  
  export default Bottombar;
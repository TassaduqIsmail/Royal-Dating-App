import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../Apimanager";
import { ToastAndroid } from "react-native";

export async function saveProfileData  (profileData) {


    const uid = await AsyncStorage.getItem('profileUid');

    const Data = {
        uid: uid,
        profilePic: profileData?.profilePic ? profileData?.profilePic: "",
        name: '',
        gender: '',
        aboutme: '',
        workandeducation: {
          company: '',
          role: '',
          education: '',
        },
      };
    console.log("profile",profileData);
    try {

        // await axios.post(API.PROFILE.SET_PROFILE, { profileData })
        //     .then(response => {
        //         console.log(response.data);
        //         if (response.data.succes) {
        //             ToastAndroid.show('Name saved!', ToastAndroid.SHORT);
        //         }
        //         else if (response.data.error) {
        //             ToastAndroid.show('username already exist!', ToastAndroid.SHORT);
        //         }

        //     })
        //     .catch(error => {
        //         console.error('Axios PUT request error:', error);
        //         ToastAndroid.show('failed to saved!', ToastAndroid.SHORT);
        //     });

        await axios({
            method: 'post',
            url: API.PROFILE.SET_PROFILE,
            data: JSON.stringify({ Data }),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            console.log('res', response.data);
            if (response.data.succes) {
                ToastAndroid.show('Data saved!', ToastAndroid.SHORT);
                // navigation.pop()
            }
            else if (response.data.error) {
                ToastAndroid.show('error while saving!', ToastAndroid.SHORT);
            }
        })
            .catch(function (error) {
                console.log('err', error);
            });


    } catch (error) {
        console.log(error);
    }

}
export async function updateUserName(username, currentProfileUid) {


    const uid = await AsyncStorage.getItem('profileUid');

    try {

        await axios.put(`${API.PROFILE.UPDATE_PROFILE_NAME}/${uid}`, { username: username })
            .then(response => {
                console.log(response.data);
                if (response.data.succes) {
                    ToastAndroid.show('username saved!', ToastAndroid.SHORT);
                }
                else if (response.data.error) {
                    ToastAndroid.show('username already exist!', ToastAndroid.SHORT);
                }

            })
            .catch(error => {
                console.error('Axios PUT request error:', error);
                ToastAndroid.show('username failed to saved!', ToastAndroid.SHORT);
            });
    } catch (error) {
        console.log(error);
    }

}

export async function updateName(profileData,currentProfileUid) {


    // const uid = await AsyncStorage.getItem('uid');

    try {

        await axios.put(`${API.PROFILE.UPDATE_PROFILE_NAME}/${currentProfileUid}`, { profileData: profileData })
            .then(response => {
                console.log(response.data);
                if (response.data.succes) {
                    ToastAndroid.show('name saved!', ToastAndroid.SHORT);
                }

            })
            .catch(error => {
                console.error('Axios PUT request error:', error);
                ToastAndroid.show('name failed to saved!', ToastAndroid.SHORT);
            });
    } catch (error) {
        console.log(error);
    }

}
export async function updatePrice(price, currentProfileUid) {


    // const uid = await AsyncStorage.getItem('uid');

    try {

        await axios.put(`${API.PROFILE.UPDATE_PROFILE_PRICE}/${currentProfileUid}`, { price: price })
            .then(response => {
                console.log(response.data);
                if (response.data.succes) {
                    ToastAndroid.show('price saved!', ToastAndroid.SHORT);
                }

            })
            .catch(error => {
                console.error('Axios PUT request error:', error);
                ToastAndroid.show('price failed to saved!', ToastAndroid.SHORT);
            });

    } catch (error) {
        console.log(error);
    }

}
export async function updateProfilePic(base64Img, pic_public_id, proId) {


    // const uid = await AsyncStorage.getItem('uid');
console.log('==============================',proId);
    try {

        await axios({
            method: 'put',
            url: `${API.PROFILE.UPDATE_PROFILE_PIC}/${proId}`,
            data: JSON.stringify({ base64Img,pic_public_id,}),
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            console.log('res', response.data);
            if (response.data.succes == true) {
                ToastAndroid.show('picture updated successfuly!', ToastAndroid.SHORT);
            }
        })
            .catch(function (error) {
                console.log('err', error);
            });

    } catch (error) {
        console.log(error);
    }


}




export async function getProfileData() {
    try {
        const uid = await AsyncStorage.getItem('uid');
         console.log('uid', uid);
        const response = await axios.get(`${API.PROFILE.GET_ALL_PROFILE}`);

        const filteredData = response?.data?.data?.find(item => item.uid === uid);
console.log(filteredData);
        if (filteredData) {
            return filteredData;
        } else {
            throw new Error('Profile data not found for the given user ID');
        }
    } catch (error) {
        console.error('Error fetching profile data:', error);
        throw error;
    }
}

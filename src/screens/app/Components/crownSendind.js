import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { API } from "../Apimanager";

export async function crownsend( id,sendCrown) {

    try {
        // const uid = await AsyncStorage.getItem('profileUid');

        await axios.post(`${API.PROFILE.CROWN}/${id}`, { uid: id, sendCrown: sendCrown })
            .then(response => {
                console.log('Liked');
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    } catch (error) {
        console.log(error);
    }

}
// export async function updateRating(picId, rating) {

//     try {
//         const uid = await AsyncStorage.getItem('uid');

//         await axios.put(`${API.IMAGE_VIDEO.RATINGS}/${picId}`, { uid: uid, rating: rating })
//             .then(response => {
//                 console.log('Liked');
//                 console.log(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });

//     } catch (error) {
//         console.log(error);
//     }

// }
// export async function updateViews(picId) {


//     try {
//         // Send the view impression event to the backend
//         const response = await axios.put(`${API.IMAGE_VIDEO.VIEWS}/${picId}`)
//         console.log(response.data);

//         console.log('View impression sent to backend:', response.data);
//     } catch (error) {
//         console.error('Error sending view impression to backend:', error);
//     }

// }

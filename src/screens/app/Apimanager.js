// const BASE_URL = 'http://192.168.18.26:3000'
// const BASE_URL = 'http://192.168.10.14:3000'
// const BASE_URL = 'http://192.168.0.101:3000'
// const BASE_URL = 'http://192.168.18.58:3000'
// const BASE_URL = 'http://192.168.18.44:3030'
const BASE_URL = 'http://192.168.10.6:9000';
// const BASE_URL = 'https://royal-dating-backend-ccb976df0bd1.herokuapp.com'
export const API = {
  USER: {
    SIGNUP: `${BASE_URL}/api/user/register`,
    VERIFY_USERS: `${BASE_URL}/api/user/verify-otp`,
    LOGIN: `${BASE_URL}/api/user/login`,
    VERIFY_USER_LOGIN: `${BASE_URL}/api/user/verify-loginotp`,
    GET_ALL_USERS: `${BASE_URL}/api/user/getAllUsers`,
            GET_USERS_BY_ID: `${BASE_URL}/api/user/getUserByUid`,
    //         UPDATE_IS_INTRO: `${BASE_URL}/api/user/updateStatusIntro`,
    FOUND_NEAR_FRIEND: `${BASE_URL}/api/user/nearby`,
  },
  PROFILE: {
    SET_PROFILE: `${BASE_URL}/api/userProfile/setUserProfile`,
    GET_PROFILE: `${BASE_URL}/api/userProfile/getUserProfileByUid`,
    GET_ALL_PROFILE: `${BASE_URL}/api/userProfile/getAllProfile`,
    UPDATE_PROFILE_PIC: `${BASE_URL}/api/userProfile/updatePicById`,
    UPDATE_PROFILE_NAME: `${BASE_URL}/api/userProfile/updateProfileById`,
    UPDATE_PROFILE_USERNAME: `${BASE_URL}/api/userProfile/updateUsernameById`,
    UPDATE_PROFILE_PRICE: `${BASE_URL}/api/userProfile/updatePriceById`,
    CROWN: `${BASE_URL}/api/userProfile/crown-sending`,
    LIKE: `${BASE_URL}/api/userProfile/like-sending`,
  },
  IMAGE_VIDEO: {
    UPLOAD_ASSETS: `${BASE_URL}/api/userProfile/assets/upload`,
    GET_ASSETS: `${BASE_URL}/api/userProfile/assets/image_videos`,
    //         RATINGS: `${BASE_URL}/api/userProfile/assets/videos-ratings`,

    //         VIEWS: `${BASE_URL}/api/userProfile/assets/videos-views`,
  },
      PAYMENT: {
          SUBSCRIPTION: `${BASE_URL}/api/subcription/payment`,
          UPDATE_SUB_STATUS: `${BASE_URL}/api/subcription/updatePayment`,
          GET_SUB_STATUS: `${BASE_URL}/api/subcription/getAllSubscriber`,
          PUT_SUB_STATUS:`${BASE_URL}/api/subcription/updatePayment`,
      },
      OFFER: {
          CREAT_OFFER: `${BASE_URL}/api/createoffer/offers`,
          GET_ALL_OFFER: `${BASE_URL}/api/createoffer/getAlloffers`,
    },

  CHAT: {
    SEND_MESSAGE: `${BASE_URL}/chat/send`,
    GET_MESSAGES: `${BASE_URL}/chat/receive`,
    GET_MESSAGES_BYID: `${BASE_URL}/chat/receivebyid`,
  },
};

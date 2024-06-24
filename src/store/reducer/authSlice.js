// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API } from '../../API/api';



// const initialState = {
//     user: null,
//     isAuthenticated: false,
//     error: null,
//     success: false,
//     isLogin: false,
//     isSignUp: false,
//     isForget: false
// }


// // Async thunk for user signup
// export const signupUser = createAsyncThunk(
//     'auth/signupUser',
//     async ({ email, password, username }, { rejectWithValue }) => {



//         try {

//             const authData = {
//                 providerName: 'email',
//                 email: email,
//                 password: password,
//                 username: username
//             }
//             const response = await axios.post(API.AUTH.SIGNUP, authData);
//             console.log('signup', response.data);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );

// // Async thunk for user login
// export const loginUser = createAsyncThunk(
//     'auth/loginUser',
//     async ({ email, password }, { rejectWithValue }) => {
//         try {
//             const authData = {
//                 email: email,
//                 password: password
//             }
//             const response = await axios.post(API.AUTH.LOGIN, authData);
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
// export const forgetPassword = createAsyncThunk(
//     'auth/forget',
//     async ({ email }, { rejectWithValue }) => {
//         try {

//             const response = await axios.post(API.AUTH.FORGET_PASSWORD_TOKEN, { email: email });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


// export const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logoutState: () => initialState,
//         resetError: (state) => {
//             state.error = null;
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(signupUser.fulfilled, (state, action) => {
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//                 state.error = null;
//                 state.success = true;
//                 state.isLogin = false;
//                 state.isSignUp = true;
//                 state.isForget = false;
//             })
//             .addCase(signupUser.rejected, (state, action) => {
//                 state.error = action.payload.message;
//                 state.isSignUp = true;
//                 state.isAuthenticated = false;
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//                 state.error = null;
//                 state.success = true;
//                 state.isLogin = true;
//                 state.isSignUp = false;
//                 state.isForget = false;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.error = action.payload.message;
//                 state.isLogin = true;
//                 state.isAuthenticated = false;
//             })
//             .addCase(forgetPassword.fulfilled, (state, action) => {
//                 state.user = action.payload;
//                 state.isAuthenticated = true;
//                 state.error = null;
//                 state.success = true;
//                 state.isLogin = false;
//                 state.isSignUp = false;
//                 state.isForget = true;
//             })
//             .addCase(forgetPassword.rejected, (state, action) => {
//                 state.error = action.payload.message;
//                 state.isForget = true;
//                 state.isAuthenticated = false;
//             });
//     },
// });
// export const { logoutState, resetError } = authSlice.actions;
// export default authSlice.reducer;
// // export { signupUser, loginUser };



// export const signupUser = createAsyncThunk(
//     'auth/signup',
//     async (userData, thunkAPI) => {
//         console.log(userData)
//       try {

//         const response = await axios.post(API.USER.SIGNUP, userData);
  
//         // Handle successful signup
//         return response.data.user;
//       } catch (error) {
//         // Handle signup failure
//         return thunkAPI.rejectWithValue(error.response.data.error);
//       }
//     }
//   );
 // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API } from '../../screens/app/Apimanager';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  user: [],
  loading: false,
  error: null,
  
};

// Async thunk for user signup
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({ email, password, phone }, { rejectWithValue }) => {


        
        try {
            
            const authData = {
           
                email: email,
                password: password,
                phoneNumber: phone
            }
            console.log("",authData)
            const response = await axios.post(API.USER.SIGNUP,{
           
                email: email,
                password: password,
                phoneNumber: phone
            });
            console.log('signup', response.data);
           
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response);
        }
      
    }
);


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
     
        .addCase(signupUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(signupUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
  });
  export const { reducer: authReducer } = authSlice;
  
  export default authSlice.reducer;
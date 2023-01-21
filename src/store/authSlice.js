import axios from "axios"


const { createSlice } = require('@reduxjs/toolkit');


export const STATUS = Object.freeze({

    AUTH_START: "AUTH_START",
    AUTH_SUCCESS: "AUTH_SUCCESS",
    AUTH_FAIL: "AUTH_FAIL",
    UPDATE_START:"UPDATE_START",
    UPDATE_SUCCESS:"UPDATE_SUCCESS",
    UPDATE_FAIL:"UPDATE_FAIL",
    FOLLOW_SUCCESS:"FOLLOW_SUCCESS"
})

export const authSlice = createSlice({

    name: "auth",
    initialState: {

        data: {},
        status: STATUS.AUTH_START

    },
    reducers: {
        loginData(state, action) {

            localStorage.setItem('user', JSON.stringify(action.payload));
            //  console.log(action.payload);
            state.data = action.payload
        },
        loginStatus(state, action) {
            state.status = action.payload;
        },


        signupData(state, action) {

            localStorage.setItem('user', JSON.stringify(action.payload));
            state.data = action.payload
        },
        signupStatus(state, action) {
            state.status = action.payload;
        },
        logout(state,action){
            return {
                ...state,
                data: {}
            }
        },
        updateUserData(state,action){
            return {
                ...state,
                data:{...action.payload}
            }
        },
        updateUserStatus(state,action){
            state.status = action.payload;
        },
        Followed(state,action){
            // console.log(action.payload);
            return {...state, data: {...state.data, user: {...state.data.user, following: [...state.data.user.following, action.data]} }}
        // {...state.userData,data: {...state.userData.data, following: [...state.userData.data.following.push(action.payload)]}}
              
        },
        UnFollowed(state,action){
            // console.log(action.payload);
           
            return {...state, data: {...state.data, user: {...state.data.user, following: [...state.data.user.following.filter((personId)=>personId!==action.data)]} }}
            //   userData:{...state.userData,data: {...state.userData.data, following: [...state.userData.data.following.fillter((personID)=>personID !== action.payload)]}}
        }
    }
})

export const { loginData, loginStatus, signupData, signupStatus ,logout,updateUserData,updateUserStatus,Followed,UnFollowed} = authSlice.actions;
export default authSlice.reducer;


const API = axios.create({ baseURL: "https://socilamedia.herokuapp.com/" })

export function loginFetch(LoginData) {
    return async function loginFetchThunk(dispatch, getstate) {

        dispatch(loginStatus(STATUS.AUTH_START))
        try {

            const loginInfo = await API.post('/auth/login', LoginData);
            // console.log(loginInfo+ " logined place");
            dispatch(loginData(loginInfo.data));
            dispatch(loginStatus(STATUS.AUTH_SUCCESS));
        }
        catch (e) {

            dispatch(loginStatus(STATUS.AUTH_FAIL))
        }

    }
}




export function signupFetch(SignupData) {
    return async function signupFetchThunk(dispatch, getstate) {

        dispatch(signupStatus(STATUS.AUTH_START))
        try {

            const signupInfo = await API.post('/auth/register', SignupData);

            dispatch(signupData(signupInfo.data));
            dispatch(signupStatus(STATUS.AUTH_SUCCESS));

        }
        catch (e) {

            dispatch(signupStatus(STATUS.AUTH_FAIL))
        }

    }
}


export function updateUser(id,formData) {

    return async function updateUserThunk(dispatch, getstate) {
        dispatch(updateUserStatus(STATUS.UPDATE_START))
        try {

            const updatedData = await API.put(`/user/${id}`, formData);
            // console.log(updatedData); 
            dispatch(updateUserData(updatedData.data));
            dispatch(updateUserStatus(STATUS.UPDATE_SUCCESS));

        }
        catch (e) {
             console.log(e);
            dispatch(updateUserStatus(STATUS.UPDATE_FAIL))
        }

    }
}

export function followUser(id,data){
    return async function followUser(dispatch,getstate){
             
        try {
            //  
              await API.put(`/user/${id}/follow`, {data : data});
             
              dispatch(Followed(id));
           
               
         } catch (error) {
               console.log(error);

         }
    }
}

export function unfollowUser(id,data){
   
    return async function unfollowUserThunk(dispatch,getstate){
      
        try {
             
              await API.put(`/user/${id}/unfollow`, {data : data});
              
              dispatch(UnFollowed(id));
               
         } catch (error) {
            
         }
    }
}



export const getAllUser =()=>API.get('/user');


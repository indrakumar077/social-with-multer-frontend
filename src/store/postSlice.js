import axios from "axios"
const { createSlice } = require('@reduxjs/toolkit');


export const STATUS = Object.freeze({

      POSTING_START: "POSTING_START",
      POSTING_SUCCESS: "POSTING_SUCCESS",
      POSTING_FAIL: "POSTING_FAIL",

})

const uploadSlice = createSlice({

      name: "postingPost",
      initialState: {
            data : [],
            status : STATUS.POSTING_START
      },
      reducers: {

            UploadStatus(state, action) {
                  state.status = action.payload;
            },
            UploadData(state,action){
                  // state.isLoading = true;
                  // state.data.push(action.payload);
                 return [...state.data,action.payload]
            }
      }
})




export const { UploadStatus,UploadData } = uploadSlice.actions;
export default uploadSlice.reducer;

const API = axios.create({ baseURL: "https://socilamedia.herokuapp.com/" })

export function uploadImage(Image) {

      return async function uploadImageThunk(dispatch, getstate) {

            try {
                 await API.post('/upload/', Image);
                  
            } catch (error) {
                  console.log(error);

            }
      }
}


export function likePost(postId,userId){
        return async function likePostTunk(){
                 
            try {
                  await API.put(`/post/like/${postId}`, {UserId : userId});
                   
             } catch (error) {
                   console.log(error);
 
             }
        }
}








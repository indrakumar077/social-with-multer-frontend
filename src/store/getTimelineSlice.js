import axios from "axios"
const { createSlice } = require('@reduxjs/toolkit');


export const STATUS = Object.freeze({

      TIMELINE_START: "TIMELINE_START",
      TIMELINE_SUCCESS: "TIMELINE_SUCCESS",
      TIMELINE_FAIL: "TIMELINE_FAIL",
      POSTING_START: "POSTING_START",
      POSTING_SUCCESS: "POSTING_SUCCESS",
      POSTING_FAIL: "POSTING_FAIL",

})


const TimelineSlice = createSlice({

      name: "timelinePost",
      initialState: {
            data : [],
            status : STATUS.TIMELINE_START
      },
      reducers: {

            TimelineStatus(state, action) {
                  state.status = action.payload;
            },
            TimelineData(state = { data: [] },action){
                 
                  return{ data : [...action.payload]};
                  
            },
       
            UploadStatus(state, action) {
                  state.status = action.payload;
            },
            UploadData(state,action){
                
                     return{
                      ...state,
                      data: [action.payload,...state.data]

                     }
            }
      }
})



export const { TimelineStatus,TimelineData,UploadStatus,UploadData } = TimelineSlice.actions;
export default TimelineSlice.reducer;


const API = axios.create({ baseURL: "https://socilamedia.herokuapp.com/" })


export function getTimeline(id) {
    return async function getTimelineThunk(dispatch, getstate) {
          dispatch(TimelineStatus(STATUS.TIMELINE_START));
          try {
                const post = await API.get(`/post/${id}/timeline`);
                dispatch(TimelineStatus(STATUS.TIMELINE_SUCCESS));
                if(post.data){
                  // console.log(post + "api");
                  dispatch(TimelineData(post.data));
                }
                
          } catch (error) {
                console.log(error);
                dispatch(TimelineStatus(STATUS.TIMELINE_FAIL));

          }

    }
}






export function uploadPost(dataImage) {
      return async function uploadPostThunk(dispatch, getstate) {
            dispatch(UploadStatus(STATUS.POSTING_START));
            try {
                  const post = await API.post('/post', dataImage);
                  dispatch(UploadStatus(STATUS.POSTING_SUCCESS));
                  if(post.data){
                        
                        dispatch(UploadData(post.data));
                        // dispatch(getTimeline(user._id));
                  }
                 
            } catch (error) {
                  console.log(error);
                  dispatch(UploadStatus(STATUS.POSTING_FAIL));

            }

      }
}
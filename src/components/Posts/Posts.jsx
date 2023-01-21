import React from 'react'
import "./Posts.css"
// import {PostData} from '../../data/PostData';
import Post from '../Post/Post';
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import { getTimeline } from '../../store/getTimelineSlice';
import { useState } from 'react';


function Posts() {

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userData.data);
  const [tdata,setData] = useState([]);
  const data = useSelector((state)=>state.timelinePosts.data);
  // console.log(data);

 useEffect(()=>{
       dispatch(getTimeline(user._id));
      //  setData(data);
      //  console.log("me");
   },[])


  return (
    <div className='Posts'>
      {data===undefined ?  "loading..." :   data.map((data,index)=> <Post data={data} key={index} />)}
    </div>
  )
}

export default Posts



























// function Posts() {

//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.userData.data);
//   const myTimeline = useSelector((state)=>state.timelinePosts.data);
//   console.log(myTimeline[0]);
 
  
//  useEffect(()=>{
//        dispatch(getTimeline(user._id));
//        console.log("me");
//    },[])

//   return (
//     <div className='Posts'>
//       {myTimeline[0]==undefined ?  "loading..." : <Post data={myTimeline[0]} />}
//     </div>
//   )
// }

// export default Posts
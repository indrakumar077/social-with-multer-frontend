import React, { useState } from 'react'
import "./Post.css"
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import Heart from '../../img/like.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../store/postSlice'
import { useEffect } from 'react'
import { getTimeline } from '../../store/getTimelineSlice'


const Post = ({data}) => {
        const [image,setImage] = useState();
        const dispatch = useDispatch();
        const { user } = useSelector((state) => state.userData.data);
       
        const [liked,setliked] = useState(data.likes.includes(user._id));
        const [numLikes,setnumLikes] = useState(data.likes.length);

         const handleLike  = ()=>{
              setliked((prev=>!prev));
              dispatch(likePost(data._id,user._id));
              liked ? setnumLikes((prev)=>prev-1):setnumLikes((prev)=>prev+1)
         }
         
         useEffect(()=>{
               dispatch(getTimeline(user._id));

         },[liked])

            
        //  useEffect(async()=>{
        //         const options = {
        //           method: "GET"
        //       }
          
        //       let response = await fetch(`https://socilamedia.herokuapp.com/public/images/${data.image}`, options)

        //       if (response.status === 200) {
            
        //         const imageBlob = await response.blob()
        //         const imageObjectURL = URL.createObjectURL(imageBlob);
        //         setImage(imageBlob);
               
        //     }
        //     else {
        //         console.log("HTTP-Error: " + response.status)
        //     }
                
             
        //    },[])

        return (<div className='Post' style={data.image? {flexDirection:"column"}: {flexDirection:"column-reverse"}}>
      
             {data.image &&  <img src={data.image?   process.env.REACT_APP_PUBLIC_FOLDER+data.image : ""} alt=""  />} 
           

               <div className="postReact">
                   <img src={liked?Heart:NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLike}/>
                   <img src={Comment} alt="" />
                   <img src={Share} alt="" />
               </div>
        
               <span style={{color: "var(--gray)", fontSize: '12px'}}>{numLikes} Likes</span>
        
               <div className="details">
                   <span><b>{data.name}</b></span>
                   <span> {data.desc}</span>
               </div>
       </div> 
  )
}

export default Post






















// const Post = ({data}) => {
//   //  console.log(data)
//  return (
//   data.map((data)=>{
//     // console.log(data.image+" lol");
    
//     return(
//       <div className='Post'>
    
//            <img src={data.image? process.env.REACT_APP_PUBLIC_FOLDER+data.image : ""} alt="" />
//              <div className="postReact">
//                  <img src={data.liked?Heart:NotLike} alt="" style={{cursor:"pointer"}}/>
//                  <img src={Comment} alt="" />
//                  <img src={Share} alt="" />
//              </div>
      
//              <span style={{color: "var(--gray)", fontSize: '12px'}}>{data.likes} Likes</span>
      
//              <div className="details">
//                  <span><b>{data.name}</b></span>
//                  <span> {data.desc}</span>
//              </div>
//      </div>
//     )
//   })
  
  
// )
// }

// export default Post

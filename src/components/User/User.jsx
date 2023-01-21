import React from 'react'
import { useState } from 'react';
import {useDispatch, useSelector } from "react-redux"
import { followUser, unfollowUser } from '../../store/authSlice';
const User = ({person}) => {
    const {user}  = useSelector((state) => state.userData.data)
    const dispatch = useDispatch(person);
    const [following , setFollowing] =useState(user.following.includes(person._id));
    console.log(following);
    const serverPublic  = process.env.REACT_APP_PUBLIC_FOLDER;
    const handleFollow =(person)=>{
        if(following){
        
            
            dispatch(unfollowUser(person._id,user));
            setFollowing(false);
            // console.log(user)
        }
        else{
         
            dispatch(followUser(person._id,user));
            setFollowing(true);
            // console.log(user)
        } 
    }
  return (
    <div>
         <div className="Follower"> 
              <div>
                <img src={person.profilePicture?serverPublic+person.profilePicture:serverPublic+"DefaultProfile.png"} className="followerImg" alt="" />
                <div className="name">
                   <span>{person.firstname}</span>
                   <span>@{person.username}</span>
                </div>
              </div>
              <button className={following?"unfollow": "button fc-button"} onClick={()=>handleFollow(person)}>{following?"Unfollow":"follow"}</button>
           </div>
    </div>
  )
}

export default User

import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import "./Profile.css"
import ProfileCard from "../../components/ProfileCard/ProfileCard"
import PostSide from "../../components/PostSide/PostSide"
import RigthSide from '../../components/RightSide/RigthSide'


const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileLeft/>
         <div className="profile-center">
              <ProfileCard location="profilePage"/>
              <PostSide/>
         </div>
         <RigthSide/>
    </div>
  )
}

export default Profile

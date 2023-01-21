import React from 'react'
import FollowersCard from '../followersCard/FollowersCard';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';
import './ProfileSide.css'

function ProfileSide() {
  console.log("profileside");
  return (
    <div className='ProfileSide'>
       <LogoSearch/>
       <ProfileCard location="homepage"/>
       <FollowersCard/>
    </div>
  )
}

export default ProfileSide;

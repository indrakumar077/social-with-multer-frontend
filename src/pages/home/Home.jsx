import React from 'react'
import PostSide from '../../components/PostSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RigthSide from '../../components/RightSide/RigthSide'

import './Home.css'
const Home = () => {
  return (
    <div className='Home'>
      <ProfileSide/>
      <PostSide/>
      <RigthSide/>
    
    </div>
  )
}

export default Home

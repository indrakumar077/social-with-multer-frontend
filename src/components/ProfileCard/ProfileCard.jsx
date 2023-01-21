import React from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
import {useSelector} from 'react-redux'
import { useTransition } from 'react'
import {Link} from "react-router-dom"

const ProfileCard = ({location}) => {
    
    const posts = useSelector((state)=>state.timelinePosts.data);
    const {user} = useSelector((state)=>state.userData.data);
    // console.log(user);
    const serverPublic  = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='ProfileCard'>
        <div className="ProfileImages">
            <img src={user.coverPicture?serverPublic+user.coverPicture:serverPublic+"DefaultCover.jpg"} alt="" />
            <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"DefaultProfile.png"} alt="" />
        </div>
        <div className="ProfileName">
                <span>{user.firstname} {user.lastname}</span>
                <span>{user.worksAt?user.worksAt:"Not mentioned"}</span>
        </div>
        <div className="followStatus">
            <hr />
            <div>
                <div className="follow">
                    <span>{user.following.length}</span>
                    <span>Followings</span>
                </div>
                <div className="vl"></div>
                <div className="follow">
                    <span>{user.followers.length}</span>
                    <span>followers</span>
                </div>
                {location ==="profilePage" && [
                    <>
                      <div className="vl">
                           
                      </div>
                      <div className="follow">
                         <span>{posts.filter((post)=>post.UserId === user._id).length}</span>
                         <span>Posts</span>
                      </div>
                    </>
                ]}
            </div>
            <hr />
        </div>
        {location ==="profilePage" ?'':
             <span>
                <Link style = {{textDecoration:"none", color:"inherit"}} to={`/profile/${user._id}`}>
                    My profile
                </Link>
            </span>  
        }
         </div>
  )
}

export default ProfileCard;

import React from 'react'
import "./InfoCard.css"
import { UilPen } from "@iconscout/react-unicons";
import { useState } from 'react';
import ProfileModel from "../ProfileModel/ProfileModel.jsx"
import {useDispatch, useSelector} from "react-redux"
import {useParams} from "react-router-dom"
import { useEffect } from 'react';
import axios from 'axios';
import { logout } from '../../store/authSlice';

const InfoCard = () => {


  const [modelOpend,setmodelOpend] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const profileUserId = params.id;
  const [profileUser,setProfileUser] = useState({});

  const { user } = useSelector((state) => state.userData.data);
  // console.log(user);
  const handleLogout =()=>{
       localStorage.clear();
       dispatch(logout());
  }
  

    useEffect(()=>{
        const fetchUserProfile =async()=>{
            
          if(profileUserId === user._id){
            setProfileUser(user);
            // console.log(user);
          }
          else{
            
            //  const API = axios.create({baseURL:"http://localhost:5000"})
             const profileUser =  await axios.get(`http://localhost:5000/user/${profileUserId}`)
             setProfileUser(profileUser);
            //  console.log(profileUser);
          }
             
        }
        fetchUserProfile();
    },[user])
   
    // console.log(profileUser);

  return (
    <div className='InfoCard'>
       <div className="infoHead">
            <h4>Profile Info</h4>
            { (user._id === profileUserId) ? <div>
              <UilPen width= "2rem" height ="1.2rem" onClick={()=> setmodelOpend(true)}/>
              
              <ProfileModel modelOpend={modelOpend} setmodelOpend={setmodelOpend} data={profileUser}/></div>
              : ""
            }
            
       </div>
       <div className="info">
           <span>
             <b>Status </b>
           </span>
           <span>{profileUser.relationship?profileUser.relationship:"In a Relationship"}</span>
       </div>

       <div className="info">
           <span>
             <b>Lives in </b>
           </span>
           <span>{profileUser.livesin ?profileUser.livesin:"Raipur"}</span>
       </div>
       <div className="info">
           <span>
             <b>Works at </b>
           </span>
           <span>{profileUser.worksAt?profileUser.worksAt:"Raipur"}</span>
       </div>
       <button className='button logoout-button' onClick={()=>handleLogout()}>Logout</button>
    </div>
  )
}

export default InfoCard

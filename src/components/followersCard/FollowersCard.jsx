
import React from 'react'
import './FollowersCard.css'
import { Follower } from '../../data/FollowersData'
import User from '../User/User'
import { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from"react-redux"
import { getAllUser } from '../../store/authSlice'
const FollowersCard = () => {

  const [persons,setPersons] = useState([]);
  const {user}  = useSelector((state) => state.userData.data)

  useEffect(()=>{ 
    const fetchPersons = async()=>{
          
     try { const {data }= await getAllUser();
         setPersons(data);
        }catch(e){
          console.log(e);
        }
    }
    fetchPersons();
  },[])
  
  console.log(persons);

  return (
    <div className='FollowersCard'>
        <h3>People You may know</h3>

        {persons.map((person,id)=>{
          if(person._id !== user._id){
            return(
              <User person={person} key={id}/>
            ); 
          }
          
        })}

        
    </div>
  )
}

export default FollowersCard

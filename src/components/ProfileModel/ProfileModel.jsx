import { Modal, useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateUser } from '../../store/authSlice';
import { uploadImage } from '../../store/postSlice';

function ProfileModel({modelOpend,setmodelOpend,data}) {

 

  const theme = useMantineTheme();
  
  const other = data;
  
  const [formData ,setFormdata] = useState({});
  // console.log(other._id);

   useEffect(()=>{
    setFormdata(other);
   },[])
 
  const [profileImg,setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  
  const dispatch = useDispatch();
  const params = useParams();
  const {user} = useSelector((state)=>state.userData.data);

   const handleChange = (e)=>{
            setFormdata({...formData,[e.target.name] : e.target.value})     
   }

   const onImageChange =(e)=>{
        
      if (e.target.files && e.target.files[0]) {
          let img = e.target.files[0];
          e.target.name === "profilePicture" ? setProfileImg(img) : setCoverImg(img);
      }
             
   } 

   const handleSubmit =(e)=>{
        e.preventDefault();
        let UserData =  formData;

        const data = new FormData();
        const fileName = Date.now() + profileImg.name;
        data.append("name", fileName);
        data.append("file", profileImg);
        UserData.profilePicture = fileName;

        try {

          dispatch(uploadImage(data));
          
        } catch (error) {
          
        }

        if(coverImg){

              let UserData =  formData;

              const data = new FormData();
              const fileName = Date.now() + coverImg.name;
              data.append("name", fileName);
              data.append("file", coverImg);
              UserData.coverPicture = fileName;
      
              try {
      
                dispatch(uploadImage(data));
                
              } catch (error) {
                 console.log(error);
              }

        }
        UserData["_id"] = other._id;
        console.log(UserData)
        dispatch(updateUser(params.id,UserData));
        setmodelOpend(false);
   }

  return (

    <Modal

      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size = '55%'
      opened = {modelOpend}
      onClose ={()=>setmodelOpend(false)}
    >
      <form className='infoForm'>
          <h3>Your Information</h3>
          <div>
              <input type="text" className="infoInput" name="firstname" placeholder='First name' onChange={handleChange} value={formData?.firstname
}/>
              <input type="text" className="infoInput" name="lastname" placeholder='Last name' onChange={handleChange} value={formData?.lastname}/>
          </div>
          <div>
               <input type="text" className="infoInput" name="worksAt" placeholder='Works at' onChange={handleChange} value={formData?.worksAt}/>
          </div>
          <div>
              <input type="text" className="infoInput" name="livesin" placeholder='LivesIn' onChange={handleChange} value={formData?.livesin}/>
              <input type="text" className="infoInput" name="country" placeholder='Country' onChange={handleChange} value={formData?.country}/>
          </div>
          <div>
               <input type="text" className="infoInput" name="relationship" placeholder='RelationShip' onChange={handleChange} value={formData?.relationship}/>
          </div>
          <div>
            Profile Image
            <input type="file" name='profilePicture' onChange={onImageChange}/>
            Cover Image
            <input type="file" name='coverPicture' onChange={onImageChange} />
           
          </div>
          <button className='button infoButton' onClick={handleSubmit}>Update</button>
      </form>
    </Modal>
  );
}

export default ProfileModel;
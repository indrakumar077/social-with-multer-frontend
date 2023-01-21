import React, { useRef, useState } from 'react'
import "./PostShare.css"
import ProfileImage from "../../img/profileImg.jpg"

import { UilScenery, UilPlayCircle, UilLocationPoint, UilSchedule, UilTimes } from "@iconscout/react-unicons"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage  } from '../../store/postSlice'
import { getTimeline, uploadPost } from '../../store/getTimelineSlice'


function PostShare() {
  const dispatch = useDispatch();

  const {user}  = useSelector((state) => state.userData.data)
  // console.log(user._id+" user data");

  // post hua ki ni dekhte hai
  const PostStatus = useSelector((state) => state.postStatus.status);
  // const PostStatusData = useSelector((state) => state.postStatus.data);
  // console.log(PostStatus);
  ////

  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();


  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img)
    }
  }

  const reset = () => {
    setImage(null);
    desc.current.value = ""
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    const newPost = {
      UserId: user._id,
      desc: desc.current.value,
    }

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log(newPost);

      try {
        //ye wala malter ke liye hai
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error)
      }
    }
    if(newPost){
      dispatch(uploadPost(newPost));
      // dispatch(getTimeline(user._id));
    }
    
    // window.location.reload(true)

    reset();
  }
  const serverPublic  = process.env.REACT_APP_PUBLIC_FOLDER;
  


  return (
    <div className='PostShare'>
      <img src={user.profilePicture?serverPublic+user.profilePicture:serverPublic+"DefaultProfile.png"} alt="" />
      <div>
        <input type="text" placeholder='Whats in Your Mind ...' ref={desc} required />
        <div className='PostOptions'>
          <div className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="option"
            style={{ color: "var(--video)" }}
          >
            <UilPlayCircle />
            Video
          </div>
          <div className="option"
            style={{ color: "var(--location)" }}
          >
            <UilLocationPoint />
            Location
          </div>
          <div className="option"
            style={{ color: "var(--shedule)" }}
          >
            <UilSchedule />
            Shecdule
          </div>
          <button className='button ps-button'
            onClick={handleSubmit}

          >
             Share
          </button>
          <div style={{ display: "none" }}>
            <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && [
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        ]}

      </div>
    </div>

  )
}

export default PostShare

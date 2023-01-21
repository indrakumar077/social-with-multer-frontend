import React from 'react'
import "./Auth.css"
import Logo from "../../img/logo.png"
import { useState } from 'react'
import {useDispatch,useSelector}  from "react-redux"
import { loginFetch ,signupFetch } from '../../store/authSlice'





const Auth = () => {
  const [isSigup,setIsSingUp] = useState(false);
  
  const dispatch  = useDispatch();
  const [data,setData] = useState({
    firstname:"",
    lastname :"",
    username :"",
    password:"",
    confirmpass:"",
  });
  console.log("auth side");
  const user = useSelector((state)=>state.userData)
  // console.log(user);
 
  const [confirmpass,setConfirmpass] = useState(true)

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value});
  }

  const handleSubmit = (e)=>{
     e.preventDefault();
      
    if(isSigup){
        // data.password === data.confirmpass ? dispatch(signupFetch(data)) : setConfirmpass(false);
        data.password === data.confirmpass ? dispatch(signupFetch(data)) : dispatch(signupFetch(data));
      
       
    }
    else{
       dispatch(loginFetch(data));
      // console.log(useSelector((state)=>state.loginedUser));
    }
  }

  const resetForm =()=>{
      setConfirmpass(false);
      setData({
        firstname:"",
        lastname : "",
        username : "",
        password:"",
        confirmpass:"",
      });
  }


  return (
    <div className='Auth'>
          
          <div className="a-left">
              <img src={Logo} alt="" />
              <div className="Webname">
                <div>
                  <span className='bold-newton'>Newton</span>
                  <span className='bold-school'>School</span> 
                </div>
                  <h6>Connect to Community</h6>
              </div>
          </div>
         
          <div className='a-right'>
              <form  className='infoForm authForm' onSubmit={handleSubmit}>

                <h3>{isSigup ? "Sign Up" : "Log In"}</h3>
                {isSigup && 

                 <div>
                 <input type="text" placeholder='First Name' className='infoInput' name='firstname' onChange={handleChange}/>
                 <input type="text" placeholder='Last Name' className='infoInput' name='lastname' onChange={handleChange}/>
                </div>  

                
                }
               
                <div>
                    <input type="text" placeholder='User Name' className='infoInput' name='username' onChange={handleChange}  value = {data.username}/>
                </div>
                <div>
                    <input type="password" placeholder='Password' className='infoInput' name='password' onChange={handleChange} value = {data.password}/>
                    {isSigup && 
                       
                       <input type="password" placeholder='Confirm Password' className='infoInput' name='confirmpass' onChange={handleChange}/>
                    }
                    
                </div>
                <span style={{ display: confirmpass? "none" : "block"  ,color:"red" ,fontSize:"12px",alignSelf:'flex-end',marginRight: "5px"}}>
                  * confirm password is not same</span>
                <div>
                    <span onClick={()=>{setIsSingUp((prev)=>!prev); resetForm();}} style={{cursor : 'pointer', fontSize :"13px"}}>{isSigup?"Already have an account. Login": "Don't have a account Sign Up"}</span>
                </div>
               <button className='button infoButton' type='submit' >
                  {isSigup? "SignUp" : "Log In" }
                </button>
                  
              </form>
        </div>
    </div>
  )
}


export default Auth

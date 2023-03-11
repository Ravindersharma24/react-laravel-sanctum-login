import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { API_URL } from '../constants/ApiUrl';

const ChatScreen = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        user_details();
        const loggedInUser = localStorage.getItem("user_token");
        if (!loggedInUser)
        {
            navigate("/login")
        }
        console.log('loggedInUser',loggedInUser);
    },[]);


    const user_details = async ()=>{
        const response = await axios.get(`api/check_auth`)
        const data = await response?.data?.user;
    }
    const logout = ()=>{
        axios.post(`api/logout`).then(res=>{
            if(res)
            {
                localStorage.removeItem('user_token');
                swal("Success","logout success","success");
                navigate("/login");
            }
        })
    }
  return (
    <>
        <h3>Welcome</h3>
        <button className='btn btn-primary btn-sm m-4' onClick={logout}>Logout</button>
    </>
  )
}

export default ChatScreen

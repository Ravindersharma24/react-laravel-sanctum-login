import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const PublicRoute = ({Component}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('user_token');
        if(login){
            navigate('/');
        }
    },[])
  return (
    <div>
        <Component/>
    </div>
  )
}

export default PublicRoute

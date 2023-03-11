import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({Component}) => {
    const navigate = useNavigate();
    useEffect(()=>{
        let login = localStorage.getItem('user_token');
        if(!login){
            navigate('/login');
        }
    },[])
  return (
    <div>
        <Component/>
    </div>
  )
}

export default ProtectedRoute

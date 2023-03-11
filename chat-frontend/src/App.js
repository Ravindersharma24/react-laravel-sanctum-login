import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Register from './screens/auth/Register'
import Login from './screens/auth/Login'
import ChatScreen from './screens/ChatScreen'
import axios from 'axios'
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from './routes/PublicRoute'

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("user_token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
});

const App = () => {
  return (
        <Routes>
            <Route path='/' element={<ProtectedRoute Component={ChatScreen}/>}/>
            <Route path='/login' element={<PublicRoute Component={Login}/>}/>
            <Route path='/register' element={<PublicRoute Component={Register}/>}/>
        </Routes>
  )
}

export default App

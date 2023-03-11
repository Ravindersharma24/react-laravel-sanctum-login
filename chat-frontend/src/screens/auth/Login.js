import React, { useEffect, useState } from "react";
import '../../assets/css/style.css'
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import axios from "axios";
import { API_URL } from "../../constants/ApiUrl";
import swal from "sweetalert";

const Login = () => {
    const navigate = useNavigate();
    const [loginData,setLoginData] = useState({
        email:'',
        password:'',
    });

    // form validation 1
    const [formErrors, setFormErrors] = useState({});

    const {email,password} = loginData;

    const handleInput = (e)=>{
        setLoginData({...loginData, [e.target.name] : e.target.value});
    }

    // form validation 2
    const validateForm = () => {
        let reqInputs = [
            "email",
            "password",
        ];
        for (let input in reqInputs) {
            if (loginData[input] === "") {
                return false;
            }
        }
        return true;
    };

    const loginUser = (e)=>{
        e.preventDefault();
        if(!validateForm()){
            console.log("Please fill all required fields.");
            return;
        }
        const formErrors = validate({ ...loginData });
        setFormErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
            axios.get('/sanctum/csrf-cookie').then(response => {
                axios.post(`api/login`, loginData).then(res =>{
                    if(res.data.status === 'Success')
                    {
                        swal("Yeah!",res?.data?.message,"success");
                        localStorage.setItem("user_token", res?.data?.token);
                        navigate('/');
                    }
                })
                .catch(error => {
                    swal("Opps!",error?.response?.data?.message,"error");
                 })
            });

        }
    }

    // form validation 4
    const validate = (values) => {
        const errors = {};
        if (!values.email) {
            errors.email = "email is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        return errors;
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0) {
            // console.log(loginData);
        }

    }, [formErrors]);

    return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img
            src="https://www.freepnglogos.com/uploads/whatsapp-logo-app-png-4.png"
            alt=""
          />
        </div>
        <div className="text-center mt-4 name">WhatsApp</div>
        <form className="p-3 mt-3">
            <InputField icon="far fa-user" type="text" name="email" placeholder="Email" onChange={handleInput} value={email}/>
            <span className="text-danger">{formErrors.email?formErrors.email:''}</span>

            <InputField icon="fas fa-key" type="password" name="password" onChange={handleInput} placeholder="Password" value={password}/>
            <span className="text-danger">{formErrors.password?formErrors.password:''}</span>

          <button className="btn mt-3" onClick={loginUser}>Login</button>
        </form>
        <div className="text-center fs-6">
          <Link to='/register'>Sign up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;

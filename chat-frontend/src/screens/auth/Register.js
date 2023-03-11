import React, { useEffect, useState } from "react";
import '../../assets/css/style.css'
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../components/InputField";
import { API_URL } from "../../constants/ApiUrl";
import axios from 'axios';
import swal from 'sweetalert';

const Register = () => {
    const navigate = useNavigate();
    const [registerData,setRegisterData] = useState({
        username:'',
        mobile:'',
        email:'',
        password:'',
    });

    // form validation 1
    const [formErrors, setFormErrors] = useState({});

    const {username,mobile,email,password} = registerData;

    const handleInput = (e)=>{
        setRegisterData({...registerData, [e.target.name] : e.target.value});
    }

    // form validation 2
    const validateForm = () => {
        let reqInputs = [
            "username",
            "mobile",
            "email",
            "password",
        ];
        for (let input in reqInputs) {
            if (registerData[input] === "") {
                return false;
            }
        }
        return true;
    };

    const registerUser = async (e)=>{
        e.preventDefault();
        // form validation 3
        if(!validateForm()){
            console.log("Please fill all required fields.");
            return;
        }
        const formErrors = validate({ ...registerData });
        setFormErrors(formErrors);
        if (Object.keys(formErrors).length === 0) {
           try {
            // for csrf token protection
            axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post(`api/register`, registerData).then(res =>{
                if(res?.data?.status === 'Failed')
                {
                    swal("Opps!",res?.data?.message,"warning");
                }
                if(res?.data.status === 'Success')
                {
                    swal("Yeah!",res?.data?.message,"success");
                    navigate('/login');
                }
            })
        });
            } catch (error) {
                console.log(error);
            }
        }
    }

    // form validation 4
    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const mobileRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.mobile) {
            errors.mobile = "Mobile number is required!";
        }else if (!mobileRegex.test(values.mobile)) {
            errors.mobile = "This is not a valid mobile number!";
        }
        if (!values.email) {
            errors.email = "Email id is required!";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        return errors;
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0) {
            // console.log(registerData);
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
            <InputField icon="far fa-user" type="text" name="username" placeholder="Username" onChange={handleInput} value={username}/>
            <span className="text-danger">{formErrors.username?formErrors.username:''}</span>

            <InputField icon="fa-solid fa-phone" type="text" name="mobile" placeholder="Mobile" onChange={handleInput} maxlength="10" value={mobile}/>
            <span className="text-danger">{formErrors.mobile?formErrors.mobile:''}</span>

            <InputField icon="fa-regular fa-envelope" type="text" name="email" onChange={handleInput} placeholder="Email" value={email}/>
            <span className="text-danger">{formErrors.email?formErrors.email:''}</span>

            <InputField icon="fas fa-key" type="password" name="password" onChange={handleInput} placeholder="Password" value={password}/>
            <span className="text-danger">{formErrors.password?formErrors.password:''}</span>

          <button className="btn mt-3" onClick={registerUser}>Register</button>
        </form>
        <div className="text-center fs-6">
          <Link to='/login'>Sign in</Link>
        </div>
      </div>
    </>
  );
};

export default Register;

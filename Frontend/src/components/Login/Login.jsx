import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/extend/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        login(data.access_token, data.payload);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successful Login",
          showConfirmButton: false,
          timer: 1500
        });
        setLoggedIn(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Credentials don't match",
          footer: `Status Code: ${response.status} - ${response.statusText}`
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ERROR!",
        footer: `Error making the request: ${error.message}`
      });
    }
  };

  if (loggedIn) {
    setTimeout(() => {
      navigate('/products');
    }, 2000);
  }

  return (
    <>
      <div className='ring'>
        <i style={{'--clr': '#55eb5a'}}></i>
        <i style={{'--clr': '#f01c62'}}></i>
        <i style={{'--clr': '#f1ef64'}}></i>
        <div className='login'>
          <h2>Login</h2>
          <div className='input-box'>
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className='input-box'>
            <input type="submit" value={"Sign in"} onClick={handleLogin}/>
          </div>
          <div className="links">
            <a href="#">Forget Password</a>
            <Link to={'/register'}>Signup</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

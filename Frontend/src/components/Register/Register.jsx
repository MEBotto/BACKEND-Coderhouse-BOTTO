import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Register.css'

const Register = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Verifica que las contraseñas coincidan antes de enviar al servidor
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Elimina la propiedad 'confirmPassword' del objeto antes de enviar al servidor
    const { confirmPassword, ...dataToSend } = formData;
    
    // Envia el objeto dataToSend al servidor
    fetch('http://localhost:8080/api/extend/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registration successful",
            showConfirmButton: false,
            timer: 1500
          });
          // Puedes redirigir al usuario a la página de inicio de sesión o realizar otras acciones después del registro exitoso
          setTimeout(() => {
            navigate('/products');
          }, 2000);
        } else {
          alert('Registration failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error during registration');
      });
  };

  return (
    <>
      <div className='ring-register'>
        <i style={{'--clr': '#55eb5a'}}></i>
        <i style={{'--clr': '#f01c62'}}></i>
        <i style={{'--clr': '#f1ef64'}}></i>
        <div className='register'>
          <h2>Register</h2>
          <div className='input-box'>
            <input type="text" placeholder='First Name' name='first_name' onChange={handleChange}/>
          </div>
          <div className='input-box'>
            <input type="text" placeholder='Last Name' name='last_name' onChange={handleChange}/>
          </div>
          <div className='input-box'>
            <input type="mail" placeholder='Email' name='email' onChange={handleChange}/>
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Password' name='password' onChange={handleChange}/>
          </div>
          <div className='input-box'>
            <input type="password" placeholder='Confirm password' name='confirmPassword' onChange={handleChange}/>
          </div>
          <div className='input-box'>
            <input type="number" placeholder='Age' min={'0'} name='age' onChange={handleChange}/>
          </div>
          <div className='input-box'>
            <input type="submit" value={"Sign up"} onClick={handleSubmit}/>
          </div>
          <div className="links" style={{justifyContent: 'center'}}>
            <p>Already Registered? Sign in <Link to={'/login'}><b>here</b></Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import FormRegister from '../../components/Forms/FormRegister';

const Register = () => {
  const navigate = useNavigate(); 

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
    <div className="h-screen w-screen my-auto flex justify-center items-center">
      <FormRegister />
    </div>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    // Verificar si hay un token antes de realizar la solicitud
    if (token) {
      fetch('http://localhost:8080/api/extend/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        // Actualizar el estado con los datos del usuario
        setUserData(data.payload);
      })
      .catch(error => console.error('Error al obtener datos del usuario:', error));
    }
  }, [token]);

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age}</p>
          <p>Role: {userData.role}</p>
        </div>
      ) : (
        <p>No user data available. Please log in.</p>
      )}
    </div>
  );
};

export default Profile;

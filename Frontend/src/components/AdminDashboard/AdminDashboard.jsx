import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar/Sidebar';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';
import UsersAdmin from './UsersAdmin/UsersAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/extend/users/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          // Si la respuesta no es exitosa (status 200), muestra un alert y redirige a /products
          alert('Error al obtener datos del servidor');
          navigate('/products');
          return;
        }
        // Aquí maneja la respuesta exitosa (status 200)
        const data = await response.json();
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Sidebar/>
      <Routes>
        <Route path='/users' element={<UsersAdmin token={token}/>}/>
        <Route path='/products' element={<ProductsAdmin token={token}/>}/>
      </Routes>
    
    </>
  )
}

export default AdminDashboard
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar/Sidebar';
import ProductsAdmin from './ProductsAdmin/ProductsAdmin';

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
        console.log(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <>
      <Sidebar/>
      <ProductsAdmin token={token}/>
    </>
  )
}

export default AdminDashboard
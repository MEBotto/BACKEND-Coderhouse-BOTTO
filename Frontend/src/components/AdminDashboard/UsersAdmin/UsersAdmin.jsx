import React from 'react'
import { useState, useEffect } from 'react';
import './UsersAdmin.css'

const UsersAdmin = ({ token }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realizar la solicitud fetch cuando el componente se monta o cuando cambian page o limit
    fetch(`http://localhost:8080/api/extend/users/admin/getUsers`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUsers(data.payload))
      .catch(error => console.error('Error fetching products:', error));
      console.log(users)
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    openEditModal();
  };

  const handleDelete = (productId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar la solicitud DELETE al servidor
        fetch(`http://localhost:8080/api/extend/products/${productId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        .then(response => response.json())
        .catch(error => console.error(error));
      }
    });
  };

  const handleAdd = () => {
    const newProduct = {
      code: '',
      description: '',
      price: '',
      stock: '',
      thumbnail: '',
      title: '',
    };

    setSelectedProduct(newProduct);
    openCreateModal();
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleSaveChanges = (method) => {
    // Implementa la lógica para enviar los cambios al servidor (solicitud PUT o POST)
    fetch(`http://localhost:8080/api/extend/products${method === 'PUT' ? `/${selectedProduct._id}` : ''}`, {
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProduct),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product updated/created successfully:', data);
        method === 'PUT' ? closeEditModal() : closeCreateModal();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <div className='users-main-container'>
        <h2>Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Foto Perfil</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td style={{maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0'}}><p>{user.photo}</p></td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Editar</button>
                  <button onClick={() => handleDelete(user._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='add-button' onClick={handleAdd}>
          Registrar Usuario
        </button>
      </div>
    </>
  )
}

export default UsersAdmin
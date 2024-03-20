import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './ProductsAdmin.css';

const ProductsAdmin = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    // Realizar la solicitud fetch cuando el componente se monta o cuando cambian page o limit
    fetch(`http://localhost:8080/api/extend/products?limit=${limit}&page=${page}`)
      .then(response => response.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [page, limit]); // Se vuelve a hacer la solicitud cuando cambian page o limit

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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); // Reiniciar la página a 1 cuando se cambia el límite
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
      {isEditModalOpen && (
        <div className='main-modal-overlay'>
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ marginBottom: '20px', color: 'black'}}>Editar Producto</h3>
              
              <label>Código:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.code : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, code: e.target.value })}
                className="input-field"
              />

              <label>Descripción:</label>
              <textarea
                value={selectedProduct ? selectedProduct.description : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                className="input-field"
              />

              <label>Precio:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.price : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                className="input-field"
              />

              <label>Stock:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.stock : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                className="input-field"
              />

              <label>URL de la Imagen:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.thumbnail : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, thumbnail: e.target.value })}
                className="input-field"
              />

              <label>Título:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.title : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                className="input-field"
              />

              <div className="button-container">
                <button className="save-button" onClick={() => handleSaveChanges('PUT')}>Guardar Cambios</button>
                <button className="cancel-button" onClick={closeEditModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className='main-modal-overlay'>
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ marginBottom: '20px', color: 'black'}}>Crear Producto</h3>
              
              <label>Código:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.code : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, code: e.target.value })}
                className="input-field"
              />

              <label>Descripción:</label>
              <textarea
                value={selectedProduct ? selectedProduct.description : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
                className="input-field"
              />

              <label>Precio:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.price : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
                className="input-field"
              />

              <label>Stock:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.stock : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: e.target.value })}
                className="input-field"
              />

              <label>URL de la Imagen:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.thumbnail : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, thumbnail: e.target.value })}
                className="input-field"
              />

              <label>Título:</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.title : ''}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
                className="input-field"
              />

              <div className="button-container">
                <button className="save-button" onClick={() => handleSaveChanges('POST')}>Guardar Producto</button>
                <button className="cancel-button" onClick={closeCreateModal}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='products-main-container'>
        <h2>Productos</h2>
        <div className='pagination-container'>
          <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            Anterior
          </button>
          <span>Página {page}</span>
          <button onClick={() => handlePageChange(page + 1)} disabled={!products.docs || products.docs.length < limit}>
            Siguiente
          </button>
          <div className='limit-selector'>
            <span style={{margin: '10px'}}>Mostrar:</span>
            <select value={limit} onChange={handleLimitChange}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.docs && products.docs.map((product) => (
              <tr key={product._id}>
                <td>{product.code}</td>
                <td>{product.title}</td>
                <td style={{maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: '0'}}><p style={{}}>{product.description}</p></td>
                <td>${product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => handleDelete(product._id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='add-button' onClick={handleAdd}>
          Agregar Producto
        </button>
      </div>
    </>
  );
};

export default ProductsAdmin;

import React, { useState, useEffect } from 'react';
import './ProductsAdmin.css';

const ProductsAdmin = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    // Realizar la solicitud fetch cuando el componente se monta o cuando cambian page o limit
    fetch(`http://localhost:8080/api/products?limit=${limit}&page=${page}`)
      .then(response => response.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));
  }, [page, limit]); // Se vuelve a hacer la solicitud cuando cambian page o limit

  const handleEdit = (product) => {
    setSelectedProduct(product);
    openModal();
  };

  const handleDelete = (productId) => {
    // Implementa la lógica de eliminación
    console.log(`Delete product with id ${productId}`);
  };

  const handleAdd = () => {
    // Implementa la lógica para agregar nuevos productos
    console.log('Add new product');
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(1); // Reiniciar la página a 1 cuando se cambia el límite
  };

  const openModal = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = () => {
    // Implementa la lógica para enviar los cambios al servidor (solicitud PUT)
    // Aquí debes realizar la solicitud PUT al servidor
    fetch(`http://localhost:8080/api/products/${selectedProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedProduct),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product updated successfully:', data);
        closeModal();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      {isEditModalOpen && (
        <div className="modal-overlay">
          {console.log("Abriendo")}
          <div className="modal-content">
            <h3>Editar Producto</h3>
            <label>ID:</label>
            <input type="text" value={selectedProduct ? selectedProduct._id : ''} readOnly />
            <label>Nombre:</label>
            <input
              type="text"
              value={selectedProduct ? selectedProduct.title : ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, title: e.target.value })}
            />
            <label>Precio:</label>
            <input
              type="text"
              value={selectedProduct ? selectedProduct.price : ''}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })}
            />
            <button onClick={handleSaveChanges}>Guardar Cambios</button>
            <button onClick={closeModal}>Cancelar</button>
          </div>
        </div>
      )}
      <div className='products-main-container'>
        {console.log(token)}
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
            <span>Mostrar:</span>
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
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.docs && products.docs.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Editar</button>
                  <button onClick={() => handleDelete(product.id)}>Eliminar</button>
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

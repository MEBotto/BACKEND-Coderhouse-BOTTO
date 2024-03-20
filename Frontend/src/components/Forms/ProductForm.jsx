import React, { useEffect, useState } from 'react';

const ProductForm = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    code: '',
    stock: 0,
  });

  useEffect (() => {
    console.log(product)
  },[product])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        alert("Producto agregado con exito")
        // Puedes realizar acciones adicionales después de agregar el producto
      } else {
        alert('Error al agregar el producto', error);
      }
    } catch (error) {
      alert('Error de red:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={product.title} onChange={handleChange} />
      </label>
      <br />
      <label>
        Description:
        <input type="text" name="description" value={product.description} onChange={handleChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={product.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        Thumbnail:
        <input type="text" name="thumbnail" value={product.thumbnail} onChange={handleChange} />
      </label>
      <br />
      <label>
        Code:
        <input type="text" name="code" value={product.code} onChange={handleChange} />
      </label>
      <br />
      <label>
        Stock:
        <input type="number" name="stock" value={product.stock} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default ProductForm;
import './ProductsListContainer.css'
import React from 'react'
import ProductsList from './ProductsList/ProductsList.jsx'
import { useState, useEffect } from 'react';

const ProductsListContainer = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/extend/products?limit=${limit}&page=${page}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const data = await response.json();
        setProducts(data.data);
        setTotalPages(data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= products.totalPages; i++) {
      pageNumbers.push(
        <button key={i} onClick={() => handlePageChange(setPage(i))} className={i === page ? 'active' : ''}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <div className={`main-container ${theme}`}>
        {loading ? (
          <p>Cargando...</p> // Muestra un mensaje de carga mientras se obtienen los datos
        ) : (
          <>
            <ProductsList products={products.docs} />
          </>
        )}
      </div>
      <div className={`pagination ${theme}`}>
        <button onClick={() => handlePageChange(setPage(page - 1))} style={{ visibility: page === 1 ? 'hidden' : 'visible' }}>
          <i className="ri-arrow-left-s-line"></i>
        </button>
        {renderPageNumbers()}
        <button onClick={() => handlePageChange(setPage(page + 1))} style={{ visibility: page === products.totalPages ? 'hidden' : 'visible' }}>
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
  </>

  )
}

export default ProductsListContainer
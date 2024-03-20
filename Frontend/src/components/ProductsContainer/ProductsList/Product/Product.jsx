import React from 'react'
import Swal from 'sweetalert2'
import './Product.css'

const Product = ({product}) => {
  const viewInfo = () => {
    Swal.fire({
      imageUrl: product.thumbnail,
      imageHeight: 400,
      imageAlt: product.title,
      text: product.description
    });
  }

  return (
    <div className='box'>
      <div className="card">
        <div className="image">
          <img src={product.thumbnail} alt="Foto producto"/>
        </div>
        <div className="desc">
          <h1>{product.title}</h1>
          <span>${product.price}</span>
          <div style={{ width: '290px'}}>
            <p>{product.description}</p>
          </div>
        </div>
        <button className="btn-info" onClick={viewInfo}>View More</button>
        <button className="btn">Add to Cart</button>
      </div>
    </div>
  )
}

export default Product
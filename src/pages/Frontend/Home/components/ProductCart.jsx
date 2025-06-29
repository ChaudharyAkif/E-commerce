import React from 'react'

const ProductCard = ({ product, addToCart }) => {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      textAlign: 'center'
    }}>
      <img src={product.image} width="100%" />
      <h4>{product.name}</h4>
      <p>${product.price}</p>
      <button onClick={() => addToCart(product)} style={{ marginTop: '10px' }}>
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard

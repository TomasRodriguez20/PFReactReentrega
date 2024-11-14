import React from 'react';
import '../App.css';

const ProductList = ({ products }) => {
  if (products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <img
              src={product.image}
              alt={product.title}
              className="product-image"
            />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            {/* Agregar enlace a detalle del producto */}
            <a href={`/product/${product.id}`}>View Details</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;

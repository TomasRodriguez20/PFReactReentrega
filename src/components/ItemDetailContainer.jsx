import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { db } from '../index';
import { doc, getDoc } from 'firebase/firestore';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [localStock, setLocalStock] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem, getProductQuantityInCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'ItemCollection', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = docSnap.data();

          const quantityInCart = getProductQuantityInCart(id);
          const availableStock = productData.stock - quantityInCart;

          setProduct(productData);
          setLocalStock(availableStock);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, getProductQuantityInCart]);

  const handleAddToCart = () => {
    if (quantity <= localStock) {
      addItem({ ...product, id }, quantity);
      alert(`${quantity} ${product.title}(s) agregado(s) al carrito.`);

      const newStock = localStock - quantity;
      setLocalStock(newStock);
    } else {
      alert(`Solo hay ${localStock} unidades disponibles.`);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = Math.max(1, Math.min(e.target.value, localStock));
    setQuantity(newQuantity);
  };

  if (loading) return <p>Cargando...</p>;

  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div>
      <h2>{product.title}</h2>
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.image}
          alt={product.title}
        />
      </div>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <p>Stock disponible: {localStock}</p>

      <div>
        <label>Cantidad:</label>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          max={localStock}
        />
        <button onClick={handleAddToCart}>Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ItemDetailContainer;

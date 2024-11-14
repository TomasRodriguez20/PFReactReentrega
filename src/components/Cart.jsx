/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import OrderForm from './OrderForm';

const Cart = () => {
  const { cart, removeItem, clear, updateItemQuantity } = useCart();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowOrderForm(true);
  };

  const handleIncrement = (item) => {
    const currentStock = item.stock;

    if (item.quantity < currentStock) {
      updateItemQuantity(item.id, item.quantity + 1);
    } else {
      alert(`No hay más stock disponible para ${item.title}`);
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateItemQuantity(item.id, item.quantity - 1);
    } else {
      alert(`La cantidad mínima es 1`);
    }
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div>
          <p>No hay ítems en tu carrito.</p>
          <Link to="/">Volver a buscar productos</Link>
        </div>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <h4>{item.title}</h4>
                <p>Precio: ${item.price}</p>

                {/* Mostramos la cantidad y los botones + y - */}
                <div>
                  <button onClick={() => handleDecrement(item)}>-</button>
                  <span>{item.quantity}</span>{' '}
                  {/* Muestra la cantidad dinámica */}
                  <button onClick={() => handleIncrement(item)}>+</button>
                </div>

                <button onClick={() => removeItem(item.id)}>Eliminar</button>
              </li>
            ))}
          </ul>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={clear}>Vaciar Carrito</button>
          <button onClick={handleCheckout}>Continuar con la Compra</button>
          {showOrderForm && <OrderForm cart={cart} totalPrice={totalPrice} />}
        </div>
      )}
    </div>
  );
};

export default Cart;

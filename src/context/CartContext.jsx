import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  const addItem = (item, quantity) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const clear = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const updateItemQuantity = (id, newQuantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  const getProductQuantityInCart = (id) => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        updateItemQuantity,
        isInCart,
        getProductQuantityInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

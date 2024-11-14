import { useState } from 'react';

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    if (quantity < stock) setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    onAdd(quantity);
    setQuantity(1);
  };

  return (
    <div>
      <button onClick={handleDecrement} disabled={quantity <= 1}>
        -
      </button>
      <span>{quantity}</span>
      <button onClick={handleIncrement} disabled={quantity >= stock}>
        +
      </button>
      <button onClick={handleAddToCart} disabled={stock <= 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;

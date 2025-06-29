import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';

const CartButton = () => {
  const { cartItems } = useCart();
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <Link to="/cart" className="relative">
        <button className="p-2 bg-blue-600 text-white rounded-full">
          🛒
        </button>
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </Link>
    </div>
  );
};

export default CartButton;
// src/pages/Frontend/Home/ProductCard.jsx
import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../../Dashboard/WishList/WishListContext';

const ProductCard = ({ product, addToCart, badgeColor = 'bg-red-600', compactLayout = false }) => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    setWishlisted(isWishlisted(product.id));
  }, [product.id, isWishlisted]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price,
    });
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setWishlisted(!wishlisted);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-[#FFAD33] w-3.5 h-3.5" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-[#FFAD33] w-3.5 h-3.5" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400 w-3.5 h-3.5" />);
    }

    return stars;
  };

  return (
    <div className={`shadow h-full flex flex-col group cursor-pointer ${compactLayout ? 'gap-1' : ''}`}>
      <div className="flex-grow" onClick={() => navigate(`/dashboard/product/${product.id}`)}>
        <div className="relative bg-gray-100 h-[250px] flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/images/fallback-product.png';
              e.target.className = 'w-full h-full object-contain p-4 opacity-50';
            }}
          />

          {product.discount && (
            <div className={`${badgeColor} text-white text-xs font-bold px-2 py-1 rounded absolute top-2 left-2`}>
              {product.discount}
            </div>
          )}

          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 w-full py-2 bg-black text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-700"
          >
            Add To Cart
          </button>

          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button
              className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
              onClick={toggleWishlist}
            >
              <svg
                className={`h-5 w-5 ${wishlisted ? 'text-red-500' : 'text-gray-600'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
            <button
              className="bg-white p-1 rounded-full shadow-md hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation(); // Prevent outer click
                navigate(`/dashboard/product/${product.id}`); // Navigate to detail
              }}
            >
              <FaEye className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>

        <h3 className={`text-base my-1 ${compactLayout ? 'text-sm font-medium' : ''}`}>
          {product.name}
        </h3>
      </div>

      {compactLayout ? (
        <div className="flex items-center gap-1.5 text-sm mt-1 mb-0.5">
          <p className="font-bold text-red-500 text-[14px]">${parseFloat(product.price).toFixed(2)}</p>
          <div className="flex gap-[0.8px]">{renderStars(product.rating || 0)}</div>
          <span className="text-gray-600 text-[11px]">({product.reviewCount || 0})</span>
        </div>
      ) : (
        <>
          <div className="flex items-center mb-2">
            <p className="font-bold text-red-500">${parseFloat(product.price).toFixed(2)}</p>
            {product.originalPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">${parseFloat(product.originalPrice).toFixed(2)}</p>
            )}
          </div>
          <div className="flex items-center mb-2">
            <div className="flex mr-1">{renderStars(product.rating || 0)}</div>
            <span className="text-gray-400 text-xs">({product.reviewCount || 0})</span>
          </div>
        </>
      )}

      <div className="flex space-x-2 mt-2">
        {product.colors?.map((color, index) => (
          <div key={index} className="w-4 h-4 rounded-full border" style={{ backgroundColor: color }}></div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;

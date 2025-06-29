import React from 'react';
import ProductCard from '../../Frontend/Home/ProductCarts/ProductCart1';
import { Trash2 } from 'lucide-react';
import { useWishlist } from './WishListContext';

const WishlistMain = () => {
  const { wishlist, removeFromWishlist, clearWishlist, isLoading } = useWishlist();

  if (isLoading) {
    return (
      <div className="bg-white px-4 py-6 sm:px-6 lg:px-10">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center text-gray-500 py-24">
            <p className="text-lg">Loading wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-6 sm:px-6 lg:px-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl sm:text-2xl font-semibold text-black">
            Wishlist ({wishlist.length})
          </h1>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="border px-4 py-1 rounded text-sm hover:bg-gray-100"
            >
              Move All To Bag
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 py-24">
            <p className="text-lg">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
            {wishlist.map((product) => (
              <div key={product.id} className="relative group">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 z-10 bg-white hover:bg-red-100 p-1 rounded-full shadow"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
                <ProductCard product={product} addToCart={() => {}} compactLayout />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistMain;
import React from 'react';
import ProductCard from '../../Frontend/Home/ProductCarts/ProductCart1';
import laptop from '../../../assets/images/laptop.png';

const products = [
  {
    id: '1',
    name: 'ASUS FHD Gaming Laptop',
    price: 960,
    originalPrice: 1160,
    discount: '-35%',
    rating: 5,
    reviewCount: 65,
    image: laptop,
    badgeType: 'discount',
  },
  {
    id: '2',
    name: 'IPS LCD Gaming Monitor',
    price: 1160,
    rating: 5,
    reviewCount: 65,
    image: '/images/monitor.jpg',
  },
  {
    id: '3',
    name: 'HAVIT HV-G92 Gamepad',
    price: 560,
    rating: 5,
    reviewCount: 65,
    image: '/images/gamepad.jpg',
    badgeType: 'new',
  },
  {
    id: '4',
    name: 'AK-900 Wired Keyboard',
    price: 200,
    rating: 5,
    reviewCount: 65,
    image: '/images/keyboard.jpg',
  },
];

const JustForYou = () => {
  return (
    <div className="bg-white py-10 px-5 md:px-12">
      {/* Header */}
      <div className="flex items-center justify-end mb-8">
        {/* <div className="flex items-center gap-2">
        </div> */}
        <button className="text-sm border border-black px-4 py-1 rounded hover:bg-gray-100">
          See All
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default JustForYou;

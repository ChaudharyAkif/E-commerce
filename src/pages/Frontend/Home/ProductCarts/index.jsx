import React, { useRef } from 'react';
import { useCart } from '../CartContext';
import ProductCard from './ProductCart1';
import applewatch from '../../../../assets/images/applewatch.png';
import game from '../../../../assets/images/game.png';
import keyboard from '../../../../assets/images/keyboard.png';
import lcd from '../../../../assets/images/lcd.png';
import chair from '../../../../assets/images/chair.png';
import machine1 from '../../../../assets/images/machine1.png';
import fallbackImage from '../../../../assets/images/women1.jpg';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button, Col, Row } from 'antd';
import { Link } from 'react-router-dom';

const ProductCartmain = () => {
  const { addToCart } = useCart();
  const carouselRef = useRef(null);

  const products = [
    {
      id: 1,
      name: "HAVIT HV-G92 Gamepad",
      price: 120,
      image: game,
      discount: -40,
      originalPrice: 180,
      reviewCount: 88,
      rating: 5
    },
    {
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      image: keyboard,
      discount: -35,
      originalPrice: 1160,
      reviewCount: 75,
      rating: 4
    },
    {
      id: 3,
      name: "IPS LCD Gaming Monitor",
      price: 370,
      image: lcd,
      discount: -30,
      originalPrice: 400,
      reviewCount: 99,
      rating: 5
    },
    {
      id: 4,
      name: "S-Series Comfort Chair",
      price: 375,
      image: chair,
      discount: -30,
      originalPrice: 400,
      reviewCount: 89,
      rating: 4.5
    },
    {
      id: 5,
      name: "Apple Watch Series 7",
      price: 399.99,
      image: applewatch,
      discount: 50,
      originalPrice: 222,
      reviewCount: 22,
      rating: 3.5
    },
    {
      id: 6,
      name: "Smart Coffee Machine",
      price: 149.49,
      image: machine1,
      discount: 50,
      reviewCount: 11,
      rating: 3.8
    },
    {
      id: 7,
      name: "Wireless Earbuds",
      price: 79.99,
      image: fallbackImage,
      discount: 50,
      reviewCount: 18,
      rating: 4
    }
  ];

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-[1170px] -sm py-3 mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 relative">
          <button
            onClick={scrollLeft}
            className="absolute right-10 top-[-60px] transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaChevronLeft className="text-black" />
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar space-x-6 px-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-64" style={{ scrollSnapAlign: 'start' }}>
            <ProductCard product={product} addToCart={addToCart} badgeColor="bg-red-600" />

              </div>
            ))}
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-[-60px] transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
          >
            <FaChevronRight className="text-black" />
          </button>

          <Row>
            <Col span={24} className="text-center mt-15">
              <Link to={"/product"}>
                <Button type="primary" className="!py-3 md:w-[234px] md:!h-[46px]">
                  View All Products
                </Button>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ProductCartmain;

  import React, { useRef } from 'react';
  import { useCart } from '../CartContext';
  import ProductCard from './ProductCart1';
  import applewatch from '../../../../assets/images/applewatch.png';
  import choclate from '../../../../assets/images/choclate.jpg';
  import camera from '../../../../assets/images/camera.png';
  import laptop from '../../../../assets/images/laptop.png';
  import cream from '../../../../assets/images/cream.png';
  import machine1 from '../../../../assets/images/machine1.png';
  import chair from '../../../../assets/images/chair.png';
  import fallbackImage from '../../../../assets/images/women1.jpg';
  import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
  import { Button, Col, Row } from 'antd';
  import { Link } from 'react-router-dom';

  const ExploreProduct = () => {
    const { addToCart } = useCart();
    const carouselRef = useRef(null);

    const products = [
      {
        id: 1,
        name: "HAVIT HV-G92 Gamepad",
        price: 120,
        image: choclate,
        
        originalPrice: 180,
        reviewCount: 88,
        rating: 5
      },
      {
        id: 2,
        name: "AK-900 Wired Keyboard",
        price: 960,
        image: camera,
        
        originalPrice: 1160,
        reviewCount: 75,
        rating: 4
      },
      {
        id: 3,
        name: "IPS laptop Gaming Monitor",
        price: 370,
        image: laptop,
        
        originalPrice: 400,
        reviewCount: 99,
        rating: 5
      },
      {
        id: 4,
        name: "S-Series Comfort cream ",
        price: 375,
        description: "Advanced health tracking with sleek design",
        image: cream,
        
        originalPrice: 400,
        reviewCount: 89,
        rating: 4.5
      },
      {
        id: 5,
        name: "S-Series Comfort Chair ",
        price: 375,
        description: "Advanced health tracking with sleek design",
        image: chair,
        
        originalPrice: 400,
        reviewCount: 89,
        rating: 4.5
      },
      {
        id: 6,
        name: "Apple Watch Series 7",
        price: 399.99,
        description: "Advanced health tracking with sleek design",
        image: applewatch,
        originalPrice: 222,
        reviewCount: 22,
        rating: 3.5
      },
      {
        id: 7,
        name: "Smart Coffee Machine",
        price: 149.49,
        description: "Brew your coffee with smart features",
        image: machine1
      },
      {
        id: 8,
        name: "Wireless Earbuds",
        price: 79.99,
        description: "Crystal clear sound with noise cancellation",
        image: fallbackImage
      }
    ];

    const scrollLeft = () => {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
      <div className="w-full max-w-[1170px]  mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" pt-8 relative">

            <div className="relative ">
              <button
                onClick={scrollLeft}
                className="absolute right-10 top-[-58px]  transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
              >
                <FaChevronLeft className="text-black" />
              </button>

              <div
                ref={carouselRef}
                className="flex overflow-x-auto no-scrollbar mt-10 space-x-6 "
                style={{ scrollSnapType: 'x mandatory' }}
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-64  "
                    style={{ scrollSnapAlign: 'start' }}
                  >
                    <ProductCard
                      product={product}
                      compactLayout={true}
                      addToCart={addToCart}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={scrollRight}
                className="absolute right-0 top-[-58px] transform -translate-y-1/2 z-10 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
              >
                <FaChevronRight className="text-black" />
              </button>
    <div
                className="absolute left-0 top-[-70px] my-5 mt-5 transform -translate-y-1/2 z-10  rounded-full shadow-md "
              >
                  <h1 className='md:text-3xl sm:text-2xl'>Best Selling Products</h1>
              </div>
              
            </div>
          </div>

        </div>
      </div>
    );
  };

  export default ExploreProduct;  
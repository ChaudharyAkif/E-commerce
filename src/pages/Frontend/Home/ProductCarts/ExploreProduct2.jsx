import React, { useRef } from 'react';
import { useCart } from '../CartContext';
import ProductCard from './ProductCart1';
import applewatch from '../../../../assets/images/applewatch.png';
import shoes from '../../../../assets/images/shoes.png';
import car from '../../../../assets/images/car.png';
import gamecontroller from '../../../../assets/images/gamecontroller.png';
import jacket from '../../../../assets/images/jacket.png';
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
      image: car,
      price: 120,
      discount: "new",
      reviewCount: 88,
      rating: 5,
      colors: ['#165E5E', '#FF0000'],
      
    },
    {
      colors: ['#FF0000', '#000000'],
      id: 2,
      name: "AK-900 Wired Keyboard",
      price: 960,
      image: shoes,
      reviewCount: 75,
      rating: 4
    },
    {
      id: 3,
      colors: ['#000000', '#FF0000'],
      name: "IPS gamecontroller Gaming Monitor",
      price: 370,
      image: gamecontroller,
      discount: "new",
      
      reviewCount: 99,
      rating: 5
    },
    {
      id: 4,
      colors: ['#7A1818', '#1E1E1E'],
      name: "S-Series Comfort jacket ",
      price: 375,
      description: "Advanced health tracking with sleek design",
      image: jacket,

      reviewCount: 89,
      rating: 4.5
    },
    {
      id: 5,
      name: "S-Series Comfort Chair ",
      price: 375,
      description: "Advanced health tracking with sleek design",
      image: chair,
      discount: 50,
      // reviewCount: 89,
      // rating: 4.5
    },
    {
      id: 6,
      name: "Apple Watch Series 7",
      price: 399.99,
      discount: 50,
      description: "Advanced health tracking with sleek design",
      image: applewatch,
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



  return (
    <div className="w-full max-w-[1170px] mx-auto  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="  relative">

          <div className="relative ">


            <div
              ref={carouselRef}
              className="flex overflow-x-auto no-scrollbar mt-10 space-x-6 "
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className=" flex-shrink-0 w-64  "
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <ProductCard
                    product={product}
                    addToCart={addToCart}
                    compactLayout={true}
                    badgeColor="bg-[#00ff66]"
                  />
                </div>
              ))}
            </div>


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
    </div>
  );
};

export default ExploreProduct;
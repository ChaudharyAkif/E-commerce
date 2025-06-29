import React from 'react';
import { AppleFilled } from '@ant-design/icons';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // Changed to 3 seconds for better readability
    arrows: true,
    pauseOnHover: true,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          speed: 800,
          autoplaySpeed: 3000
        }
      }
    ]
  };

  const slides = [
    {
      id: 1,
      bgColor: 'bg-black',
      textColor: 'text-white',
      logo: <AppleFilled className="text-4xl text-white" />,
      brand: 'iPhone 16 Series',
      headline: 'Up to 10% off Voucher',
      linkText: 'Shop Now →',
      linkPath: '/shop/iphone16',
      imageUrl: 'https://www.apple.com/newsroom/images/2024/09/apple-debuts-iphone-16-pro-and-iphone-16-pro-max/article/Apple-iPhone-16-Pro-hero-240909_inline.jpg.large_2x.jpg',
      imageClass: 'w-36 md:w-60'
    },
    {
      id: 2,
      bgColor: 'bg-gray-900',
      textColor: 'text-white',
      brand: 'oraimo Watch ES 2 1.95″',
      headline: 'AMOLED IP68 Smart Watch',
      linkText: 'Discover More →',
      linkPath: '/shop/smart-watches',
      imageUrl: 'https://cdn-img.oraimo.com/fit-in/600x600/KE/product/2024/07/24/OSW-810-680-9.jpg',
      imageClass: 'w-48 md:w-72'
    },
    {
      id: 3,
      bgColor: 'bg-gray-900',
      textColor: 'text-white',
      brand: 'Baseus D05 Bowie Wireless Headphones',
      headline: 'Bluetooth 5.3 Foldable Sport Headset',
      linkText: 'Buy Now →',
      linkPath: '/shop/headphones',
      imageUrl: 'https://phonetive.pk/cdn/shop/files/Sbb1c2fa4e39b43189171fc78be5b5f29i.jpg_554x554.jpg_5be38468-9421-4043-bdd1-9dfcf581470d_1024x1024.webp?v=1722931732',
      imageClass: 'w-48 md:w-72'
    }
  ];

  return (
    <div className="w-full max-w-[1170px] mx-auto py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <div className="w-full overflow-hidden shadow-lg rounded-lg">
          <Slider {...settings}>
            {slides.map((slide) => (
              <div key={slide.id} className="h-[500px]"> {/* Fixed height container */}
                <div className={`${slide.bgColor} ${slide.textColor} h-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between`}>
                  <div className="md:ml-10 mb-8 md:mb-0 md:w-1/2">
                    {slide.logo && <span className="inline-block mr-3">{slide.logo}</span>}
                    <h2 className="text-2xl md:text-3xl font-medium mb-4">{slide.brand}</h2>
                    <p className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                      {slide.headline}
                    </p>
                    <Link 
                      to={slide.linkPath} 
                      className={`${slide.textColor} font-medium text-lg px-6 py-2 rounded-md border-2 border-white hover:bg-white hover:text-black transition-colors duration-300`}
                    >
                      {slide.linkText}
                    </Link>
                  </div>
                  <img 
                    src={slide.imageUrl} 
                    alt={slide.brand}
                    className={`${slide.imageClass} object-contain transition-transform duration-300 hover:scale-105 md:mr-16`}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
// import React from 'react';
// import { FireFilled, GiftFilled } from '@ant-design/icons';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
// import { Link } from 'react-router-dom';

// const DealsCarousel = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: false,
//     pauseOnHover: true
//   };

//   const deals = [
//     {
//       id: 1,
//       bgColor: 'bg-gradient-to-r from-red-600 to-orange-500',
//       textColor: 'text-white',
//       icon: <FireFilled className="text-4xl" />,
//       title: 'FLASH SALE',
//       headline: 'Limited Time Offers',
//       discount: 'UP TO 70% OFF',
//       buttonText: 'Grab Deals',
//       linkPath: '/flash-sale',
//       imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
//     },
//     {
//       id: 2,
//       bgColor: 'bg-gradient-to-r from-green-600 to-emerald-500',
//       textColor: 'text-white',
//       icon: <GiftFilled className="text-4xl" />,
//       title: 'DAILY DEALS',
//       headline: 'Special Discounts',
//       discount: '30-50% OFF',
//       buttonText: 'Shop Offers',
//       linkPath: '/daily-deals',
//       imageUrl: 'https://images.unsplash.com/photo-1607082349566-00737146aabf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
//     }
//   ];

//   return (
//     <div className="w-full mt-8 rounded-xl overflow-hidden shadow-lg">
//       <Slider {...settings}>
//         {deals.map((deal) => (
//           <div key={deal.id} className="h-[400px]">
//             <div className={`${deal.bgColor} ${deal.textColor} h-full p-8 flex flex-col items-center justify-center text-center`}>
//               <div className="mb-6">
//                 {deal.icon}
//                 <h3 className="text-2xl font-bold mt-2">{deal.title}</h3>
//               </div>
//               <h2 className="text-3xl md:text-5xl font-bold mb-2">{deal.headline}</h2>
//               <p className="text-2xl font-semibold mb-8">{deal.discount}</p>
//               <Link 
//                 to={deal.linkPath}
//                 className="border-2 border-white px-8 py-2 rounded-full font-bold hover:bg-white hover:text-gray-800 transition-colors duration-300"
//               >
//                 {deal.buttonText}
//               </Link>
//               <img 
//                 src={deal.imageUrl} 
//                 alt={deal.title}
//                 className="mt-8 max-h-40 object-contain"
//               />
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default DealsCarousel;
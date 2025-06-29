import React from 'react';
import { FaHeadset, FaMoneyBillWave, FaArrowUp } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import secure from '../../../../assets/images/sucure.png';

const FeaturesSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="bg-gray-50 py-10 px-4 w-full max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Delivery */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <TbTruckDelivery className="text-5xl text-white bg-black p-2 rounded-full" />
            </div>
            <h3 className="font-bold uppercase text-lg mb-2">FREE AND FAST DELIVERY</h3>
            <p className="text-gray-600">Free delivery for all orders over $140</p>
          </div>

          {/* Customer Service */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <FaHeadset className="text-5xl text-white bg-black p-2 rounded-full" />
            </div>
            <h3 className="font-bold uppercase text-lg mb-2">24/7 CUSTOMER SERVICE</h3>
            <p className="text-gray-600">Friendly 24/7 customer support</p>
          </div>

          {/* Money Back Guarantee */}
          <div className="text-center">
            <div className="flex justify-center mb-3">
              <img src={secure} alt="Secure" className="h-12 w-12 bg-black p-2 rounded-full" />
            </div>
            <h3 className="font-bold uppercase text-lg mb-2">MONEY BACK GUARANTEE</h3>
            <p className="text-gray-600">We return money within 30 days</p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button 
        className="fixed bottom-8 right-6 w-12 h-12 bg-white text-black rounded-full shadow-lg 
                   hover:bg-gray-400 hover:text-white transition-all flex items-center justify-center
                   text-xl z-50"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </>
  );
};

export default FeaturesSection;

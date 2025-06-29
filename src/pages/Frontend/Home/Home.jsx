import React from 'react';
import Sale from './Sale/sale';
import ProductCartmain from './ProductCarts';
import FeaturedProducts from './FeaturedProducts;/FeaturedProducts';
import FlashSale from './Flase Sale/Flashsale';
import FeaturesSection from './SecureProduct/SecureProduct';
import ProductCartmain2 from './ProductCarts/index copy';
import EcommerceCarousel from './ImageSlider/imageslider';
import ExploreProduct from './ProductCarts/ExploreProduct';
import ExporeProduct2 from './ProductCarts/ExploreProduct2';
import CategoryGrid from './Category/BrowserCategory';
import RequestSellerAccess from '../users/RequestSellerAccess';
import SellerRequests from '../../Dashboard/Admin/SellerRequests';

const Home = () => {
  return (
    <div className="space-y-8"> {/* Added consistent spacing */}
      <EcommerceCarousel />
      <Sale title="Today's Hot Deals"  />
      <FlashSale />
      <ProductCartmain />
      <Sale title="Browse Categories"  />
      <CategoryGrid />
      <Sale title="Monthly Specials"  />
      <ProductCartmain2 />
      <EcommerceCarousel />
      <Sale title="Featured Products"  />
      <ExploreProduct />
      <ExporeProduct2 />
      <FeaturedProducts />
      <FeaturesSection />
      {/* <SellerRequests />  */}

    </div>
  );
};

export default Home;
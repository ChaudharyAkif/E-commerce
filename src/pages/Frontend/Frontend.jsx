import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import ProductPage from './Home/ProductPage';
import Checkout from './Home/CheckOut/CheckOut';
import ContactUs from './Contact Us/ContactUs';
import PageNotFound from '../Misc/PageNotFound/PageNotFound';
import CartPage from './Home/CartPage';
import Add from './addProduct/Add';
import About from './About/About';
import SellerRequests from '../Dashboard/Admin/SellerRequests';
import RequestSellerAccess from './users/RequestSellerAccess';
import TopBar from '../../components/Header/Topbar';
import Navbar from '../../components/Header/Navbar';
import ThankYou from '../../components/Thankyou';

const Frontend = () => {
  return (
      <>
         <TopBar />
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/addproduct" element={<Add />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="RequestSellerAccess" element={<RequestSellerAccess />} />
        <Route path="SellerRequests" element={<SellerRequests />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
      </>
  );
};

export default Frontend;

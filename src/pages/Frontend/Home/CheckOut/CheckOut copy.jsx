import React, { useState, useEffect } from 'react';
import {
  Input, Button, Radio, Row, Col, Breadcrumb, Form, Checkbox, ConfigProvider, message
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck } from 'lucide-react';
import lcd from '../../../../assets/images/lcd.png';
import game from '../../../../assets/images/game.png';
import visa from '../../../../assets/images/visa.png';
import bkash from '../../../../assets/images/bkash.png';
import master from '../../../../assets/images/master.png';
import hindicard from '../../../../assets/images/hindicard.png';
import './CheckOut.css';
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  EyeOutlined,
  CreditCardOutlined
} from '@ant-design/icons';
import { useCart } from '../CartContext';
import { supabase } from '../../../../utils/supabaseClient'; // Ensure supabase client is imported correctly

const Checkout = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const { cartItems, clearCart } = useCart();
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price),
    0
  );

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleonChange = (e) => {
    setChecked(e.target.checked);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.email || !form.address || !form.city || !form.country) {
      message.error('Please fill all fields');
      return;
    }

    const { error } = await supabase.from('orders').insert([
      {
        user_email: form.email,
        shipping_address: {
          name: form.name,
          address: form.address,
          city: form.city,
          country: form.country,
        },
        cart_items: cartItems,
        total_amount: totalAmount,
        status: 'pending',
        user_id: user?.id || null,
      },
    ]);

    if (error) {
      message.error('Failed to place order');
    } else {
      message.success('Order placed successfully!');
      clearCart();
      navigate('/');
    }
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff4d4f',
        },
        components: {
          Checkbox: {
            colorPrimary: '#ff4d4f',
            colorPrimaryHover: '#ff7875',
            colorBorder: '#ffccc7',
            borderRadiusSM: 4,
          },
        },
      }}
    >
      <div className="w-full -sm py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="text-sm font-sans"
            items={[
              {
                href: '/account',
                title: (
                  <span className="flex items-center gap-1 text-gray-600 hover:text-black">
                    <HomeOutlined />
                    <span>Account</span>
                  </span>
                ),
              },
              {
                href: '/account/my-account',
                title: (
                  <span className="flex items-center gap-1 text-gray-600 hover:text-black">
                    <UserOutlined />
                    <span>My Account</span>
                  </span>
                ),
              },
              {
                href: '/products',
                title: (
                  <span className="flex items-center gap-1 text-gray-600 hover:text-black">
                    <ShoppingCartOutlined />
                    <span>Product</span>
                  </span>
                ),
              },
              {
                href: '/products/view-cost',
                title: (
                  <span className="flex items-center gap-1 text-gray-600 hover:text-black">
                    <EyeOutlined />
                    <span>View Cost</span>
                  </span>
                ),
              },
              {
                title: (
                  <span className="flex items-center gap-1 font-medium text-black">
                    <CreditCardOutlined />
                    <span>CheckOut</span>
                  </span>
                ),
              },
            ]}
          />
          <div className="flex flex-col md:flex-row w-full p-8 gap-10">
            {/* Billing Details */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
              <Form layout="vertical" className="flex flex-col gap-4 [&_.ant-input]:!bg-gray-100">
                <Form.Item label="Full Name *">
                  <Input className="py-2" name="name" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Company Name">
                  <Input className="py-2" name="companyName" />
                </Form.Item>
                <Form.Item label="Street Address">
                  <Input className="py-2" name="address" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Apartment, floor, etc. (optional)">
                  <Input className="py-2" name="floor" />
                </Form.Item>
                <Form.Item label="Town/City*">
                  <Input className="py-2" name="city" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Country*">
                  <Input className="py-2" name="country" onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Email Address*">
                  <Input className="py-2" name="email" onChange={handleChange} />
                </Form.Item>
                <Checkbox onChange={handleonChange}>Save this information for faster check-out next time</Checkbox>
              </Form>
            </div>

            {/* Order Summary */}
            <div className="w-full md:w-1/2 lg:mt-15">
              <div className="lg:w-[400px] lg:ml-20">
                {cartItems.map((item) => (
                  <div className="flex items-center justify-between mb-4" key={item.id}>
                    <div className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/80';
                        }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>${parseFloat(item.price).toFixed(2)}</span>
                  </div>
                ))}

                {/* Price Summary */}
                <div className="pt-4 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t flex justify-between my-3 pt-3">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t flex justify-between font-semibold text-base pt-3">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-6 space-y-2">
                  <Radio.Group
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                    className="flex flex-col gap-2"
                  >
                    <Radio value="bank" className="custom-radio">
                      <div className="flex items-center justify-between">
                        <span>Bank</span>
                        <div className="flex gap-3">
                          <img src={bkash} alt="bkash" className="w-[35px] h-[22px]" />
                          <img src={visa} alt="visa" className="w-[35px] h-[22px]" />
                          <img src={master} alt="master" className="w-[35px] h-[22px]" />
                          <img src={hindicard} alt="hindicard" className="w-[35px] h-[22px]" />
                        </div>
                      </div>
                    </Radio>
                    <Radio value="cod" className="custom-radio">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        <span>Cash on delivery</span>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>

                {/* Coupon Code */}
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Coupon Code" className="w-full !placeholder-gray-500 !border-black" />
                  <Button type="primary" className="bg-red-500 text-white hover:bg-red-600">
                    Apply Coupon
                  </Button>
                </div>

                {/* Place Order */}
                <Button
                  type="primary"
                  style={{ width: '200px' }}
                  className="mt-4 w-full"
                  onClick={handlePlaceOrder}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Checkout;

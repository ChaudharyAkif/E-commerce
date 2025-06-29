import React, { useState, useEffect } from 'react';
import {
  Input, Button, Radio, Breadcrumb, Form, Checkbox,
  ConfigProvider, message, Modal, Select
} from 'antd';
import {
  HomeOutlined, UserOutlined, ShoppingCartOutlined,
  EyeOutlined, CreditCardOutlined, BankOutlined
} from '@ant-design/icons';
import { Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import supabase from '../../../../config/supabase';

import bkash from '../../../../assets/images/bkash.png';
import visa from '../../../../assets/images/visa.png';
import master from '../../../../assets/images/master.png';
import hindicard from '../../../../assets/images/hindicard.png';

import './CheckOut.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [form] = Form.useForm();

  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [bankAccounts, setBankAccounts] = useState([]);
  const [showBankModal, setShowBankModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newAccountForm] = Form.useForm();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price),
    0
  );

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchBankAccounts(user.id);
      }
    };
    fetchUser();
  }, []);

  const fetchBankAccounts = async (userId) => {
    const { data, error } = await supabase
      .from('bank_payments')
      .select('*')
      .eq('user_id', userId);
    
    if (!error && data) {
      setBankAccounts(data);
    }
  };

  const handleAddNewAccount = async (values) => {
    const { error } = await supabase.from('bank_payments').insert({
      ...values,
      user_id: user?.id,
      amount: totalAmount
    });

    if (error) {
      message.error('Failed to save bank account');
    } else {
      message.success('Bank account saved successfully');
      fetchBankAccounts(user?.id);
      newAccountForm.resetFields();
      setShowBankModal(false);
    }
  };

  const handlePlaceOrder = async (values) => {
    if (paymentMethod === 'bank' && !selectedAccount) {
      message.error('Please select a bank account');
      return;
    }

    // Find selected bank account details
    const bankAccount = bankAccounts.find(acc => acc.id === selectedAccount);

    const orderData = {
      user_email: values.email,
      user_id: user?.id || null,
      shipping_address: {
        name: values.name,
        address: values.address,
        city: values.city,
        country: values.country
      },
      items: cartItems, // Changed from cart_items to items
      total_amount: totalAmount,
      status: 'pending',
      payment_method: paymentMethod,
      payment_details: paymentMethod === 'bank' ? {
        account_id: selectedAccount,
        bank_name: bankAccount?.bank_name,
        account_number: bankAccount?.account_number,
        account_holder: bankAccount?.account_holder,
        payment_status: 'pending'
      } : null
    };

    if (paymentMethod === 'bank') {
      navigate('/PaymentConfirm', { state: { orderData } });
      return;
    }

    const { error } = await supabase.from('orders').insert([orderData]);

    if (error) {
      message.error('Failed to place order');
      console.error('Order creation error:', error);
    } else {
      message.success('Order placed successfully!');
      clearCart();
      navigate('/thankyou');
    }
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#ff4d4f' },
        components: {
          Checkbox: {
            colorPrimary: '#ff4d4f',
            colorPrimaryHover: '#ff7875',
            colorBorder: '#ffccc7',
            borderRadiusSM: 4
          }
        }
      }}
    >
      <div className="w-full py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            className="text-sm font-sans"
            items={[
              { href: '/account', title: <span className="flex items-center gap-1"><HomeOutlined />Account</span> },
              { href: '/account/my-account', title: <span className="flex items-center gap-1"><UserOutlined />My Account</span> },
              { href: '/products', title: <span className="flex items-center gap-1"><ShoppingCartOutlined />Product</span> },
              { href: '/products/view-cost', title: <span className="flex items-center gap-1"><EyeOutlined />View Cost</span> },
              { title: <span className="flex items-center gap-1 font-medium"><CreditCardOutlined />Checkout</span> }
            ]}
          />

          <div className="flex flex-col md:flex-row w-full p-8 gap-10">
            {/* Billing Section */}
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
              <Form form={form} layout="vertical" className="flex flex-col gap-4 [&_.ant-input]:!bg-gray-100" onFinish={handlePlaceOrder}>
                <Form.Item label="Full Name *" name="name" rules={[{ required: true }]}>
                  <Input className="py-2" />
                </Form.Item>
                <Form.Item label="Company Name" name="companyName">
                  <Input className="py-2" />
                </Form.Item>
                <Form.Item label="Street Address *" name="address" rules={[{ required: true }]}>
                  <Input className="py-2" />
                </Form.Item>
                <Form.Item label="Apartment, floor, etc. (optional)" name="floor">
                  <Input className="py-2" />
                </Form.Item>
                <Form.Item label="Town/City *" name="city" rules={[{ required: true }]}>
                  <Input className="py-2" />
                </Form.Item>
                <Form.Item label="Country *" name="country" rules={[{ required: true }]}>
                  <Input className="py-2" />
                </Form.Item>
                <Form.Item label="Email Address *" name="email" rules={[{ required: true, type: 'email' }]}>
                  <Input className="py-2" />
                </Form.Item>
                <Checkbox onChange={(e) => setChecked(e.target.checked)}>Save this info for next time</Checkbox>
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
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/80'; }}
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>${parseFloat(item.price).toFixed(2)}</span>
                  </div>
                ))}

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

                {/* Payment Options */}
                <div className="mt-6 space-y-2">
                  <Radio.Group
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    value={paymentMethod}
                    className="flex flex-col gap-2"
                  >
                    <Radio value="bank" className="custom-radio">
                      <div className="flex items-center justify-between">
                        <span>Bank Transfer</span>
                        <div className="flex gap-3">
                          <img src={bkash} alt="bkash" className="w-[35px] h-[22px]" />
                          <img src={visa} alt="visa" className="w-[35px] h-[22px]" />
                          <img src={master} alt="master" className="w-[35px] h-[22px]" />
                          <img src={hindicard} alt="hindicard" className="w-[35px] h-[22px]" />
                        </div>
                      </div>
                    </Radio>
                    
                    {paymentMethod === 'bank' && (
                      <div className="ml-6 mt-2">
                        <div className="mb-2">
                          <Select
                            placeholder="Select a bank account"
                            style={{ width: '100%' }}
                            onChange={setSelectedAccount}
                            value={selectedAccount}
                            dropdownRender={(menu) => (
                              <>
                                {menu}
                                <div className="p-2 border-t border-gray-200">
                                  <Button
                                    type="text"
                                    icon={<BankOutlined />}
                                    onClick={() => setShowBankModal(true)}
                                    block
                                  >
                                    Add New Bank Account
                                  </Button>
                                </div>
                              </>
                            )}
                          >
                            {bankAccounts.map(account => (
                              <Select.Option key={account.id} value={account.id}>
                                {account.bank_name} - {account.account_number} ({account.account_holder})
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                    )}
                    
                    <Radio value="cod" className="custom-radio">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5" />
                        <span>Cash on delivery</span>
                      </div>
                    </Radio>
                  </Radio.Group>
                </div>

                <Button
                  type="primary"
                  size="large"
                  className="mt-6 w-full"
                  onClick={() => form.submit()}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Bank Account Modal */}
      <Modal
        title="Add New Bank Account"
        open={showBankModal}
        onCancel={() => setShowBankModal(false)}
        footer={null}
      >
        <Form form={newAccountForm} layout="vertical" onFinish={handleAddNewAccount}>
          <Form.Item
            label="Account Holder Name"
            name="account_holder"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bank Name"
            name="bank_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Account Number"
            name="account_number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Routing Number"
            name="routing_number"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};

export default Checkout;
import React, { useState } from 'react';
import { Card, Divider, Avatar, Space, Tooltip, Dropdown, Menu, Button } from 'antd';
import {
  HeartOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  CloseCircleOutlined,
  StarOutlined,
  SettingOutlined,
  FormOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../pages/Frontend/Home/CartContext';
import { useAuthcontext } from '../../context/Auth';

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isAuth, handleLogout } = useAuthcontext()
  const user = JSON.parse(localStorage.getItem('user'));
  const goToWishlist = () => {
    navigate('/dashboard/wishlist');
  };
  console.log(isAuth)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const menu = (
    <Menu
      style={{
        width: 240,
        padding: '12px 0',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0'
      }}
    >
      <Menu.Item key="account" icon={<SettingOutlined style={{ fontSize: 18, color: '#555' }} />}>
        <Link to="/dashboard/ManageAccount">Manage Account</Link>
      </Menu.Item>
      <Link to={"/AdminDashboard"}>
      <Menu.Item key="reviews" icon={<FormOutlined style={{ fontSize: 18, color: '#555' }} />}>
        Admin Dashboard
      </Menu.Item>
      </Link>
      <Menu.Item key="orders" icon={<ShoppingCartOutlined style={{ fontSize: 18, color: '#555' }} />}>
        My Orders
      </Menu.Item>
      <Menu.Item key="cancellations" icon={<CloseCircleOutlined style={{ fontSize: 18, color: '#555' }} />}>
        My Cancellations
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined style={{ fontSize: 18, color: '#ff4d4f' }} />}
        onClick={handleLogout}
      >
        <span style={{ color: '#ff4d4f' }}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="w-full max-w-[1170px] -sm py-3 mx-auto">
      <div className="max-w-7xl  sm:px-6 ">
        <nav className="">
          <div className="max-w-7xl   sm:px-6 ">
            <div className="flex justify-between h-16 items-center">
              {/* Brand */}
              <div className="flex-shrink-0">
                <Link to="/" className="text-lg font-semibold">Exclusive</Link>
              </div>

              {/* Navigation links */}
              <div className="hidden sm:flex sm:items-center sm:justify-center sm:flex-1">
                <div className="flex space-x-8">
                  <Link to="/" className="text-gray-900 border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium">Home</Link>
                  <a href="about" className="text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 text-sm font-medium">About</a>
                  <Link to="/contactus" className="text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 text-sm font-medium">Contact</Link>
                  {!isAuth && (
                    <Link to="/auth/signup" className="text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 px-1 pt-1 text-sm font-medium">Sign Up</Link>
                  )}
                </div>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-4">
                {/* Search (hidden on small screens) */}
                <div className="relative hidden md:block">
                  <div className="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
                    <svg className="w-4 h-4 text-dark dark:text-gray-400" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="block w-full p-2 pe-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>


                {!isAuth
                  ?
                  <>
                    <Link to="/auth/login" >
                      <Button
                        type="primary"
                        size="large"
                        className="!bg-red-500 hover:bg-red-600 rounded-full sm:rounded-lg h-12"
                      >
                        Login in
                      </Button>
                    </Link>

                  </>
                  : <>
                    {/* Wishlist */}
                    <Tooltip title="Wishlist">
                      <HeartOutlined
                        style={{ color: 'red', fontSize: '28px', cursor: 'pointer' }}
                        onClick={goToWishlist}
                      />
                    </Tooltip>

                    {/* Cart */}
                    <Link to="/cart">
                      <Tooltip title="Cart">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <ShoppingCartOutlined style={{ color: 'green', fontSize: '28px', cursor: 'pointer' }} />
                          {cartCount > 0 && (
                            <span style={{
                              position: 'absolute',
                              top: '-8px',
                              right: '-8px',
                              backgroundColor: 'red',
                              color: 'white',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {cartCount}
                            </span>
                          )}
                        </div>
                      </Tooltip>
                    </Link>

                    {/* Avatar Dropdown */}
                    {/* {user && ( */}
                    <Dropdown
                      overlay={menu}
                      placement="bottomRight"
                      trigger={['click']}
                      overlayStyle={{ zIndex: 1000 }}
                    >
                      <Space style={{ cursor: 'pointer' }}>
                        <Avatar
                          size={36}
                          style={{
                            backgroundColor: '#f5f5f5',
                            color: '#555',
                            fontSize: '28px',
                            fontWeight: 500,
                            cursor: 'pointer',
                            border: '1px solid #e0e0e0',
                          }}
                        >
                          <UserOutlined style={{ fontSize: 25, color: '#555' }} />
                        </Avatar>
                      </Space>
                    </Dropdown>
                  </>
                }
                {/* )} */}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>

  );
};

export default Navbar;

import React, { useState, useEffect, useMemo } from 'react';
import { Route, Routes, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layout, Menu, Avatar, Badge, Dropdown, Space, Typography, 
  Drawer, Button, Card, Divider, ConfigProvider, FloatButton, theme,
  Breadcrumb, Grid, Progress, Tag, Statistic, Segmented, Switch, List, message
} from 'antd';
import { useOutletContext } from 'react-router-dom';
import {
  UserOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  DashboardFilled,
  SettingFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  LogoutOutlined,
  ProfileOutlined,
  MenuOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  MessageOutlined,
  AppstoreFilled,
  FileTextFilled,
  TeamOutlined,
  PieChartFilled,
  WalletFilled,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  ShoppingOutlined,
  CreditCardOutlined,
  FileSyncOutlined,
  DatabaseOutlined,
  CloudOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  ApiOutlined,
  StarFilled,
  HistoryOutlined,
  GiftOutlined,
  TrophyOutlined,
  SafetyCertificateFilled,
  CheckCircleFilled
} from '@ant-design/icons';
import { useAuthcontext } from '../../context/Auth';
import ManageAccount from './ManageAccont/ManageAccount';
import ViewMyOrders from './viewOrders/ViewOrder';
import WishList from './WishList';
import ProductDetails from './ProductDetail/ProductDetail';
import './Dashboard.css';
import supabase from '../../config/supabase';

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const DashboardLayout = () => {
  const { user: authUser, logout } = useAuthcontext();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isLargeScreen = screens.xxl;

  // Enhanced user object with mock data for UI
  const user = useMemo(() => ({
    ...authUser,
    firstName: authUser?.firstName || 'John',
    lastName: authUser?.lastName || 'Doe',
    email: authUser?.email || 'john.doe@example.com',
    role: 'Premium Member',
    avatarColor: '#7265e6',
    notifications: 5,
    messages: 2,
    stats: {
      loyaltyLevel: 'Gold'
    },
    recentOrders: [
      { id: '#ORD-78945', date: 'Today', status: 'Shipped', amount: '$245' },
      { id: '#ORD-78944', date: 'Yesterday', status: 'Delivered', amount: '$189' },
      { id: '#ORD-78943', date: '2 days ago', status: 'Processing', amount: '$79' }
    ],
    rewards: [
      { title: 'Birthday Reward', points: 200, date: 'Available until Dec 31' },
      { title: 'Referral Bonus', points: 100, date: 'Expires in 7 days' }
    ]
  }), [authUser]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id);
        
        if (ordersError) throw ordersError;
        
        // Fetch wishlist from localStorage
        const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
        const userWishlist = wishlistData.filter(item => item.userId === user.id);
        
        setOrders(ordersData || []);
        setWishlist(userWishlist || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const addToWishlist = (product) => {
    const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
    const newWishlist = [...wishlistData, { ...product, userId: user.id }];
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setWishlist(newWishlist.filter(item => item.userId === user.id));
    message.success('Added to wishlist');
  };

  const removeFromWishlist = (productId) => {
    const wishlistData = JSON.parse(localStorage.getItem('wishlist')) || [];
    const newWishlist = wishlistData.filter(item => !(item.id === productId && item.userId === user.id));
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    setWishlist(newWishlist.filter(item => item.userId === user.id));
    message.success('Removed from wishlist');
  };

  useEffect(() => {
    const pathKeys = {
      '/dashboard': '1',
      '/dashboard/account': '2',
      '/dashboard/wishlist': '3',
      '/dashboard/products': '4',
      '/dashboard/orders': '5',
      '/dashboard/rewards': '6',
      '/dashboard/settings': '7'
    };
    setSelectedKeys([pathKeys[location.pathname] || '1']);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/dashboard/account')
    },
    {
      key: 'orders',
      icon: <ShoppingOutlined />,
      label: 'My Orders',
      onClick: () => navigate('/dashboard/orders')
    },
    {
      key: 'wishlist',
      icon: <HeartFilled />,
      label: 'Wishlist',
      onClick: () => navigate('/dashboard/wishlist')
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const notificationItems = [
    {
      key: '1',
      label: (
        <div className="notification-item">
          <div className="flex items-start">
            <Avatar size={32} icon={<ShoppingCartOutlined />} className="mt-1" />
            <div className="ml-3">
              <Text strong>Order Shipped</Text>
              <Text type="secondary" className="block">Your order #ORD-78945 has been shipped</Text>
              <Text type="secondary" className="block text-xs">2 hours ago</Text>
            </div>
          </div>
        </div>
      )
    },
    {
      key: '2',
      label: (
        <div className="notification-item">
          <div className="flex items-start">
            <Avatar size={32} icon={<GiftOutlined />} className="mt-1" />
            <div className="ml-3">
              <Text strong>Special Offer</Text>
              <Text type="secondary" className="block">20% off on your next purchase</Text>
              <Text type="secondary" className="block text-xs">Yesterday</Text>
            </div>
          </div>
        </div>
      )
    },
    {
      key: '3',
      label: (
        <div className="notification-item">
          <div className="flex items-start">
            <Avatar size={32} icon={<StarFilled />} className="mt-1" />
            <div className="ml-3">
              <Text strong>Reward Points</Text>
              <Text type="secondary" className="block">You earned 50 points for your purchase</Text>
              <Text type="secondary" className="block text-xs">2 days ago</Text>
            </div>
          </div>
        </div>
      )
    }
  ];

  const menuItems = [
    {
      key: '1',
      icon: <DashboardFilled />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to="/dashboard/account">My Account</Link>,
    },
    {
      key: '3',
      icon: <HeartFilled />,
      label: <Link to="/dashboard/wishlist">Wishlist</Link>,
    },
    {
      key: '4',
      icon: <AppstoreFilled />,
      label: <Link to="/product">Browse Products</Link>,
    },
    {
      key: '5',
      icon: <ShoppingOutlined />,
      label: <Link to="/dashboard/orders">My Orders</Link>,
    },
    {
      key: '6',
      icon: <TrophyOutlined />,
      label: <Link to="/dashboard/rewards">Rewards</Link>,
    },
    {
      key: '7',
      icon: <SettingFilled />,
      label: <Link to="/dashboard/settings">Settings</Link>,
    },
  ];

  const getPageTitle = () => {
    const pathTitles = {
      '/dashboard/account': 'Account Settings',
      '/dashboard/wishlist': 'My Wishlist',
      '/dashboard/products': 'Browse Products',
      '/dashboard/orders': 'Order History',
      '/dashboard/rewards': 'My Rewards',
      '/dashboard/settings': 'Account Settings'
    };
    return pathTitles[location.pathname] || 'My Dashboard';
  };

  const getBreadcrumbItems = () => {
    const items = [
      { title: <Link to="/dashboard">Home</Link> },
    ];

    if (location.pathname !== '/dashboard') {
      items.push({
        title: getPageTitle()
      });
    }

    return items;
  };

  const renderSidebar = () => (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={280}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      className={`fixed !h-screen z-50 transition-all duration-300 shadow-xl ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      style={{ 
        display: isMobile ? 'none' : 'block',
        height: '100vh',
        borderRight: `1px solid ${darkMode ? '#2d3748' : '#e2e8f0'}`
      }}
    >
      <div className={`flex items-center justify-center p-4 ${collapsed ? 'px-2' : 'px-6'}`}>
        {collapsed ? (
          <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-600'} font-bold text-xl`}>
            U
          </div>
        ) : (
          <div className={`w-full py-3 px-4 text-center rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-600'} font-bold text-lg`}>
            {user.firstName}'s Dashboard
          </div>
        )}
      </div>
      
      <Menu
        theme={darkMode ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems}
        className={`${darkMode ? 'bg-gray-900' : 'bg-white'} border-0 px-2`}
        inlineCollapsed={collapsed}
      />
      
      <div className={`absolute bottom-0 left-0 right-0 p-4 ${collapsed ? 'px-2' : 'px-4'}`}>
        <Card 
          bordered={false}
          className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} backdrop-blur-lg border-0 shadow-none overflow-hidden ${collapsed ? 'p-2' : 'p-4'}`}
        >
          <div className={`flex ${collapsed ? 'justify-center' : 'items-center gap-3'}`}>
            <Avatar 
              size={collapsed ? 40 : 48}
              icon={<UserOutlined />}
              style={{ backgroundColor: user.avatarColor }}
              className="flex-shrink-0"
            />
            {!collapsed && (
              <div className="overflow-hidden">
                <Text strong className={`block ${darkMode ? 'text-white' : 'text-gray-800'} truncate`}>
                  {user.firstName} {user.lastName}
                </Text>
                <Text className={`block ${darkMode ? 'text-gray-400' : 'text-gray-500'} text-xs truncate`}>
                  {user.role}
                </Text>
              </div>
            )}
          </div>
        </Card>
      </div>
    </Sider>
  );

  const renderMobileDrawer = () => (
    <Drawer
      title={
        <div className="flex items-center">
          <Avatar 
            size={32} 
            icon={<UserOutlined />} 
            style={{ backgroundColor: user.avatarColor }}
            className="mr-3"
          />
          <Text strong>Menu</Text>
        </div>
      }
      placement="left"
      closable={true}
      onClose={() => setMobileDrawerVisible(false)}
      open={mobileDrawerVisible}
      styles={{ body: { padding: 0 } }}
      width={280}
      className={darkMode ? 'dark-drawer' : ''}
    >
      <div className={`flex flex-col h-full ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="p-6 text-center">
          <div className={`w-full py-3 px-4 text-center rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-indigo-100 text-indigo-600'} font-bold text-lg`}>
            {user.firstName}'s Dashboard
          </div>
        </div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
          onClick={() => setMobileDrawerVisible(false)}
        />
        <div className="p-4">
          <Button 
            block 
            type="text"
            icon={<LogoutOutlined />}
            className={darkMode ? 'text-white hover:bg-gray-800' : 'text-gray-800 hover:bg-gray-100'}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </Drawer>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#6366f1',
          borderRadius: 8,
          colorTextBase: darkMode ? '#e2e8f0' : '#1e293b',
          colorBgLayout: darkMode ? '#1a202c' : '#f8fafc',
        },
        components: {
          Layout: {
            headerBg: darkMode ? '#1a202c' : '#ffffff',
            headerPadding: '0 24px',
            headerHeight: 64,
            bodyBg: darkMode ? '#1a202c' : '#f8fafc',
          },
          Menu: {
            itemSelectedBg: darkMode ? '#2d3748' : '#eef2ff',
            itemSelectedColor: darkMode ? '#ffffff' : '#6366f1',
            itemHoverBg: darkMode ? '#2d3748' : '#f1f5f9',
            itemHoverColor: darkMode ? '#ffffff' : '#6366f1',
          },
          Card: {
            borderRadiusLG: 12,
            boxShadowTertiary: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
            colorBgContainer: darkMode ? '#2d3748' : '#ffffff',
          },
          Button: {
            borderRadius: 8,
          },
          Input: {
            borderRadius: 8,
          },
          Table: {
            headerBg: darkMode ? '#2d3748' : '#f8fafc',
            headerColor: darkMode ? '#e2e8f0' : '#64748b',
          },
        },
      }}
    >
      <Layout className="min-h-screen" style={{ background: darkMode ? '#1a202c' : '#f8fafc' }}>
        {renderSidebar()}
        {isMobile && renderMobileDrawer()}
        
        <Layout className={`transition-all duration-300 ${isMobile ? 'ml-0' : collapsed ? 'ml-20' : isLargeScreen ? 'ml-0' : ''}`}>
          <Header className="sticky top-0 z-40 flex items-center justify-between shadow-sm px-4 md:px-6" 
            style={{ 
              background: darkMode ? '#1a202c' : '#ffffff',
              borderBottom: `1px solid ${darkMode ? '#2d3748' : '#e2e8f0'}`,
              marginLeft: isLargeScreen ? '280px' : '0'
            }}>
            <div className="flex items-center">
              {isMobile ? (
                <Button
                  type="text"
                  icon={<MenuOutlined className="text-xl" />}
                  onClick={() => setMobileDrawerVisible(true)}
                  className={`mr-3 md:mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                />
              ) : (
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  className={`mr-3 md:mr-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                />
              )}
              <Breadcrumb items={getBreadcrumbItems()} className="hidden sm:block" />
            </div>
            <Space size="middle" align="center">
              <Switch
                checkedChildren="🌙"
                unCheckedChildren="☀️"
                checked={darkMode}
                onChange={setDarkMode}
                className="hidden sm:inline-flex"
              />
              
              <Button 
                type="text" 
                icon={<SearchOutlined className="text-lg" />}
                className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'} hidden sm:inline-flex`}
              />
              
              <Dropdown 
                menu={{ items: notificationItems }} 
                placement="bottomRight"
                trigger={['click']}
                overlayClassName="notification-dropdown"
              >
                <Badge count={user.notifications} size="small" color={token.colorPrimary}>
                  <Button 
                    type="text" 
                    icon={<BellOutlined className="text-lg" />}
                    className={darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-800'}
                  />
                </Badge>
              </Dropdown>
              
              <Dropdown 
                menu={{ items: userMenuItems }} 
                placement="bottomRight"
                trigger={['click']}
              >
                <div className="flex items-center cursor-pointer">
                  <Avatar
                    size={36}
                    style={{ backgroundColor: user.avatarColor }}
                    icon={<UserOutlined />}
                    className={`border-2 ${darkMode ? 'border-gray-700' : 'border-gray-100'} shadow`}
                  />
                  {(!collapsed && !isMobile) && (
                    <div className="ml-3 hidden md:block">
                      <Text strong className={`block leading-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>{user.firstName}</Text>
                      <Text type="secondary" className="block text-xs leading-tight">{user.role}</Text>
                    </div>
                  )}
                </div>
              </Dropdown>
            </Space>
          </Header>
          <Content className="md:m-6 p-4 md:p-6 rounded-xl min-h-[calc(100vh-112px)]"
            style={{ 
              background: darkMode ? '#2d3748' : '#ffffff',
              marginLeft: isLargeScreen ? '280px' : '0'
            }}>
            <Title level={3} className={`mt-0 mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {getPageTitle()}
            </Title>
            <Outlet context={{ user, darkMode, orders, wishlist, addToWishlist, removeFromWishlist }} />
          </Content>
          <Footer className="text-center py-4 px-4 md:px-6"
            style={{ 
              background: darkMode ? '#1a202c' : '#ffffff',
              borderTop: `1px solid ${darkMode ? '#2d3748' : '#e2e8f0'}`,
              marginLeft: isLargeScreen ? '280px' : '0'
            }}>
            <div className="flex flex-col items-center">
              <Text className={`text-sm md:text-base ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                © {new Date().getFullYear()} MyShop Dashboard. All rights reserved.
              </Text>
              <div className="flex items-center justify-center mt-2 space-x-2 md:space-x-4">
                <Button type="text" size="small" className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}>
                  Privacy
                </Button>
                <Divider type="vertical" className={darkMode ? 'bg-gray-700 h-4' : 'bg-gray-200 h-4'} />
                <Button type="text" size="small" className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}>
                  Terms
                </Button>
                <Divider type="vertical" className={darkMode ? 'bg-gray-700 h-4' : 'bg-gray-200 h-4'} />
                <Button type="text" size="small" className={darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-800'}>
                  Support
                </Button>
              </div>
            </div>
          </Footer>
        </Layout>
        
        <FloatButton.Group
          shape="circle"
          style={{ right: 16, bottom: 16 }}
          className="sm:right-6 sm:bottom-6"
          icon={<QuestionCircleOutlined />}
        >
          <FloatButton 
            icon={<MessageOutlined />} 
            tooltip={<span className="font-medium">Support Chat</span>}
          />
          <FloatButton.BackTop visibilityHeight={100} />
        </FloatButton.Group>
      </Layout>
    </ConfigProvider>
  );
};

const DashboardHome = () => {
  const { user, darkMode, orders = [], wishlist = [] } = useOutletContext();
  
  // Calculate total spent from orders
  const totalSpent = orders.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
  
  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: <ShoppingCartOutlined />,
      color: '#6366f1',
      progress: Math.min(100, orders.length * 10)
    },
    {
      title: 'Wishlist Items',
      value: wishlist.length,
      icon: <HeartFilled />,
      color: '#ec4899',
      progress: Math.min(100, wishlist.length * 10)
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent.toFixed(2)}`,
      icon: <WalletFilled />,
      color: '#10b981',
      progress: Math.min(100, (totalSpent / 1000) * 100)
    },
    {
      title: 'Reward Points',
      value: Math.floor(totalSpent),
      icon: <StarFilled />,
      color: '#f59e0b',
      progress: Math.min(100, (totalSpent / 1000) * 100)
    }
  ];

  const quickActions = [
    {
      title: 'Browse Products',
      icon: <AppstoreFilled />,
      color: '#8b5cf6',
      link: '/dashboard/products'
    },
    {
      title: 'Track Orders',
      icon: <HistoryOutlined />,
      color: '#3b82f6',
      link: '/dashboard/orders'
    },
    {
      title: 'My Wishlist',
      icon: <HeartFilled />,
      color: '#ec4899',
      link: '/dashboard/wishlist'
    },
    {
      title: 'Rewards',
      icon: <GiftOutlined />,
      color: '#f59e0b',
      link: '/dashboard/rewards'
    }
  ];

  return (
    <div className="space-y-6">
      <Card bordered={false} className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} border-0 overflow-hidden`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6">
          <div className="mb-4 md:mb-0">
            <Title level={3} className={`m-0 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Welcome back, {user.firstName}!
            </Title>
            <Text type="secondary" className="text-base md:text-lg mt-2">
              {user.stats.loyaltyLevel} Member since 2022
            </Text>
          </div>
          <Space>
            <Tag icon={<SafetyCertificateFilled />} color={darkMode ? 'blue' : 'geekblue'}>
              {user.stats.loyaltyLevel} Status
            </Tag>
            <Button type="primary" size="large" className="shadow-md" onClick={() => window.location.href='/product'}>
              Shop Now
            </Button>
          </Space>
        </div>
      </Card>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <Card key={index} bordered={false} className="hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="block text-sm">{stat.title}</Text>
                <Title level={3} className="m-0 mt-1 mb-3">{stat.value}</Title>
                <Progress 
                  percent={stat.progress} 
                  showInfo={false} 
                  strokeColor={stat.color}
                  strokeWidth={8}
                />
              </div>
              <div className={`p-3 rounded-lg`} style={{ backgroundColor: `${stat.color}20` }}>
                {React.cloneElement(stat.icon, { 
                  className: "text-xl", 
                  style: { color: stat.color } 
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Recent Orders" bordered={false} className="lg:col-span-2">
          <List
            itemLayout="horizontal"
            dataSource={user.recentOrders}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Tag 
                    icon={item.status === 'Delivered' ? <CheckCircleFilled /> : null} 
                    color={
                      item.status === 'Delivered' ? 'success' : 
                      item.status === 'Shipped' ? 'processing' : 'default'
                    }
                  >
                    {item.status}
                  </Tag>
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar icon={<ShoppingCartOutlined />} />}
                  title={<a href="/dashboard/orders">{item.id}</a>}
                  description={`Placed ${item.date} • ${item.amount}`}
                />
              </List.Item>
            )}
          />
          <div className="text-center mt-4">
            <Button type="link" onClick={() => window.location.href='/dashboard/orders'}>
              View All Orders
            </Button>
          </div>
        </Card>

        <Card title="Quick Actions" bordered={false}>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button 
                key={index} 
                type="text"
                className={`flex flex-col items-center justify-center h-32 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => window.location.href=action.link}
              >
                <div className={`p-3 rounded-full mb-2`} style={{ backgroundColor: `${action.color}20` }}>
                  {React.cloneElement(action.icon, { 
                    className: "text-xl", 
                    style: { color: action.color } 
                  })}
                </div>
                <Text strong>{action.title}</Text>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Available Rewards" bordered={false}>
        <List
          itemLayout="horizontal"
          dataSource={user.rewards}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button type="primary" size="small">Claim</Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<GiftOutlined />} />}
                title={item.title}
                description={`${item.points} points • ${item.date}`}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="account" element={<ManageAccount />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="orders" element={<ViewMyOrders />} />
        <Route path="rewards" element={<div className="p-4 md:p-6">Rewards Dashboard</div>} />
        <Route path="settings" element={<div className="p-4 md:p-6">Account Settings</div>} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
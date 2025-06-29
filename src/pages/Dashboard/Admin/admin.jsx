import React, { useState, useEffect } from "react";
import { 
  Layout, Menu, Avatar, Badge, Spin, Table, Button, 
  Select, Card, Tag, Divider, Dropdown, Space, Typography 
} from "antd";

import Akif from "../../../assets/images/Akif.jpeg"
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  BarChartOutlined,
  ContactsOutlined,
  ProductOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  SearchOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import AdminContactsPage from "./AdminDashboard/AdminContactsPage";
import AdminOrdersDashboard from "./AdminDashboard/AdminDashboard";
import AdminUsersPage from "./AdminDashboard/AdminUsersPage";
import AdminProductsPage from "./AdminDashboard/AdminProductsPage";
import AdminRoute from "../../../components/ProtectedRoutes/AdminRoute";
import supabase from "../../../config/supabase";
import { motion } from "framer-motion";
import SellerRequests from "./SellerRequests";

const { Header, Sider, Content } = Layout;
const { Option } = Select;
const { Title, Text } = Typography;

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444']; // Modern color palette

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "users", icon: <UserOutlined />, label: "Users" },
  { key: "products", icon: <ProductOutlined />, label: "Products" },
  { key: "orders", icon: <ShoppingCartOutlined />, label: "Orders" },
  { key: "contacts", icon: <ContactsOutlined />, label: "Messages" },
  { key: "SellerRequests", icon: <ContactsOutlined />, label: "SellerRequests" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
];

const chartData = [
  { name: "Jan", sales: 4000, users: 2400, revenue: 2400 },
  { name: "Feb", sales: 3000, users: 1398, revenue: 1398 },
  { name: "Mar", sales: 5000, users: 3800, revenue: 3800 },
  { name: "Apr", sales: 4000, users: 2900, revenue: 2900 },
  { name: "May", sales: 6000, users: 4300, revenue: 4300 },
  { name: "Jun", sales: 7000, users: 5200, revenue: 5200 },
];

const pieData = [
  { name: "Completed", value: 75 },
  { name: "Processing", value: 15 },
  { name: "Cancelled", value: 10 },
];

const userData = [
  { 
    key: "1", 
    name: "Alex Johnson", 
    email: "alex.johnson@example.com", 
    role: "Admin", 
    status: "active",
    lastLogin: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  { 
    key: "2", 
    name: "Sarah Williams", 
    email: "sarah.w@example.com", 
    role: "User", 
    status: "active",
    lastLogin: "1 day ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  { 
    key: "3", 
    name: "Michael Chen", 
    email: "michael.c@example.com", 
    role: "Editor", 
    status: "inactive",
    lastLogin: "3 days ago",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  },
  { 
    key: "4", 
    name: "Emma Davis", 
    email: "emma.d@example.com", 
    role: "User", 
    status: "active",
    lastLogin: "5 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  },
  { 
    key: "5", 
    name: "David Wilson", 
    email: "david.w@example.com", 
    role: "User", 
    status: "active",
    lastLogin: "12 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg"
  },
];

const userColumns = [
  { 
    title: "User", 
    dataIndex: "name", 
    key: "name",
    render: (text, record) => (
      <div className="flex items-center">
        <Avatar src={record.avatar} size={40} className="mr-3" />
        <div>
          <p className="font-medium m-0 text-gray-800 dark:text-white">{text}</p>
          <p className="text-gray-500 text-xs m-0">{record.email}</p>
        </div>
      </div>
    )
  },
  { 
    title: "Role", 
    dataIndex: "role", 
    key: "role",
    render: (role) => (
      <Tag 
        color={
          role === "Admin" ? "purple" :
          role === "Editor" ? "blue" : "default"
        }
        className="rounded-full px-3 py-1 text-xs font-medium"
      >
        {role}
      </Tag>
    )
  },
  { 
    title: "Status", 
    dataIndex: "status", 
    key: "status",
    render: (status) => (
      <Tag 
        color={status === "active" ? "green" : "red"}
        className="rounded-full px-3 py-1 text-xs font-medium"
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Tag>
    )
  },
  { 
    title: "Last Active", 
    dataIndex: "lastLogin", 
    key: "lastLogin",
    responsive: ['lg'],
  },
];

const StatCard = ({ title, value, icon, color, loading, trend, duration }) => {
  const trendColor = trend > 0 ? "text-green-500" : "text-red-500";
  const TrendIcon = trend > 0 ? ArrowUpOutlined : ArrowDownOutlined;
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
          {loading ? (
            <Spin size="small" className="mt-2" />
          ) : (
            <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">{value}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} text-white shadow-md`}>
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div className="flex items-center mt-3">
          <Tag 
            color={trend > 0 ? "green" : "red"} 
            className="rounded-full flex items-center text-xs"
          >
            <TrendIcon className="mr-1" style={{ fontSize: '12px' }} />
            {Math.abs(trend)}%
          </Tag>
          <span className="text-gray-500 text-xs ml-2">vs last {duration}</span>
        </div>
      )}
    </motion.div>
  );
};

export default function AdminDashboard() {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [stats, setStats] = useState({
    revenue: 0,
    orders: 0,
    users: 0,
    contacts: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        
        const { data: revenueData } = await supabase
          .from('orders')
          .select('total_amount')
          .eq('status', 'completed');
        
        const revenue = revenueData?.reduce(
          (sum, order) => sum + parseFloat(order.total_amount), 
          0
        ) || 0;
        
        const { count: orderCount } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'completed');
        
        const { count: userCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true });
        
        const { count: contactCount } = await supabase
          .from('contacts')
          .select('*', { count: 'exact', head: true });
        
        setStats({
          revenue: revenue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
          orders: orderCount || 0,
          users: userCount || 0,
          contacts: contactCount || 0,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    if (selectedKey === "dashboard") {
      fetchStats();
    }
  }, [selectedKey]);

  const renderContent = () => {
    switch (selectedKey) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="Total Revenue"
                value={stats.revenue}
                icon={<DollarOutlined className="text-lg" />}
                color="bg-gradient-to-r from-indigo-500 to-indigo-600"
                loading={loadingStats}
                trend={12.5}
                duration="month"
              />
              <StatCard
                title="Completed Orders"
                value={stats.orders}
                icon={<ShoppingCartOutlined className="text-lg" />}
                color="bg-gradient-to-r from-emerald-500 to-emerald-600"
                loading={loadingStats}
                trend={8.3}
                duration="month"
              />
              <StatCard
                title="Active Users"
                value={stats.users}
                icon={<UserOutlined className="text-lg" />}
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                loading={loadingStats}
                trend={5.7}
                duration="month"
              />
              <StatCard
                title="New Messages"
                value={stats.contacts}
                icon={<ContactsOutlined className="text-lg" />}
                color="bg-gradient-to-r from-amber-500 to-amber-600"
                loading={loadingStats}
                trend={-2.4}
                duration="month"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <Title level={5} className="m-0 text-gray-800 dark:text-white">Revenue Overview</Title>
                  <Select 
                    defaultValue="2023" 
                    className="w-28" 
                    suffixIcon={<SearchOutlined className="text-gray-400" />}
                    bordered={false}
                  >
                    <Option value="2023">2023</Option>
                    <Option value="2022">2022</Option>
                  </Select>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#6366F1" 
                      fillOpacity={1} 
                      fill="url(#colorRevenue)" 
                    />
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                  </AreaChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <Title level={5} className="m-0 text-gray-800 dark:text-white">Order Status</Title>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <Title level={5} className="m-0 text-gray-800 dark:text-white">User Activity</Title>
                  <Select 
                    defaultValue="monthly" 
                    className="w-28"
                    bordered={false}
                  >
                    <Option value="monthly">Monthly</Option>
                    <Option value="weekly">Weekly</Option>
                  </Select>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="users" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <Title level={5} className="m-0 text-gray-800 dark:text-white">Recent Users</Title>
                <Button type="primary" ghost className="flex items-center">
                  View All
                </Button>
              </div>
              <Table 
                dataSource={userData} 
                columns={userColumns} 
                pagination={{ pageSize: 5 }}
                scroll={{ x: true }}
                className="rounded-lg"
              />
            </motion.div>
          </div>
        );
      case "users":
        return <AdminUsersPage />;
      case "products":
        return <AdminProductsPage />;
      case "orders":
        return <AdminOrdersDashboard />;
      case "contacts":
        return <AdminContactsPage />;
      case "SellerRequests":
        return <SellerRequests />;
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <Spin size="large" />
          </div>
        );
    }
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Profile Settings',
          icon: <UserOutlined />,
        },
        {
          key: '2',
          label: 'Logout',
          icon: <LogoutOutlined />,
          danger: true,
        },
      ]}
    />
  );

  return (
    <AdminRoute>
      <Layout className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Sider
          breakpoint="lg"
          collapsedWidth={screenWidth < 576 ? "0" : "80"}
          className="bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700"
          width={280}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          trigger={null}
          theme="light"
        >
          <motion.div 
            className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {collapsed ? (
              <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">⚡</div>
            ) : (
              <div className="flex items-center">
                <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mr-2">⚡</div>
                <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                  Admin Dashboard
                </span>
              </div>
            )}
          </motion.div>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={({ key }) => setSelectedKey(key)}
            items={menuItems}
            className="border-none pt-4"
            inlineCollapsed={collapsed}
            theme="light"
          />
        </Sider>

        <Layout>
          <Header 
            className="  dark:bg-gray-100 px-4 sm:px-6 shadow-sm flex justify-between items-center sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 !text-white"
          
            style={{ height: 64 }}
          >
            <div className="flex items-center ">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="mr-2  dark:text-gray-300 hover:text-indigo-500 !text-amber-100"
              />
              <motion.h1 
                className="text-lg sm:text-xl font-semibold  !text-white !dark:text-white whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {menuItems.find((item) => item.key === selectedKey)?.label || "Dashboard"}
              </motion.h1>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <Badge count={5} className="hidden sm:inline-block" offset={[-5, 5]}>
                <Button 
                  type="text" 
                  icon={<BellOutlined className="text-lg  !text-white dark:text-gray-300 hover:text-indigo-500" />} 
                  className="flex items-center justify-center"
                />
              </Badge>
              <Dropdown overlay={userMenu} trigger={['click']}>
                <Space className="cursor-pointer">
                  <Avatar 
                    size={screenWidth < 576 ? "default" : "large"} 
                    src={Akif}
                    className="border-2 border-indigo-500"
                  />
                  {screenWidth > 768 && (
                    <Text className="text-gray-600 dark:text-gray-300">Admin</Text>
                  )}
                  <DownOutlined className="text-gray-400" />
                </Space>
              </Dropdown>
            </div>
          </Header>

          <Content className="p-4 sm:p-6">
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </AdminRoute>
  );
}
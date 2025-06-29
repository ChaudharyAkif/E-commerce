// ✅ AdminProductsPage.jsx (complete + image preview + responsive layout)

import React, { useEffect, useState } from 'react';
import {
  Table,
  Spin,
  Button,
  Popconfirm,
  message,
  App as AntdApp,
  Typography,
} from 'antd';
import supabase from '../../../../config/supabase';

const { Title } = Typography;

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || user.email !== 'chaudharyakifmnbrands@gmail.com') {
      message.error('Access denied.');
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      message.error('Failed to fetch products.');
      console.error(fetchError);
    } else {
      setProducts(data);
    }

    setLoading(false);
  };

  const deleteProduct = async (id) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      message.error('Failed to delete product.');
    } else {
      message.success('Product deleted successfully.');
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image_url',
      key: 'image_url',
      render: (url) => (
        <img
          src={url}
          alt="Product"
          style={{
            width: 60,
            height: 60,
            objectFit: 'cover',
            borderRadius: 8,
            border: '1px solid #e0e0e0',
          }}
        />
      ),
    },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (p) => `Rs. ${p}`,
    },
    { title: 'Discount', dataIndex: 'discount', key: 'discount' },
    { title: 'Sizes', dataIndex: 'sizes', key: 'sizes' },
    { title: 'Colors', dataIndex: 'colors', key: 'colors' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating' },
    { title: 'Reviews', dataIndex: 'reviewCount', key: 'reviewCount' },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete this product?"
          onConfirm={() => deleteProduct(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button danger size="small">
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <AntdApp>
      <div className="p-4 md:p-6">
        <Title level={3} className="text-center text-gray-800 mb-6">
          Admin Products Dashboard
        </Title>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Spin size="large" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            No products available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={products}
              rowKey="id"
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: 'max-content' }}
            />
          </div>
        )}
      </div>
    </AntdApp>
  );
};

export default AdminProductsPage;

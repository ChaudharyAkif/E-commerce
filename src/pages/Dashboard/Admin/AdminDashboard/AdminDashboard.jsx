import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, message, Spin } from 'antd';
import supabase from '../../../../config/supabase';

const AdminOrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  // Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      message.error('Failed to fetch orders');
      console.error(error);
    } else {
      setOrders(data);
    }
    setLoading(false);
  };

  // Mark order as completed
  const handleComplete = async (orderId) => {
    setUpdatingOrderId(orderId);

    const { error } = await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', orderId);

    if (error) {
      message.error('Failed to mark order as completed');
    } else {
      message.success('Order marked as completed');
      fetchOrders(); // Refresh list
    }

    setUpdatingOrderId(null);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Define columns for table
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id) => <span className="text-sm">{id.slice(0, 8)}...</span>,
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Total',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (amount) => `$${parseFloat(amount).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.status !== 'completed' ? (
          <Button
            type="primary"
            onClick={() => handleComplete(record.id)}
            loading={updatingOrderId === record.id}
          >
            Mark as Completed
          </Button>
        ) : (
          <span className="text-green-600 font-medium">Completed</span>
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Orders Dashboard</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          className="bg-white rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default AdminOrdersDashboard;

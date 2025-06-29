import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Tag, Empty } from 'antd';
import supabase from '../../../config/supabase';
import InvoiceButton from '../DownloadReceipts/InvoiceButton';

const ViewMyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('No user logged in:', userError);
        message.error('You must be logged in to view orders.');
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching orders:', error.message);
        message.error('Failed to fetch orders.');
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  const formatAddress = (address) => {
    if (!address || typeof address !== 'object') return 'N/A';
    return `${address?.street || ''}, ${address?.city || ''}, ${address?.country || ''}`;
  };

  const renderCartItems = (items) => {
    if (!Array.isArray(items)) return 'N/A';
    return items.map((item, index) => (
      <div key={index} className="text-sm text-gray-700">
        • {item.name} (x{item.quantity})
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <div className="flex justify-center">
          <Empty description="No orders found" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map((order) => (
            <Card
              key={order.id}
              className="shadow-md rounded-xl border border-gray-100"
              title={
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
                  <Tag color={order.status === 'pending' ? 'orange' : 'green'}>
                    {order.status?.toUpperCase()}
                  </Tag>
                </div>
              }
            >
              <div className="space-y-2">
                <p>
                  <strong>Date:</strong>{' '}
                  {new Date(order.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p>
                  <strong>Total:</strong> ${parseFloat(order.total_amount).toFixed(2)}
                </p>
                <p>
                  <strong>Shipping Address:</strong> {formatAddress(order.shipping_address)}
                </p>
                 <div>
                  <strong>Items:</strong>
                  <div className="ml-2">{renderCartItems(order.cart_items || order.items)}</div>
                </div>
                <InvoiceButton key="invoice" order={order}  />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMyOrders;

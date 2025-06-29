// src/pages/Dashboard/PaymentHistory.jsx
import React, { useEffect, useState } from 'react';
import { Table, Tag, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import supabase from '../../../config/supabase';
import { useAuthcontext } from '../../../context/Auth';

const PaymentHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthcontext();

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('bank_payments')
      .select('*')
      .eq('user_id', user?.uid)
      .order('created_at', { ascending: false });

    if (!error) setData(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) fetchPayments();
  }, [user]);

  const columns = [
    { 
      title: 'Account Holder', 
      dataIndex: 'account_holder',
      render: (text, record) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.bank_name}</div>
        </div>
      )
    },
    { 
      title: 'Account Details', 
      render: (_, record) => (
        <div>
          <div>****{record.account_number.slice(-4)}</div>
          <div className="text-xs text-gray-500">Routing: {record.routing_number}</div>
        </div>
      )
    },
    { 
      title: 'Amount', 
      dataIndex: 'amount',
      render: (amount) => `$${parseFloat(amount).toFixed(2)}`
    },
    { 
      title: 'Date', 
      dataIndex: 'created_at',
      render: (date) => new Date(date).toLocaleString()
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Button 
          icon={<DownloadOutlined />} 
          size="small"
          onClick={() => message.info('Download receipt for payment ' + record.id)}
        >
          Receipt
        </Button>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Payment History</h2>
        <Button type="primary" onClick={() => window.print()}>
          Print Statements
        </Button>
      </div>
      <Table 
        dataSource={data} 
        columns={columns} 
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default PaymentHistory;
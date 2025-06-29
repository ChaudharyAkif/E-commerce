import React, { useEffect, useState } from 'react';
import {
  Table,
  Spin,
  message,
  App as AntdApp,
  Typography,
  Tooltip,
  Empty,
} from 'antd';
import supabase from '../../../../config/supabase';

const { Title } = Typography;

const AdminContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
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
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      message.error('Failed to fetch contacts.');
      console.error(fetchError);
    } else {
      setContacts(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['sm'],
      ellipsis: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['sm'],
      ellipsis: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['md'],
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      render: (text) => (
        <Tooltip title={text}>
          <div className="truncate max-w-xs">{text}</div>
        </Tooltip>
      ),
    },
    {
      title: 'Received At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
      responsive: ['sm'],
    },
  ];

  return (
    <AntdApp>
      <div className="p-4 md:p-8 min-h-screen bg-white rounded-xl shadow-md">
        <Title level={3} className="text-center text-gray-800 mb-8">
          📩 Contact Messages
        </Title>

        {loading ? (
          <div className="flex justify-center items-center h-60">
            <Spin size="large" />
          </div>
        ) : contacts.length === 0 ? (
          <Empty
            description="No contact messages found"
            className="my-16"
          />
        ) : (
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={contacts}
              rowKey="id"
              bordered
              pagination={{ pageSize: 5 }}
              scroll={{ x: true }}
              className="rounded-lg shadow-sm"
            />
          </div>
        )}
      </div>
    </AntdApp>
  );
};

export default AdminContactsPage;

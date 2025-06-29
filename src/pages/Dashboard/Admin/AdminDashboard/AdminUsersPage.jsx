import React, { useEffect, useState } from 'react';
import { Table, Spin, message, Button, Popconfirm, Tag } from 'antd';
import supabase from '../../../../config/supabase';

const ADMIN_EMAIL = 'chaudharyakifmnbrands@gmail.com';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        message.error('You must be logged in.');
        return;
      }

      if (user.email !== ADMIN_EMAIL) {
        message.error('Access denied.');
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
      message.error('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) {
      message.error('Failed to delete user.');
    } else {
      message.success('User deleted.');
      fetchUsers();
    }
  };

  const toggleBlockStatus = async (id, isBlocked) => {
    const { error } = await supabase
      .from('users')
      .update({ is_blocked: !isBlocked })
      .eq('id', id);

    if (error) {
      message.error('Failed to update user status.');
    } else {
      message.success(`User ${!isBlocked ? 'blocked' : 'unblocked'}.`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'is_blocked',
      key: 'is_blocked',
      render: (isBlocked) => (
        <Tag color={isBlocked ? 'red' : 'green'}>
          {isBlocked ? 'Blocked' : 'Active'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Button
            type={record.is_blocked ? 'default' : 'primary'}
            onClick={() => toggleBlockStatus(record.id, record.is_blocked)}
          >
            {record.is_blocked ? 'Unblock' : 'Block'}
          </Button>

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Users Page</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}
    </div>
  );
};

export default AdminUsersPage;
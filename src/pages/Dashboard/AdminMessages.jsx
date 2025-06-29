import { Table } from 'antd';
import { useEffect, useState } from 'react';
import supabase from '../config/supabase';

export default function AdminMessages() {
  const [data, setData] = useState([]);

  useEffect(() => {
    supabase
      .from('contact_messages')
      .select('*')
      .order('submitted_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setData(data);
      });
  }, []);

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Message', dataIndex: 'message', ellipsis: true },
    { title: 'File', dataIndex: 'file_url',
      render: url => url ? <a href={url} target="_blank">Download</a> : '-' },
    { title: 'Date', dataIndex: 'submitted_at' },
  ];

  return <Table rowKey="id" dataSource={data} columns={columns} />;
}

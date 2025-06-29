import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Typography } from 'antd';
import supabase from '../../../config/supabase';

const { Title, Paragraph } = Typography;

export default function ResetPassword() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async ({ password }) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({
        password,
      });
      if (error) throw error;
      message.success('Password has been reset successfully.');
      navigate('/auth/login'); // Redirect to login page
    } catch (error) {
      message.error(error.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: Validate if the session is available
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        message.error('Session expired or invalid link.');
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white border-opacity-20">
        <Typography className="mb-6 text-center text-white">
          <Title level={2} className="text-white">Reset Your Password</Title>
          <Paragraph className="text-indigo-200">
            Enter your new password below to update your account.
          </Paragraph>
        </Typography>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="text-white"
        >
          <Form.Item
            label="New Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your new password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="New Password"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 rounded-lg"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

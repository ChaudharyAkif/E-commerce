import React, { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { authService } from '../authService';
const { Title, Paragraph } = Typography;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async ({ email }) => {
    setLoading(true);
    try {
      await authService.resetPasswordForEmail(email);
      message.success('Password reset link sent! Check your email.');
      form.resetFields();
      navigate('/login');
    } catch (error) {
      message.error(error.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-xl p-8 shadow-lg border border-gray-200">
        <Typography className="mb-6 text-center">
          <Title level={2}>Forgot Password</Title>
          <Paragraph className="text-gray-600">
            Enter your email to receive a reset link
          </Paragraph>
        </Typography>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input placeholder="your@email.com" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
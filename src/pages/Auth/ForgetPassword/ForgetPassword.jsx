import React, { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { authService } from './authService';

const { Title, Paragraph } = Typography;

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async ({ email }) => {
    setLoading(true);
    try {
      await authService.resetPasswordForEmail(email);
      message.success('Password reset email sent! Please check your inbox.');
      form.resetFields();
    } catch (error) {
      message.error(error.message || 'Failed to send reset email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 p-6">
      <div className="max-w-md w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white border-opacity-20">
        <Typography className="mb-6 text-center text-white">
          <Title level={2} className="text-white font-extrabold tracking-tight">Forgot Password</Title>
          <Paragraph className="text-indigo-200">
            Enter your email address below and we'll send you a link to reset your password.
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input
              size="large"
              placeholder="your.email@example.com"
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
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import supabase from '../../../config/supabase';
import { useAuthcontext } from '../../../context/Auth';

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthcontext();

  const onFinish = async (values) => {
    setLoading(true);
    const { error } = await supabase.from('bank_payments').insert({
      ...values,
      user_id: user?.uid,
    });

    if (error) {
      message.error('Failed to submit');
    } else {
      message.success('Payment submitted successfully');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Bank Payment Form</h1>

      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          account_holder: 'John Doe',
          bank_name: 'Bank of America',
          account_number: '123456789012',
          routing_number: '021000021',
          amount: 2500,
        }}
      >
        <Form.Item
          label="Account Holder"
          name="account_holder"
          rules={[{ required: true, message: 'Please enter Account Holder' }]}
        >
          <Input placeholder="e.g. John Doe" />
        </Form.Item>

        <Form.Item
          label="Bank Name"
          name="bank_name"
          rules={[{ required: true, message: 'Please enter Bank Name' }]}
        >
          <Input placeholder="e.g. Bank of America" />
        </Form.Item>

        <Form.Item
          label="Account Number"
          name="account_number"
          rules={[{ required: true, message: 'Please enter Account Number' }]}
        >
          <Input placeholder="e.g. 123456789012" />
        </Form.Item>

        <Form.Item
          label="Routing Number"
          name="routing_number"
          rules={[{ required: true, message: 'Please enter Routing Number' }]}
        >
          <Input placeholder="e.g. 021000021" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: 'Please enter Amount' }]}
        >
          <InputNumber min={1} className="w-full" placeholder="Enter amount" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PaymentForm;

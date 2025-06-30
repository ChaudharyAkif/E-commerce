import React, { useState } from 'react';
import { Button, Card, Typography, message } from 'antd';

const { Title, Text } = Typography;

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);

  const handleInfoClick = async () => {
    setLoading(true);
    message.info("Please check your inbox or spam folder. If you still haven't received the email, try signing up again.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-600 via-purple-700 to-pink-600 p-4">
      <Card className="max-w-md w-full p-8 rounded-2xl shadow-xl bg-white bg-opacity-90 backdrop-blur-sm" bordered={false}>
        <Title level={3} className="text-center mb-4 text-indigo-800 font-semibold">
          Confirm Your Email Address
        </Title>
        <Text className="block text-center text-gray-700 mb-8">
          A confirmation link has been sent to your email. Please check your inbox and confirm your email to proceed.
        </Text>
        <Button
          type="primary"
          block
          size="large"
          onClick={handleInfoClick}
          loading={loading}
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold"
        >
          I Didn't Receive Email
        </Button>
      </Card>
    </div>
  );
};

export default ConfirmEmail;
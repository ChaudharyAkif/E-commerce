import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

const ThankYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-100 to-gray-200 px-4 py-12">
      <div className="bg-white max-w-3xl w-full rounded-xl shadow-xl p-8 md:p-12 text-center border border-gray-100">
        <div className="flex justify-center mb-6">
          <CheckCircleFilled style={{ fontSize: '72px', color: '#52c41a' }} />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Thank You for Your Purchase!</h1>

        <p className="text-lg text-gray-600 mb-3">
          We've received your order and are getting it ready. You'll receive an email confirmation shortly.
        </p>

        <p className="text-sm text-gray-500 mb-8">
          You can track your order status anytime through your account dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button
              size="large"
              className="bg-red-600 hover:bg-red-700 text-white border-none px-6 py-2 rounded-md shadow-sm transition-all"
              aria-label="Return to Home"
            >
              Back to Home
            </Button>
          </Link>

          <Link to="/dashboard/vieworder">
            <Button
              size="large"
              type="default"
              className="border-gray-300 px-6 py-2 rounded-md shadow-sm hover:border-gray-400 transition-all"
              aria-label="View Order History"
            >
              View My Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;

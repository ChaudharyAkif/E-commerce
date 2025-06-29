import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Descriptions, message, Steps, Typography, Tag } from 'antd';
import { CheckCircleOutlined, LoadingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import supabase from '../../../config/supabase';

const { Text } = Typography;

const PaymentConfirm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [orderId, setOrderId] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const { orderData } = state || {};
  const paymentDetails = orderData?.payment_details;

  useEffect(() => {
    if (!orderData) {
      message.error('Missing order data, redirecting to checkout');
      navigate('/checkout');
      return;
    }

    if (paymentDetails?.account_id) {
      fetchBankDetails(paymentDetails.account_id);
    }
  }, [orderData, navigate]);

  const fetchBankDetails = async (accountId) => {
    const { data, error } = await supabase
      .from('bank_payments')
      .select('*')
      .eq('id', accountId)
      .single();

    if (!error && data) {
      setBankDetails(data);
    }
  };

  const handleConfirmPayment = async () => {
    setLoading(true);
    setProcessingPayment(true);
    
    try {
      // Prepare the order data for insertion
      const orderPayload = {
        user_email: orderData.user_email,
        user_id: orderData.user_id,
        shipping_address: orderData.shipping_address,
        items: orderData.items,
        total_amount: orderData.total_amount,
        status: 'payment_pending',
        payment_method: orderData.payment_method,
        payment_details: {
          ...orderData.payment_details,
          payment_status: 'processing',
          initiated_at: new Date().toISOString()
        }
      };

      // Create order record
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()
        .single();

      if (orderError) {
        console.error('Order creation error details:', orderError);
        throw orderError;
      }

      setOrderId(order.id);
      message.info('Processing your payment...');
      setCurrentStep(1);

      // Simulate payment processing
      setTimeout(async () => {
        try {
          // Prepare payment confirmation data
          const paymentConfirmation = {
            payment_details: {
              ...order.payment_details,
              payment_status: 'completed',
              completed_at: new Date().toISOString(),
              reference_id: `BANK-${Date.now()}`
            },
            status: 'processing'
          };

          // Update order with payment confirmation
          const { error: updateError } = await supabase
            .from('orders')
            .update(paymentConfirmation)
            .eq('id', order.id);

          if (updateError) throw updateError;

          // Update bank payment record if account_id exists
          if (paymentDetails?.account_id) {
            await supabase
              .from('bank_payments')
              .update({ 
                last_used_at: new Date().toISOString(),
                amount: orderData.total_amount
              })
              .eq('id', paymentDetails.account_id);
          }

          message.success('Payment confirmed successfully!');
          setPaymentStatus('completed');
          
          setTimeout(() => {
            setCurrentStep(2);
            setProcessingPayment(false);
          }, 2000);
          
        } catch (err) {
          console.error('Payment processing error:', err);
          await supabase
            .from('orders')
            .update({
              payment_details: {
                ...order.payment_details,
                payment_status: 'failed',
                failed_at: new Date().toISOString()
              },
              status: 'payment_failed'
            })
            .eq('id', order.id);

          message.error('Payment processing failed');
          setPaymentStatus('failed');
          setProcessingPayment(false);
        }
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error('Order processing error:', err);
      message.error('Failed to process order');
      setLoading(false);
      setPaymentStatus('failed');
      setProcessingPayment(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const steps = [
    {
      title: 'Order Summary',
      content: (
        <div className="mt-6">
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Order Total">
              <Text strong>${orderData?.total_amount?.toFixed(2)}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">Bank Transfer</Descriptions.Item>
            {bankDetails && (
              <>
                <Descriptions.Item label="Bank Name">{bankDetails.bank_name}</Descriptions.Item>
                <Descriptions.Item label="Account Holder">{bankDetails.account_holder}</Descriptions.Item>
                <Descriptions.Item label="Account Number">
                  ****{bankDetails.account_number?.slice(-4)}
                </Descriptions.Item>
                <Descriptions.Item label="Routing Number">
                  {bankDetails.routing_number}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
          
          <div className="mt-6 p-4 bg-gray-50 rounded">
            <Text type="secondary">
              Note: Your order will be processed after we confirm the payment from our bank.
              Please keep your payment reference handy.
            </Text>
          </div>
          
          <Button 
            type="primary" 
            size="large"
            className="mt-6" 
            onClick={handleConfirmPayment}
            loading={loading}
            block
          >
            Confirm Payment
          </Button>
        </div>
      ),
    },
    {
      title: 'Payment Processing',
      content: (
        <div className="mt-6 text-center">
          {paymentStatus === 'pending' || processingPayment ? (
            <>
              <LoadingOutlined style={{ fontSize: 48 }} className="text-blue-500" />
              <p className="mt-4 text-lg">Processing your payment...</p>
              <p className="text-gray-500 mb-6">
                Please don't close this window while we process your payment
              </p>
            </>
          ) : paymentStatus === 'completed' ? (
            <>
              <CheckCircleOutlined style={{ fontSize: 48 }} className="text-green-500" />
              <p className="mt-4 text-lg">Payment successful!</p>
              <p className="text-gray-500">
                Reference: BANK-{Date.now().toString().slice(-6)}
              </p>
              <p className="mt-4">Taking you to order confirmation...</p>
            </>
          ) : (
            <>
              <p className="text-red-500 text-lg">Payment failed</p>
              <p className="mb-4">Please try again or use a different payment method</p>
              <Button 
                type="primary" 
                danger 
                size="large"
                className="mt-4" 
                onClick={() => {
                  setPaymentStatus('pending');
                  setCurrentStep(0);
                }}
                block
              >
                Try Again
              </Button>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Order Confirmation',
      content: (
        <div className="mt-6 text-center">
          <CheckCircleOutlined style={{ fontSize: 48 }} className="text-green-500" />
          <p className="mt-4 text-xl font-semibold">Your order has been placed successfully!</p>
          
          <div className="mt-6 max-w-md mx-auto">
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Order ID">
                <Text copyable>{orderId || 'ORD-' + Date.now().toString().slice(-6)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                <Text strong>${orderData?.total_amount?.toFixed(2)}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Payment Status">
                <Tag color="green">Completed</Tag>
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <Button 
              type="primary" 
              size="large"
              className="mt-2" 
              onClick={() => navigate('/dashboard/orders')}
            >
              View Order Details
            </Button>
            <Button 
              onClick={() => navigate('/')}
              icon={<ArrowLeftOutlined />}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <Card 
        title="Payment Confirmation" 
        headStyle={{ fontSize: '1.25rem', fontWeight: 500 }}
      >
        <Steps 
          current={currentStep} 
          className="mb-8"
          responsive={false}
          items={steps.map(s => ({ title: s.title }))}
        />
        
        <div className="min-h-[300px]">
          {steps[currentStep].content}
        </div>
        
        <div className="mt-6 flex justify-between">
          {currentStep > 0 && currentStep < steps.length - 1 && paymentStatus !== 'completed' && (
            <Button onClick={handlePrev}>Previous</Button>
          )}
          
          {currentStep < steps.length - 1 && paymentStatus === 'completed' && !processingPayment && (
            <Button 
              type="primary" 
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentConfirm;
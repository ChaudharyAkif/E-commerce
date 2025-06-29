import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import { Select, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Option } = Select;

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (id, value) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity)) {
      updateQuantity(id, quantity);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <div className="w-full -sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto px-4 py-10">
          <div className="text-sm text-gray-500 mb-4 lg:mb-15">
            <Link to="/"> Home /</Link> <span className="text-black">Cart</span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p>Your cart is empty.</p>
              <Link to="/products">
                <Button type="primary">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Header Row */}
              <div className="grid grid-cols-4 text-center border py-3 font-semibold border-gray-300">
                <div>Product</div>
                <div>Price</div>
                <div>Quantity</div>
                <div>Subtotal</div>
              </div>

              {/* Cart Items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center text-center border py-4 my-3 border-gray-200"
                >
                  <div className="flex items-center gap-3 justify-center relative">
                    {/* Image with X icon on top right */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />

                      {/* X button styled exactly like Figma */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="absolute top-[-8px] left-[-6px]  border bg-red-600 !text-white  w-6 h-6 rounded-full flex items-center justify-center    shadow-sm"
                        title="Remove item"
                      >
                        <CloseOutlined style={{ fontSize: '13px' }} />
                      </button>
                    </div>
                    <span className="text-left">{item.name}</span>
                  </div>

                  <div>${parseFloat(item.price).toFixed(2)}</div>

                  <div>
                    <Select
                      value={item.quantity.toString()}
                      onChange={(value) => handleQuantityChange(item.id, value)}
                      style={{ width: 60 }}
                    >
                      {[...Array(10)].map((_, i) => (
                        <Option key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <div>${(item.quantity * item.price).toFixed(2)}</div>
                </div>
              ))}

              {/* Buttons Row */}
              <div className="flex justify-between mt-6">
                <Link to="/product">
                  <Button
                    type="default"
                    className="lg:!p-7 !text-black border border-gray-300 md:w-[180px]"
                  >
                    Return To Shop
                  </Button>
                </Link>
                <Button
                  type="default"
                  className="lg:!p-7 !text-black border border-gray-300 md:w-[180px]"
                >
                  Update Cart
                </Button>
              </div>

              {/* Coupon + Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 mt-8 gap-6">
                {/* Coupon Input */}
                <div className="flex gap-3 h-[50px] mt-2">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    className="border px-4 py-2 w-1/2"
                  />
                  <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    Apply Coupon
                  </button>
                </div>

                {/* Summary */}
                <div className="border p-6 ml-auto w-[470px] h-[300px]">
                  <h2 className="text-lg font-bold mb-4">Cart Total</h2>

                  <div className="flex justify-between border-b border-gray-300 py-2">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between border-b border-gray-300 py-2">
                    <span className="text-gray-700">Shipping:</span>
                    <span className="font-medium">Free</span>
                  </div>

                  <div className="flex justify-between py-2 mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <Link to="/checkout">
                    <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                      Proceed to checkout
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// ✅ ProductDetails.jsx - Update functionality only, keep design unchanged

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Col, Radio, Rate, Row } from 'antd';
import supabase from '../../../config/supabase';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({ sizes: [] });
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [color, setColor] = useState('red');
  const [size, setSize] = useState('M');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchUserAndProduct = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Product fetch error:', error.message);
        setProduct(null);
      } else {
        setProduct(data);
        if (data?.sizes?.length) setSize(data.sizes[0]);
      }
      setLoading(false);
    };

    if (id) fetchUserAndProduct();
  }, [id]);

const handleBuyNow = () => {
  if (!user) {
    alert('Please login to continue');
    return;
  }

  const cartItem = {
    user_id: user.id,
    user_email: user.email,
    product_id: product.id,
    product_title: product.title,
    product_price: product.price,
    product_image: product.image_url,
    quantity,
    color,
    size,
    created_at: new Date().toISOString(),
  };

  // 1. Get existing cart from localStorage
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  // 2. Add current item to cart
  const updatedCart = [...existingCart, cartItem];

  // 3. Save back to localStorage
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  // 4. Also save current item to checkoutData for direct checkout page
  localStorage.setItem('checkoutData', JSON.stringify(cartItem));

  // 5. Navigate to checkout
  navigate('/checkout');
};
  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => Math.max(1, prev - 1));

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!product) return <div className="text-center py-10 text-red-500">Product Not Found</div>;

  return (
    <main className="w-full max-w-[1170px] mx-auto px-4 py-6">
      <Row gutter={[24, 24]}>
        {/* Side Thumbnails */}
        <Col xs={24} md={4}>
          <div className="flex md:flex-col gap-2">
        {[...Array(4)].map((_, i) => (
  <div key={i} className="bg-green-500 w-[80px] h-[100px]">
    <img
      src={product.image_url}
      alt={product.title}
      className={`object-contain w-full h-full ${i % 2 === 1 ? 'scale-x-[-1]' : ''}`}
    />
  </div>
))}
          </div>
        </Col>

        {/* Main Image */}
        <Col xs={24} md={10}>
          <div className="bg-gray-300 h-[600px] flex items-center justify-center">
            <img src={product.image_url} alt={product.title} className="object-contain max-h-full p-4" />
          </div>
        </Col>

        {/* Details Section */}
        <Col xs={24} md={10}>
          <div className="w-full max-w-[400px] mx-auto">
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>

            <div className="flex items-center gap-2 mb-3">
              <Rate value={product.rating} className="text-yellow-500" />
              <span className="text-gray-500 text-sm">{product.reviewCount}</span>
              <span className="text-green-600 text-sm">| In Stock</span>
            </div>

            <div className="text-2xl font-semibold mb-5">${parseFloat(product.price).toFixed(2)}</div>
            <p className="text-sm text-gray-600 mb-5">{product.description}</p>

            <hr className="my-5" />

            {/* Colors */}
            <div className="mb-5">
              <label className="font-medium mr-2">Colours:</label>
              <Radio.Group onChange={(e) => setColor(e.target.value)} value={color}>
                <Radio.Button value="red" style={{ background: "#dc2626", color: "white" }}>●</Radio.Button>
                <Radio.Button value="gray" style={{ background: "#6b7280", color: "white" }}>●</Radio.Button>
              </Radio.Group>
            </div>

            {/* Sizes */}
            <div className="mb-5">
              <label className="font-medium mr-2">Size:</label>
              <Radio.Group onChange={(e) => setSize(e.target.value)} value={size}>
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <Radio.Button key={s} value={s} disabled={!product.sizes?.includes(s)}>
                    {s}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            {/* Quantity & Buy */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex items-center border rounded overflow-hidden">
                <button onClick={decreaseQty} className="px-2 bg-gray-200">-</button>
                <div className="px-4">{quantity}</div>
                <button onClick={increaseQty} className="px-2 bg-gray-200">+</button>
              </div>
              <Button type="primary" className="bg-red-500 hover:bg-red-600" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>

            <div className="border p-4 rounded-md text-sm mb-3">
              <p className="font-medium">🚚 Free Delivery</p>
              <p>
                <a className="text-blue-600 underline cursor-pointer">Enter your postal code for Delivery Availability</a>
              </p>
            </div>

            <div className="border p-4 rounded-md text-sm">
              <p className="font-medium">🔄 Return Delivery</p>
              <p>
                Free 30 Days Delivery Returns. <a className="text-blue-600 underline cursor-pointer">Details</a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default ProductDetails;

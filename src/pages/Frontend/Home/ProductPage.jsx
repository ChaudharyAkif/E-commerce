// src/pages/Frontend/Home/ProductCartMain.jsx
import React, { useEffect, useState } from 'react';
import { Typography, message, Skeleton } from 'antd';
import { useCart } from './CartContext';
import supabase from '../../../config/supabase';
import ProductCard from './ProductCarts/ProductCart1';

const { Title } = Typography;

const ProductCartMain = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const parsedProducts = data.map((product) => ({
        ...product,
        image_url: getFirstImageUrl(product.image_url),
        colors: typeof product.colors === 'string'
          ? product.colors.split(',').map(c => c.trim())
          : [],
      }));

      setProducts(parsedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      message.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const getFirstImageUrl = (imageField) => {
    if (!imageField) return null;
    if (typeof imageField === 'string') {
      try {
        const urls = JSON.parse(imageField);
        if (Array.isArray(urls) && urls.length > 0) {
          return urls[0];
        }
      } catch {
        // If parsing fails, assume it's a single URL
        return imageField;
      }
    }
    if (Array.isArray(imageField)) {
      return imageField[0];
    }
    return null;
  };

  return (
    <main className="p-4 flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-6xl">
        <Title level={3} className="text-center text-blue-600">
          All Products
        </Title>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-red-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{
                  id: product.id,
                  name: product.title,
                  description: product.description,
                  price: product.price,
                  discount: product.discount,
                  rating: product.rating,
                  reviewCount: product.reviewCount || 0,
                  colors: product.colors,
                  image: product.image_url,
                }}
                addToCart={addToCart}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductCartMain;

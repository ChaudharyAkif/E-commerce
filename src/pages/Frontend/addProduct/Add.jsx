import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Rate,
  InputNumber,
  Select,
  message,
  Spin,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../config/supabase';

const { Option } = Select;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [sellerStatus, setSellerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [finalPrice, setFinalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        message.error('Please log in first');
        navigate('/login');
        return;
      }

      setUser(user);

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role, seller_status')
        .eq('uid', user.id)
        .single();

      if (userError) {
        message.error('Failed to fetch user data');
        return;
      }

      setRole(userData.role);
      setSellerStatus(userData.seller_status);
      setLoading(false);
    };

    getUserDetails();
  }, [navigate]);

  const uploadImagesToSupabase = async () => {
    let urlString = '';

    for (let file of imageFiles) {
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        message.error(`Failed to upload image: ${file.name}`);
        return null;
      }

      const publicURL = `https://qhntcmrfiukxnhvwrovh.supabase.co/storage/v1/object/public/product-images/${fileName}`;
      
      urlString += urlString ? `,${publicURL}` : publicURL;
    }

    return urlString;
  };

  const handlePriceChange = (_, allValues) => {
    const original = Number(allValues.original_price) || 0;
    const discount = Number(allValues.discount) || 0;
    const final = original - (original * discount) / 100;
    setFinalPrice(final.toFixed(2));
  };

  const onFinish = async (values) => {
    if (imageFiles.length === 0) {
      message.error('Please upload at least one image');
      return;
    }

    setUploading(true);

    try {
      const imageUrlsString = await uploadImagesToSupabase();
      if (!imageUrlsString) {
        message.error('Failed to upload images');
        return;
      }

      const productData = {
        title: values.title,
        description: values.description,
        price: parseFloat(finalPrice),
        original_price: parseFloat(values.original_price),
        discount: parseInt(values.discount),
        quantity: parseInt(values.quantity),
        sizes: values.sizes?.join(','),
        colors: values.colors?.join(','),
        rating: parseFloat(values.rating),
        reviewCount: parseInt(values.reviewCount), // NEW FIELD: total rating count
        image_url: imageUrlsString,
        seller_id: user.id,
        created_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('products').insert([productData]);

      if (error) {
        throw error;
      }

      message.success('Product added successfully!');
      form.resetFields();
      setImageFiles([]);
      setFinalPrice(0);
    } catch (error) {
      console.error('Error adding product:', error);
      message.error('Failed to add product');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin tip="Loading user info..." />
      </div>
    );
  }

  if (!(role === 'admin' || (role === 'seller' && sellerStatus === 'approved'))) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        You are not authorized to add products.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border shadow rounded-xl bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Product</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handlePriceChange}
      >
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please enter product title' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please enter product description' }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Original Price" name="original_price" rules={[{ required: true, message: 'Please enter original price' }]}>
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item label="Discount (%)" name="discount" rules={[{ required: true, message: 'Please enter discount' }]}>
          <InputNumber className="w-full" min={0} max={100} />
        </Form.Item>

        <Form.Item label="Final Price">
          <InputNumber className="w-full" value={Number(finalPrice)} disabled />
        </Form.Item>

        <Form.Item label="Quantity" name="quantity" rules={[{ required: true, message: 'Please enter quantity' }]}>
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item label="Available Sizes" name="sizes" rules={[{ required: true, message: 'Please select at least one size' }]}>
          <Select mode="multiple" placeholder="Select sizes">
            <Option value="XS">XS</Option>
            <Option value="S">S</Option>
            <Option value="M">M</Option>
            <Option value="L">L</Option>
            <Option value="XL">XL</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Colors" name="colors" rules={[{ required: true, message: 'Please select at least one color' }]}>
          <Select mode="tags" placeholder="Enter colors (e.g. red, blue)" />
        </Form.Item>

        <Form.Item label="Rating" name="rating" rules={[{ required: true, message: 'Please rate this product' }]}>
          <Rate allowHalf />
        </Form.Item>

        <Form.Item
          label="Total Number of People Rated"
          name="reviewCount"
          rules={[{ required: true, message: 'Please enter total number of ratings' }]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>

        <Form.Item label="Product Images" required>
          <Upload
            beforeUpload={(file) => {
              if (imageFiles.length >= 4) {
                message.warning('Maximum 4 images allowed');
                return false;
              }
              setImageFiles([...imageFiles, file]);
              return false;
            }}
            onRemove={(file) => {
              setImageFiles((prev) => prev.filter((f) => f.uid !== file.uid));
            }}
            fileList={imageFiles.map((file, index) => ({
              uid: file.uid || index.toString(),
              name: file.name,
              status: 'done',
              url: URL.createObjectURL(file),
            }))}
            listType="picture"
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Upload Images (Max 4)</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={uploading}>
            {uploading ? 'Adding Product...' : 'Add Product'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProduct;

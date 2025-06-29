// // AddProduct.jsx
// import React, { useState } from 'react';
// import { Button, Col, Form, Input, Row, Space, Typography, message, InputNumber, Rate } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
// import supabase from '../../../config/supabase';
// import { v4 as uuidv4 } from 'uuid';

// const { Title } = Typography;

// const initialState = {
//   name: '',
//   price: '',
//   originalPrice: '',
//   discount: '',
//   reviewCount: '',
//   rating: '',
//   file: null,
// };

// const AddProduct = () => {
//   const [state, setState] = useState(initialState);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => setState((s) => ({ ...s, [e.target.name]: e.target.value }));
//   const handleNumberChange = (name, value) => setState((s) => ({ ...s, [name]: value }));
//   const handleFileChange = (e) => setState((s) => ({ ...s, file: e.target.files[0] }));

//   const handleSubmit = async () => {
//     const { name, price, originalPrice, discount, reviewCount, rating, file } = state;

//     if (!name || !price || !originalPrice || !discount || !reviewCount || !rating) {
//       return message.error('Please enter all the required fields');
//     }

//     setLoading(true);
//     let imageUrl = '';

//     // Upload file to Supabase Storage
//     if (file) {
//       const fileExt = file.name.split('.').pop();
//       const fileName = `${uuidv4()}.${fileExt}`;
//       const filePath = `products/${fileName}`;

//       const { error: uploadError } = await supabase.storage
//         .from('product-images')
//         .upload(filePath, file);

//       if (uploadError) {
//         console.error('Upload error:', uploadError);
//         message.error('Image upload failed');
//         setLoading(false);
//         return;
//       }

//       const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
//       imageUrl = data.publicUrl;
//     }

//     const { error } = await supabase.from('products').insert([
//       {
//         name,
//         price,
//         original_price: originalPrice,
//         discount,
//         review_count: reviewCount,
//         rating,
//         image_url: imageUrl,
//         created_at: new Date().toISOString(),
//       },
//     ]);

//     if (error) {
//       console.error('Insert error:', error);
//       message.error('Something went wrong');
//     } else {
//       message.success('Product added successfully');
//       setState(initialState);
//     }

//     setLoading(false);
//   };

//   return (
//     <main className='p-4 flex justify-center items-center bg-primary min-h-screen'>
//       <div className='card p-4 bg-white rounded-lg shadow-md w-full max-w-2xl'>
//         <Title level={3} className='text-center text-primary'>Add Product</Title>
//         <Form layout='vertical'>
//           <Row gutter={[16, 16]}>
//             <Col span={24}>
//               <Form.Item label='Product Name' required>
//                 <Input name='name' value={state.name} onChange={handleChange} />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label='Price ($)' required>
//                 <InputNumber
//                   min={0}
//                   name='price'
//                   value={state.price}
//                   onChange={(value) => handleNumberChange('price', value)}
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label='Original Price ($)' required>
//                 <InputNumber
//                   min={0}
//                   name='originalPrice'
//                   value={state.originalPrice}
//                   onChange={(value) => handleNumberChange('originalPrice', value)}
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label='Discount (%)' required>
//                 <InputNumber
//                   min={0}
//                   max={100}
//                   name='discount'
//                   value={state.discount}
//                   onChange={(value) => handleNumberChange('discount', value)}
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item label='Review Count' required>
//                 <InputNumber
//                   min={0}
//                   name='reviewCount'
//                   value={state.reviewCount}
//                   onChange={(value) => handleNumberChange('reviewCount', value)}
//                   style={{ width: '100%' }}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item label='Rating (out of 5)' required>
//                 <Rate
//                   allowHalf
//                   value={state.rating}
//                   onChange={(value) => handleNumberChange('rating', value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Form.Item label='Upload Product Image' required>
//                 <Input type='file' onChange={handleFileChange} />
//               </Form.Item>
//             </Col>
//             <Col span={24}>
//               <Space>
//                 <Button type='primary' loading={loading} onClick={handleSubmit}>
//                   Add Product
//                 </Button>
//               </Space>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </main>
//   );
// };

// export default AddProduct;

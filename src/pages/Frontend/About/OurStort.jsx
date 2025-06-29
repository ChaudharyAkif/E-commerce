import React from 'react';
import { Breadcrumb, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import storyImage from '../../../assets/images/aboutimage.jpg'; // Add your own image

const { Title, Paragraph } = Typography;

const OurStory = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <Breadcrumb
        className="mb-6"
        items={[
          {
            title: (
              <>
                <HomeOutlined />
                <span className="ml-1">Home</span>
              </>
            ),
          },
          {
            title: 'About',
          },
        ]}
      />

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div>
          <Title level={2} className="!text-black">
            Our Story
          </Title>
          <Paragraph className="text-gray-600">
            Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
          </Paragraph>
          <Paragraph className="text-gray-600">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assortment in categories ranging from consumer.
          </Paragraph>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <img src={storyImage} alt="Our Story" className="rounded-lg shadow-lg max-h-[450px] object-cover" />
        </div>
      </div>
    </div>
  );
};

export default OurStory;

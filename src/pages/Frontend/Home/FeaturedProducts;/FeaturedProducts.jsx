import React from 'react'
import women1 from '../../../../assets/images/women1.jpg'
import machine1 from '../../../../assets/images/machine1.png'
import air from '../../../../assets/images/air.png'
import perfume from '../../../../assets/images/perfume.png'
import { Col, Row } from 'antd'

const FeaturedProducts = () => {
  return (
    <div className="w-full max-w-[1170px] -sm py-3 mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">  
        <Row className='my-8'>
          <Col span={24}>
            <h1 className='text-4xl font-sans font-semibold'>New Arrival</h1>
          </Col>
        </Row>
        <Row className='mb-10' gutter={[16, 16]}>
          <Col md={12} xs={24}>
            <div className='bg-black w-full h-[588px] relative overflow-hidden'>
              <img
                src={machine1}
                alt="PS5"
                className="w-full h-full object-contain p-10"
              />
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white w-full">
                <h3 className="text-xl font-bold">PlayStation 5</h3>
                <p className="text-sm my-5">Black and White version of the PS5 coming out on sale.</p>
                <button className="mt-2 text-white underline">Shop Now</button>
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div className='bg-[#0D0D0D] w-full h-[285px] relative overflow-hidden'>
                  <img
                    src={women1}
                    alt="Women's Collection"
                    className="w-full h-full object-cover object-center transform scale-x-[-1]"
                  />
                  <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white w-full">
                    <h3 className="text-xl font-bold">Women's Collections</h3>
                    <p className="text-sm my-5">Featured woman collections that give you another vibe.</p>
                    <button className="mt-2 text-white underline">Shop Now</button>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  <Col md={12} xs={24}>
                    <div className='w-full h-[285px] bg-black relative overflow-hidden'>
                      <img
                        src={air}
                        alt="Speakers"
                        className="w-full h-full object-contain p-6"
                      />
                      <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white w-full">
                        <h3 className="text-xl font-bold">Speakers</h3>
                        <p className="text-sm my-2">Amazon wireless speakers.</p>
                        <button className="mt-2 text-white underline">Shop Now</button>
                      </div>
                    </div>
                  </Col>
                  <Col md={12} xs={24}>
                    <div className='w-full h-[285px] bg-black relative overflow-hidden'>
                      <img
                        src={perfume}
                        alt="Perfume"
                        className="w-full h-full object-contain p-6"
                      />
                      <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white w-full">
                        <h3 className="text-xl font-bold">Perfume</h3>
                        <p className="text-sm my-2">GUCCI INTENSE OUD EDP.</p>
                        <button className="mt-2 text-white underline">Shop Now</button>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FeaturedProducts;
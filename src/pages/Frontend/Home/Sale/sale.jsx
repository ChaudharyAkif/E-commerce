import { Col, Row } from 'antd';
import React from 'react';

const Sale = ({ title, color }) => {
    return (
        <div className="w-full max-w-[1170px] -sm py-3 mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Row align="middle">
                    <Col>
                        <div className="flex items-center gap-2">
                            <div className={`w-5 h-10 bg-red-600`}></div>
                            <h1 className={`text-${color} font-bold text-[16px]`}>
                                {title}
                            </h1>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Sale;

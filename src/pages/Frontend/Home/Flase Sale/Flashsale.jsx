import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';

const FlashSale = () => {
  const [time, setTime] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds === 0) {
          seconds = 59;
          if (minutes === 0) {
            minutes = 59;
            if (hours === 0) {
              hours = 23;
              days = days > 0 ? days - 1 : 0;
            } else {
              hours -= 1;
            }
          } else {
            minutes -= 1;
          }
        } else {
          seconds -= 1;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-[1170px] -sm py-3 mx-auto ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Row align="middle" gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold text-black sm:mt-3 ">Flash Sales</h2>
              <div className="mt-0 sm:mt-2.5 ml-0 sm:ml-4">
                <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 items-center">
                  {Object.entries(time).map(([unit, value], index) => (
                    <React.Fragment key={unit}>
                      <div className="text-center">
                        <div className="text-black text-xs sm:text-sm md:text-10xl">
                          {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </div>
                        <div className="text-xl sm:text-2xl md:!text-[28px] lg:text-2xl font-bold text-black">
                          {value.toString().padStart(2, '0')}
                        </div>
                      </div>
                      {index < 3 && (
                        <div className="text-xl sm:text-2xl mt-3 md:text-1xl lg:text-2xl font-bold text-black">:</div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default FlashSale;
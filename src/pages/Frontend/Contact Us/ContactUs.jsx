import React from 'react'
import ContactSection from './FormContact'
import { ConfigProvider } from 'antd'

const ContactUs = () => {
  return (<ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
      components: {
        Input: {
          colorTextPlaceholder: '#7e7c7c',
          colorBgContainer: '#f5f5f5' // 👈 Set placeholder color to black
        },
      },
    }}
  >



    <div className="w-full -sm py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen bg-gray-50">
          {/* Top Bar */}
          <div className="flex justify-between px-6 py-4 lg:pl-10 text-sm text-gray-700">
            <span className="text-gray-400">Home / <span className="text-black">Contact Us</span></span>
            <span>Welcome! <span className="text-red-500 font-medium">Md Rimel</span></span>
          </div>

          {/* Content */}
          <ContactSection />
        </div>
      </div>
    </div>


  </ConfigProvider>
  )
}

export default ContactUs

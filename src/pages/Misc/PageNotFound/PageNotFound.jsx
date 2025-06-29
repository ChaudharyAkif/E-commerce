import { Button, Result } from 'antd'
import React from 'react'

const PageNotFound = () => {
  return (
    <>
       <div className="w-full -sm py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-sm text-gray-600">
          <span className="text-gray-400">Home</span> / 404 Error
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <Result
          status="404"
          title="404 Not Found"
          subTitle="Your visited page not found. You may go home page."
          extra={
            <Button 
              type="primary" 
              onClick={() => navigate('/')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Back to home page
            </Button>
          }
          className="max-w-md"
        />
      </div>
    </div>
            </div>
        </div>
    </>
  )
}

export default PageNotFound


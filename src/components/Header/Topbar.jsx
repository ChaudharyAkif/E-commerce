import { Dropdown, Space, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const languageItems = [
  { key: '1', label: 'English' },
  { key: '2', label: 'Mandarin Chinese' },
  { key: '3', label: 'Spanish' },
  { key: '4', label: 'Arabic' },
  { key: '5', label: 'Japanese' },
];

const TopBar = () => {
  return (
    <nav className="bg-black shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-2">
          {/* Left spacer - increased width */}
          <div className="hidden sm:block sm:w-[180px]"></div>
          
          {/* Promo text section */}
          <div className="text-xs text-white sm:text-sm text-center whitespace-nowrap overflow-hidden overflow-ellipsis max-w-full px-2">
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            <Button 
              type="text" 
              className="!text-white hover:!text-gray-600 !font-medium !font-sans !p-0 !ml-1 underline underline-offset-4"
            >
              Shop Now →
            </Button>
          </div>
          
          {/* Language dropdown - pushed further right */}
          <div className="sm:w-[180px] flex justify-end mr-3 sm:mr-5 lg:mr-8">
            <Dropdown 
              menu={{ items: languageItems }}
              overlayClassName="min-w-[120px]"
            >
              <a onClick={(e) => e.preventDefault()} className="text-sm sm:text-base text-white">
                <Space>
                  English
                  <DownOutlined className="text-xs" />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopBar;
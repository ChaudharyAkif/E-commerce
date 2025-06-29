import { Input, Button } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined, SendOutlined } from '@ant-design/icons';
import Qr from "../../assets/images/qr.jpg"
import applestore from "../../assets/images/applestore.png"
import googleStore from "../../assets/images/googleStore.png"
import { RiFacebookLine, RiLinkedinLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (

            
    <footer className="bg-black text-white py-10 px-5 md:px-20">
    <div className="w-full max-w-[1170px] -sm py-3 mx-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Exclusive Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Exclusive</h2>
          <p className="mb-2">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="flex gap-2">
            <Input
              suffix={<SendOutlined style={{ color: 'white' }} />}
              style={{ borderWidth: 2 }}
              className=" rounded-full px-2 py-2 !bg-black !text-white  !border-white  !w-50"
              placeholder="Enter your email"
            />

          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <p className="text-sm">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="text-sm mt-2">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>

        {/* Account */}
        <div>
          <h3 className="font-semibold mb-3">Account</h3>
          <ul className="space-y-1 text-sm">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Link</h3>
          <ul className="space-y-1 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3">Download App</h3>
          <p className="text-xs mb-2">Save $3 with App New User Only</p>
          <div className="flex  items-center gap-2  ">
            <img src={Qr} alt="QR" className="w-16" />
            <div className="  flex flex-col gap-2 ">
              <img src="https://www.openhab.org/assets/img/en_badge_web_generic.b07819ff.png" alt="Google Play" className="w-24" />
              <img src="https://cdn3.pixelcut.app/web/assets/app-store.png" alt="App Store" className="w-24" />
            </div>
          </div>
          <div className="flex space-x-3 mt-4 text-3xl">
              <RiFacebookLine/>
              <Link to={"https://github.com/ChaudharyAkif"} target="_blank" rel="noopener noreferrer">
              <TwitterOutlined />
              </Link>
            <InstagramOutlined />
            <RiLinkedinLine />
          </div>
        </div>
      </div>


      <hr className="border-gray-700 my-6" />
      <p className="text-center text-sm text-gray-500">&copy; Copyright Muhammad Akif Hussain {new Date().getFullYear()}. All right reserved</p>
</div>
            </div>
    </footer>
  );
};

export default Footer;

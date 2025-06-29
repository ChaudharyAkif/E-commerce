import { ConfigProvider } from "antd"
import "../node_modules/flowbite/dist/flowbite"
import './App.css'
import Footer from "./components/Footer/Footer"
import Navbar from "./components/Header/Navbar"
import Topbar from "./components/Header/Topbar"
import Index from "./pages/Routes"
import { CartProvider } from "./pages/Frontend/Home/CartContext"
import '@fontsource/poppins'; // Defaults to weight 400
import { WishlistProvider } from "./pages/Dashboard/WishList/WishListContext"
import "./config/global"
import '@ant-design/v5-patch-for-react-19';
// import "./config/supabase"
function App() {

  return (
    <>
      <ConfigProvider
        theme={{
          token:{
            colorPrimary:"#DB4444"
          },
          components: {
            Input: {
              colorTextPlaceholder: '#fff', // ✅ sets placeholder color
            },
          },
        }}
      >
          <WishlistProvider>
       
        <main>
          <Index />
        </main>
        <Footer />
</WishlistProvider>
      </ConfigProvider>

    </> 
  )
}

export default App



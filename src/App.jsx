import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CategoryList from './page/category/CategoryList'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './App.css'
import Login from './page/login/Login'
import HomePage from './page/home/HomePage'
import NotFound from './page/notFound/NotFound'
import ListBlog from './page/blog/ListBlog'
import Blog from './page/blog/Blog'
import BarCode from './page/barcode/BarCode'
import Account from './page/account/Account'
import CheckOut from './page/payment/CheckOut'
import ForgetPassword from './page/login/ForgetPassword'
import Order from './page/order/Order'
import Registration from './page/login/Registration'
import ProductDetail from './page/product/ProductDetail'
import { Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import Contract from './page/contract/Contact'
import SendCodeEmail from './page/login/SendCodeEmail'
import Contact from './page/contract/Contact'
import Introduce from './page/Introduce/Introduce'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ConfirmAccount from './page/login/ConfirmAccount'
import HomeList from './page/home/HomeList'
import Search from './page/search/Search'
import ListProduct from './page/product/ListProduct'
import ChanglePassWord from './page/login/ChanglePassWord'
import WishList from './page/account/WishList'
import PaymentContinue from './page/payment/PaymentContinue'
import MyOrder from './page/order/MyOrder'
import PaymentDetail from './page/order/PaymentDetail'
import Loading from './page/loading/Loading';
import ListPayment from './page/order/ListPayment';





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='list/:content' element={<HomeList />} />
          <Route path='search/:keyword' element={<Search />} />


          <Route path='category'>
            <Route index element={<CategoryList />} />
            <Route path=':categoryId' element={<ListProduct />} />

            <Route path='*' element={<NotFound />} />
          </Route >

          <Route path='product/:productID' element={<ProductDetail />} />

          
          <Route path='ListBlog'>
            <Route index element={<ListBlog />} />

            <Route path='*' element={<Loading />} />
          </Route >


          <Route path='blog/:blogId' element={<Blog />} />


          <Route path='contact' element={<Contact />} />
          <Route path='introduce' element={<Introduce />} />


          <Route path='showProduct/:content' element={<HomeList />} />
        

          <Route path='account'>
            <Route index element={<Account />} />
            <Route path='myOrder' element={<Order />} />
            <Route path='thanks' element={<PaymentContinue />} />
            <Route path='wishList' element={<WishList />} />
            <Route path='changlePassword' element={<ChanglePassWord/>}/>
            <Route path='checkout' element={<CheckOut />} />
            <Route path='MyBill' element={<MyOrder />} />
            <Route path='payments' element={<ListPayment />} />
            <Route path='getBill/:paymentId' element={<PaymentDetail />} />
            <Route path='*' element={<NotFound />} />
          </Route >

          <Route path='login'>
            <Route index element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Route >

          <Route path='register'>
            <Route index element={<Registration />} />
            <Route path='confirm' element={<ConfirmAccount />} />
            <Route path='*' element={<NotFound />} />
          </Route >

          <Route path='forgetPassword'>
            <Route index element={<ForgetPassword />} />
            <Route path='checkEmail' element={<SendCodeEmail />} />
            <Route path='*' element={<NotFound />} />
          </Route >


          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />



    </>
  )
}

export default App

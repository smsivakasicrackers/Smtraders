
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router,Route ,Routes, useLocation} from 'react-router-dom';
import Home from './Pages/Home/Home';
// import Product from './Pages/products/Product'
import {HelmetProvider} from 'react-helmet-async'
import Cracker from './components/product-section/Cracker';
import Contact from './components/contact-us/contact';
import {ToastContainer} from 'react-toastify'
import ProductSearch from './Pages/products/ProductSearch';
import Login from './components/user/Login';
import Register from './components/user/Register';
import About from './components/about-page/About';
import store from './components/store'
import { useEffect } from 'react';
import { loadUser } from './actions/userAction';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ProtectedRoute from './components/route/ProtectedRoute';
import ConfirmOrder from './components/cart/ConfirmOrder';
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList';
import NewProduct from './components/admin/NewProduct';
import Payment from './components/cart/Payment';
import OrderList from './components/admin/OrderList';
import UpdateProduct from './components/admin/UpdateProduct';
import Whatsapp from './components/Whatsapp';

import Termsandcondition from './components/Termsandcondition';
import Combo from './components/Combo';
import RegisterComp from './components/RegisterComp';
import UserList from './components/admin/UserList';
import PriceList from './components/PriceList';
import TrackOrder from './components/order/TrackOrder';

// Admin pages own their entire shell (Sidebar + top bar) — the public
// Navbar/Whatsapp widget/lead popup must not render there, or they visually
// collide with the sidebar's own fixed-position header.
function AppShell() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      <HelmetProvider>
        {!isAdmin && <RegisterComp/>}
        {!isAdmin && <Navbar/>}
        {!isAdmin && <Whatsapp/>}

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          theme="light"
          toastClassName="!rounded-xl !font-sans !shadow-premium"
        />
        <Routes>
          <Route path='/search' element={<ProductSearch/>}/>
          <Route path='/About' element={<About/>}/>
          <Route path='/terms' element={<Termsandcondition/>}/>
          <Route path ='/' element ={ <Home/>} />
          <Route path='/Price' element={<PriceList/>}/>
          <Route path='/combo' element={<Combo/>}/>
          <Route path='/track-order' element={<TrackOrder/>}/>
          <Route path='/search/:keyword' element={<ProductSearch/>}/>
          <Route path='/products' element ={<Cracker/>}/>
          <Route path='/contact' element = { <Contact/> }/>
          <Route path='/admin/users' element={<ProtectedRoute isAdmin={true}><UserList/></ProtectedRoute>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Register' element={<Register/>}/>
          <Route path='/Forgotpassword' element={<ForgotPassword/>}/>
          <Route path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route path = '/Mycart' element={<Cart/>}/>
          <Route path='/payment' element={<Payment/>}/>
          <Route path = '/shipping' element={<Shipping/>}/>
          <Route path = '/order/confirm' element={<ConfirmOrder/>}/>
          <Route path='/admin/orders' element={<ProtectedRoute isAdmin={true}><OrderList/></ProtectedRoute>}/>
          <Route path='/admin/product/:id' element={ <ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute> } />
          <Route path ='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
          <Route path='/admin/products' element={ <ProtectedRoute isAdmin={true}><ProductList/></ProtectedRoute> } />
          <Route path='/admin/products/create' element={ <ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute> } />
        </Routes>
      </HelmetProvider>
    </div>
  );
}

function App() {
useEffect(()=>{
  store.dispatch(loadUser)
})

  return (
    <Router>
      <AppShell/>
    </Router>
  );
}

export default App;

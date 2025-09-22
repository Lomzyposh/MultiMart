import './App.css';
import NavbarComponent from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { lazy, Suspense } from 'react';
import Loader from './Components/Loader/Loader';
import { Routes, Route } from 'react-router-dom';

// ✅ use react-toastify, not react-bootstrap
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer/Footer';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ProtectedRoute from './auth/ProtectedRoute';
import Checkout from './Pages/Checkout';
import CartButton from './Components/CartButton/CartButton';

const Home = lazy(() => import('./Pages/Home'));
const Shop = lazy(() => import('./Pages/Shop'));
const Cart = lazy(() => import('./Pages/Cart'));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <NavbarComponent />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/checkout" element={<Checkout />} />
        {/* </Route> */}

        <Route path='/cart' element={<Cart />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<Signup />} />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

      <CartButton />

      <Footer />
    </Suspense>
  );
}

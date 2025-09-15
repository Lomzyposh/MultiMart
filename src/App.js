import './App.css';
import NavbarComponent from './Components/Navbar/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { lazy, Suspense } from 'react';
import Loader from './Components/Loader/Loader';
import { Routes, Route } from 'react-router-dom';

// ✅ use react-toastify, not react-bootstrap
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('./Pages/Home'));

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
        Optional 404:
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>

    </Suspense>
  );
}

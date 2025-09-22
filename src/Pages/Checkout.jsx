import React from 'react'
import { useLocation } from 'react-router-dom';
import NotLoggedInModal from '../Components/NotLoggedIn/NotLoggedInModal';
import { useAuth } from '../auth/AuthProvider';
import PaymentMethods from '../Components/PaymentMethods/PaymentMethod';

const Checkout = () => {
  const { user } = useAuth();
  return (
    <>
      {!user && <NotLoggedInModal />}
      <PaymentMethods />
    </>
  )
}

export default Checkout
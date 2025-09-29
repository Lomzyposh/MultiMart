import { useState, useEffect } from "react";
import axios from "axios";
import "./CartPaymentPage.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../App/features/cart/cartSlice";
import NotLoggedInModal from "../../Components/NotLoggedIn/NotLoggedInModal";
import { useAuth } from "../../auth/AuthProvider";

const CartPaymentPage = () => {
    const { cartList } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        fullName: "",
        address: "",
        phone: "",
    });
    const [loading, setLoading] = useState(false);
    const [isLoadingSuccess, setIsLoadingSuccess] = useState(false);
    const totalPrice = cartList.reduce(
        (price, item) => price + item.qty * item.price,
        0
    );


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        if (totalPrice === 0) {
            toast.error("Your cart is empty.");
            navigate("/cart");
            return;
        }

        if (!user) {
            toast.error("You are not logged in.");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            if (user?.email) {
                const paystackModule = await import("@paystack/inline-js");
                const paystack = new paystackModule.default();

                paystack.newTransaction({
                    key: process.env.REACT_APP_PAYSTACK_KEY_TEST,
                    email: user.email,
                    amount: totalPrice * 100,

                    async onSuccess(transaction) {
                        toast.success(`✅ Payment was successful! 🎉 ${transaction.reference}`, {
                            duration: 3000,
                        });

                        try {
                            setIsLoadingSuccess(true);

                            await axios.post(`${process.env.REACT_APP_BASE_URL}/api/payment/success`, {
                                userId: user.id,
                                email: user.email,
                                reference: transaction.reference,
                                amount: totalPrice,
                                fullName: formData.fullName,
                                phone: formData.phone,
                                address: formData.address,
                            });

                            toast.success("💾 Payment saved on server!");
                        } catch (err) {
                            console.error("Error saving payment:", err.response?.data || err.message);
                            toast.error("Payment succeeded but failed to save on server.");
                        } finally {
                            setIsLoadingSuccess(false);
                        }

                        // clear cart
                        cartList.forEach((item) => dispatch(deleteProduct(item)));

                        navigate("/");
                    },

                    onClose: () => {
                        toast.error("❌ Transaction cancelled.");
                        navigate("/cart");
                    },
                });
            } else {
                toast.error("No email found. Please log in again.");
                navigate("/cart");
            }
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (isLoadingSuccess) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Processing payment...</p>
            </div>
        );
    }

    return (
        <>
            {!user && <NotLoggedInModal />}

            <div className="payment-container">
                <div className="payment-card">
                    <h2 className="title">Checkout</h2>

                    <div className="cart-summary">
                        <p>Total Items: {cartList.length}</p>
                        <p className="total">Total Price: ₦{totalPrice}</p>
                    </div>

                    <form onSubmit={handlePayment} className="payment-form">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Enter your full name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />

                        <label>Address</label>
                        <textarea
                            name="address"
                            placeholder="Enter your delivery address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />

                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" className="pay-btn" disabled={loading}>
                            {loading ? "Processing..." : "Proceed to Pay"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CartPaymentPage;
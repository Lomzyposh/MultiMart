import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decreaseQty, deleteProduct } from '../App/features/cart/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartList } = useSelector(state => state.cart);
    console.log(cartList);

    const dispatch = useDispatch();

    const totalPrice = cartList.reduce((total, item) => total + item.price * item.qty, 0);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <section className='cart-items'>
         
            <Container>
                <Row className='justify-content-center'>
                    <Col md={8}>
                        {cartList.length === 0 &&
                            <h2 className='no=items product'>No item added to the cart</h2>
                        }
                        {
                            cartList.map((item) => {
                                const productQty = item.price * item.qty;
                                return (
                                    <div className="cart-list" key={item.id}>
                                        <Row>
                                            <Col className="image-holder" sm={4} md={3}>
                                                <img src={item.imgUrl} alt="" />
                                            </Col>
                                            <Col sm={8} md={9}>
                                                <Row className='cart-content justify-content-center'>
                                                    <Col xs={12} sm={9} className='cart-details'>
                                                        <h3>{item.productName}</h3>
                                                        <h4>
                                                            ${item.price}.00

                                                        </h4>
                                                    </Col>
                                                    <Col xs={12} sm={3} className='cart-function'>
                                                        <button className="incCart" onClick={() => dispatch(addToCart({ product: item, num: 1 }))}>
                                                            <i className="fa-solid fa-plus"></i>
                                                        </button>
                                                        <span >{item.qty}</span>
                                                        <button className="desCart" onClick={() => dispatch(decreaseQty(item.id))}>
                                                            <i className="fa-solid fa-minus"></i>
                                                        </button>
                                                    </Col>
                                                    <Col xs={12} className='cart-subtotal'>
                                                        <h4>Subtotal : <span className='text-green'>${productQty}.00</span></h4>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <button className="delete" onClick={() => dispatch(deleteProduct(item))}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </Row>
                                    </div>
                                )
                            })}
                    </Col>
                    <Col md={4}>
                        <div className="cart-total">
                            <h2>Cart Summary</h2>
                            <div className="d_flex">
                                <h4>Total Price :</h4>
                                <h3>${totalPrice}.00</h3>
                            </div>

                        </div>
                        <Link to='/checkout' className="checkout">Proceed to Checkout</Link>
                    </Col>
                </Row>
            </Container>
        </section >
    )
}

export default Cart
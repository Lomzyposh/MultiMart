import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../App/features/cart/cartSlice';
import { toast } from 'react-toastify';
import './product-details.css'
import { Col, Container, Row } from 'react-bootstrap';

const ProductDetails = ({ selectedProduct }) => {
    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    }
    const handleAdd = (selectedProduct, quantity) => {
        dispatch(addToCart({ product: selectedProduct, num: quantity }));
        toast.success('Product added to cart');
    }
    return (
            <section className='product-page'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col md={6}>
                            <img loading='lazy' src={selectedProduct?.imgUrl} alt="" />
                        </Col>
                        <Col md={6}>
                            <h2>{selectedProduct?.productName}</h2>
                            <div className="rate">
                                <div className="stars">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <span>{selectedProduct?.avgRating} ratings</span>

                            </div>
                            <div className="infos">
                                <span className='price'>${selectedProduct?.price}</span>
                                <span>Category: {selectedProduct?.category}</span>
                            </div>
                            <p>{selectedProduct?.shortDesc}</p>
                            <input type="number" className="qty-input"placeholder='Qty' value={quantity} onChange={handleQuantityChange} />
                            <button aria-label='Add' className="add" type='submit' onClick={() => handleAdd(selectedProduct, quantity)}>Add to Cart</button>
                        </Col>
                    </Row>
                </Container>
            </section>
    )
}

export default ProductDetails

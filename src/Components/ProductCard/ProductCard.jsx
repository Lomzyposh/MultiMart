import React from 'react'
import './product-card.css'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../App/features/cart/cartSlice';
import { products } from '../../utils/products';
import { toast } from 'react-toastify';
import { Col } from 'react-bootstrap';

const ProductCard = ({ title, productItem }) => {
    const dispatch = useDispatch();
    const router = useNavigate();
    const handleClick = () => {
        router(`/shop/${productItem.id}`);
    }
    const handleAdd = (productItem) => {
        dispatch(addToCart({ product: productItem, num: 1 }));
        toast.success("Product has been added to cart!");
    }

    return (
        <Col md={3} sm={5} xs={10} className="product mtop">
            {
                title === "Big Discount" ? (
                    <span className='discount'>{productItem.discount}% Off</span>
                ) : null
            }
            <img src={productItem.imgUrl} alt="Image" onClick={() => handleClick()} />

            <div className="product-like">
                <i class="fa-regular fa-heart fa-bounce fa-xl"></i>
            </div>

            <div className="products-details">
                <h3 onClick={() => handleClick()}>{productItem.productName}</h3>
                <div className="rate">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                </div>
                <div className="price">
                    <h4>${productItem.price}</h4>
                    <button className="add" aria-label='Add' type='submit' onClick={() => handleAdd(productItem)}>
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </Col>
    )
}

export default ProductCard
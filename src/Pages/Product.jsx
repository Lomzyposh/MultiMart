import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { products } from '../utils/products';
import useWindowScrollToTop from '../Hooks/useWindowScrollToTop';
import Banner from '../Components/Banner/Banner';
import { Container } from 'react-bootstrap';
import ProductDetails from '../Components/ProductDetails/ProductDetails';
import ShopList from '../Components/ShopList';
import ProductReviews from '../Components/ProductReviews/ProductReviews';

const Product = () => {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(
        products.filter((item) => parseInt(item.id) === parseInt(id))[0]
    );
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedProduct(
            products.filter((item) => parseInt(item.id) === parseInt(id))[0]
        );
        setRelatedProducts(
            products.filter(
                (item) =>
                    item.category === selectedProduct?.category && item.id !== selectedProduct?.id
            )
        );
    }, [selectedProduct, id]);
    useWindowScrollToTop();

    return (
        <Fragment>
            <Banner title={selectedProduct?.productName} />
            <ProductDetails selectedProduct={selectedProduct} />
            <ProductReviews selectedProduct={selectedProduct} />
            <section className="related-products">
                <Container>
                    <h3>You might also like</h3>
                </Container>
                <ShopList productItems={relatedProducts}/> 
            </section>
        </Fragment>
    )
}

export default Product
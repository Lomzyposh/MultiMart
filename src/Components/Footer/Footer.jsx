import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './footer.css'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <i className='fa-solid fa-xl fa-shopping-bag'></i>
                            <h1>PoshMart</h1>
                        </div>
                        <p>
                            PoshMart is your one-stop destination for quality products and seamless shopping experiences. Discover the latest trends and enjoy fast, reliable service every time you shop with us.
                        </p>
                    </Col>
                    <Col md={3} sm={5} className='box'>
                        <h2>About Us</h2>
                        <ul>
                            <li>Careers</li>
                            <li>Our Stores</li>
                            <li>Our Cares</li>
                            <li>Terms & Conditions</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </Col>
                    <Col md={3} sm={5} className='box'>
                        <h2>Customer Care</h2>
                        <ul>
                            <li>Help Center</li>
                            <li>How to Buy</li>
                            <li>Track Your Order</li>
                            <li>Returns & Refunds</li>
                        </ul>
                    </Col>
                    <Col>
                        <h2>Contact Us</h2>
                        <ul>
                            <li>26, Aloba Street, Ikorodu, Lagos State, Nigeria</li>
                            <li>Email: alaminolomo@gmail.com</li>
                            <li>Phhone +234 (0)7032705116</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
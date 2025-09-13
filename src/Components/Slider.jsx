import React from 'react'
import { Container } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { SliderData } from '../utils/products'
import SliderCard from './SlideCard/SliderCard'

const SliderHome = () => {
    const settings = {
        nav: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    }
    return (
        <section className="homeSlide">
            <Container>
                <Slider {...settings}>
                    {SliderData.map((value, index) => 
                        <SliderCard key={index} title={value.title} cover={value.cover} desc={value.desc} />
                    )}
                </Slider>
            </Container>
        </section>
    )
}

export default SliderHome
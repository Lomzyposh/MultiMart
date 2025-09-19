import React, { Fragment, useState } from 'react'
import { products } from '../utils/products';
import useWindowScrollToTop from '../Hooks/useWindowScrollToTop';
import Banner from '../Components/Banner/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import FilterSelect from '../Components/FilterSelect';
import Searchbar from '../Components/SearchBar/Searchbar';
import ShopList from '../Components/ShopList';

const Shop = () => {
  const [filterList, setFilterList] = useState(
    products.filter(item => item.category === 'sofa')
  );
  useWindowScrollToTop();

  return (
    <Fragment>
      <Banner title='Our Products' />
      <section className='filter-bar'>
        <Container className='filter-bar-container' >
          <Row className='justify-content-center'>
            <Col md={4}>
              <FilterSelect setFilterList={setFilterList} />
            </Col>
            <Col md={6}>
              <Searchbar setFilterList={setFilterList} />
            </Col>
          </Row>
        </Container>
        <Container>
          <ShopList productItems={filterList} />
        </Container>
      </section>
    </Fragment>
  )
}

export default Shop
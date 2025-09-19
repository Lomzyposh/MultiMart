import React, { useState } from 'react'
import './searchBar.css'
import { products } from '../../utils/products';

const Searchbar = ({ setFilterList }) => {
    const [searchWord, setSearchWord] = useState(null);
    const handleChange = (e) => {
        setSearchWord(e.target.value);
        setFilterList(
            products.filter(item => item.productName?.toLowerCase().includes(searchWord?.toLowerCase()))
        );
    }
    return (
        <div className='search-container'>
            <input type="text" placeholder='Search...' onChange={handleChange} />
            <i className="ri-search-line"></i>
        </div>
    )
}

export default Searchbar

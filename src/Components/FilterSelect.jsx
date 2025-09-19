import { products } from '../utils/products';
import Select from 'react-select';

const options = [
    { value: 'sofa', label: 'Sofa' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'chair', label: 'Chair' },
    { value: 'watch', label: 'Watch' },
    { value: 'wireless', label: 'Wireless' },
];

const customStyles = {
    control: (provided) => ({
        ...provided,
        backgroundColor: '#0f3460',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        boxShadow: 'none',
        width: '200px',
        height: '40px',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#0f3460' : 'white',
        color: state.isSelected ? 'white' : 'white',
        '&:hover': {
            backgroundColor: '#0f3460',
            color: 'white',
        }
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white',
    })
};

const FilterSelect = ({ setFilterList }) => {
    const handleChange = (selectedOption) => {
        setFilterList(products.filter(item => item.category === selectedOption.value));
    }
    return (
        <Select
            options={options}
            styles={customStyles}
            defaultValue={{ value: '', label: 'Filter By Category' }}
            onChange={handleChange}
        />

    )
}

export default FilterSelect
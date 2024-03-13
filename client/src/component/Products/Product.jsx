import React, {useEffect, useState} from 'react';
import Liquors from './Liquors';

function Product() {
    const [categories, setCategories] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [content, setContent] = useState(null);
    const [table, setTable] = useState(null);
    const [validationError, setValidationError] = useState('');
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/categories');
                if(!response.ok) {
                    throw new Error('Opps something went wrong');
                } else {
                   const categories = await response.json();
                   setCategories(categories);
                }
            } catch(error) {
                console.log('Error: ' + error);
            }
        }
        fetchCategories();
    }, []);

    const handleError = (errorMessage) => {
        setValidationError(errorMessage);
    }

    const handleSelectChange = (event) => {
        const {selectedIndex, options} = event.target;
        const selectedOptionElement = options[selectedIndex];
        const categoryId = selectedOptionElement.getAttribute('data-id');
        const categoryName = selectedOptionElement.getAttribute('name');
        setSelectedOption(categoryName);
        setContent(<Liquors categoryId={categoryId} onError={handleError}/>);
        setTable(null);
    }

    return (
        <>
         <h1>Add Product</h1>
         <h2>{selectedOption}</h2>
            {validationError && <div style={{color: 'red'}}> {validationError}</div>}
            <div>
                <select value={selectedOption} onChange={handleSelectChange}>
                    <option value="" disabled>--Select Product Categories--</option>
                    {Array.isArray(categories) && categories.map((category) => (
                         <option name={category.name} data-id={category.id} key={category.id}>{category.name}</option>)
                    )}
                </select>
            </div>
            {content}
            {table}
            {/* <Liquors  onError={handleError}/> */}
        </>
    )
}

export default Product;
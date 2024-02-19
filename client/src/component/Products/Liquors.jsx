import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LiquorsTable from './LiquorsTable';
import styles from './Liquors.module.css';

function Liquors(props) {
    const [liquorsFormData, setLiquorsFormData] = useState({name: '', units: '', qty: '', cost_price: '', price: ''});
    const [liquors, setLiquors] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchToogle, setSearchToogle] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [editId, setEditId] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (pageNumber - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const [currentLiquors, setCurrentLiquors] = useState([]);
    const paginateSearchResult = searchResult.slice(startIndex, endIndex);
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await axios.get('http://localhost:3001/product/liquors');
            setLiquors(response.data);
            const initialSlicedState = response.data.slice(startIndex, endIndex);
            setCurrentLiquors(initialSlicedState);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [refresh, pageNumber,startIndex, endIndex])

    const calculateTotalPage = (data) => {
        return Math.ceil(data.length / itemsPerPage);
    }
    
    const handleSubmit = async () => {
         try {
            if (liquorsFormData.name === '') {
                props.onError('Please enter a name.');
                return;
            } 
            else if (liquorsFormData.units === '') {
                props.onError('Please select the unit');
                return;
            }
            else if (liquorsFormData.qty === '') {
                props.onError('Please enter a qty.');
                return;
            }else if(liquorsFormData.cost_price === '') {
                props.onError('Please enter a cost price.');
                return;
            }
            else if (liquorsFormData.price === '') {
                props.onError('Please enter a price.');
                return;
            }
            const categoryId = parseInt(props.categoryId, 10);
            const updatedFormData = {...liquorsFormData,category_id: categoryId};
            await axios.post('http://localhost:3001/product/liquors', updatedFormData);
            setLiquorsFormData({ ...liquorsFormData, name: '', qty: '', cost_price: '', price: '' });
            setRefresh(!refresh);
         } catch(error) {
            console.log('Error submitting the data: ', error);
         }   
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'qty' && isNaN(value)) {
            props.onError('"Qty" must be valid number');
        }else if(name === 'cost_price' && isNaN(value)) {
            props.onError('"Cost Price" must be valid number');
        }else if(name === 'price' && isNaN(value)) {
            props.onError('"Price" must be valid number');
        }else {
            const intVal = parseInt(value, 10);
            setLiquorsFormData({...liquorsFormData, [name]: isNaN(intVal) ? value: intVal});
            props.onError('');
        } 
    }

    const handleDelete = async (id) => {
        const bolValue = window.confirm('Are you sure you want to delete?');
        if(!bolValue) {
            return;
        }
        try {
            const liquor = liquors.find((liquor) => liquor.product_id === id);
            const response = await axios.delete(`http://localhost:3001/product/liquors/${liquor.product_id}`);
            console.log(response.data);
            setRefresh(!refresh);
        } catch(error) {
            console.log('Error message: ' , error);
            alert('Opps something went wrong. Please try it later');
        }
   }

   const handleEdit = (id) => {
        setEditId(id);
        props.onError('');
   }

   const handleLiquorsUpdate = (updatedLiquors) => {
        if(searchToogle) {
            const updateResult = updatedLiquors.find(item => item.product_id === editId);
            console.log('update result ', updateResult);
            const updatedSearchResult = searchResult.map((product) => {
                if(product.product_id === updateResult.product_id) {
                    console.log(product);
                    return {...product, ...updateResult};
                } else {
                    return product;
                }
            });
            setSearchResult(updatedSearchResult);
        } else {
            setCurrentLiquors(updatedLiquors);
        }    
   }
   
   const handleRefresh = () => {
        setRefresh(!refresh);
   }

   const handlePageNumber = (pageNumber) => {
        setPageNumber(pageNumber);
   }

   const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    }
   }
   const debouncedSearch = debounce((value) => {
        const matchedResult = liquors.filter((liquor) => liquor.product_name.toLowerCase().includes(value.toLowerCase()));
        setSearchResult(matchedResult);
        setSearchToogle(true);
        }, 300);
   
   const handleSearch = (event) => {
        const { value } = event.target;
        setPageNumber(1);
        debouncedSearch(value);
   }
    const displayData = searchToogle ? paginateSearchResult : currentLiquors;
    const totalPages = searchToogle ? calculateTotalPage(searchResult) : calculateTotalPage(liquors);

    return(
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={liquorsFormData.name} style={{width: '200px'}} id="name" type="text" name="name" />
            </div>
            <div>
                <label>Units</label>
                <select>
                    <option>pieces</option>
                    <option>kg</option>
                </select>
            </div>
            <div>
                 <label> Qty </label>
                 <input onChange={handleChange} value={liquorsFormData.qty} type="text" name="qty"/>
            </div>
            <div>
                <label htmlFor="costprice">Cost Price</label>
                <input onChange={handleChange} value={liquorsFormData.cost_price} id="costprice" type="text" name="cost_price" />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={liquorsFormData.price} id="price" type="text" name="price" />
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

            <h1>Products</h1>
            <input placeholder="Search Products" type="search" className={styles["search-box"]} name="search" onChange={handleSearch}/>
            <LiquorsTable 
                liquors={displayData} 
                onDelete={handleDelete} 
                onEdit={handleEdit} 
                id={editId} 
                onLiquorsUpdate={handleLiquorsUpdate} 
                onRefresh={handleRefresh} 
                onError={props.onError}
                onPageNumberChange={handlePageNumber}
                totalPages={totalPages}
                pageNumber= {pageNumber}
                />
        </>
    )
}

export default Liquors;
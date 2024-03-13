import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LiquorsTable from './LiquorsTable';
import styles from './Liquors.module.css';

function Liquors(props) {
    const [liquorsFormData, setLiquorsFormData] = useState({name: '', units: '', qty: '', cost_price: '', price: '', reorderlevel: 0});
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
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnits] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await axios.get('http://localhost:3001/product/liquors');
            const units = await axios.get('http://localhost:3001/settings/unit');
            setUnits(units.data);
            if(units.data && units.data.length > 0 && units.data[0] && units.data[0].name) {
                setLiquorsFormData(prevData => ({ ...prevData, units: units.data[0].name})); 
            }
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
    
    const handleSubmit = async (event) => {
         event.preventDefault();
         try {
            let trimmedFormData = {};
            Object.keys(liquorsFormData).forEach(field => {
                trimmedFormData[field] = typeof liquorsFormData[field] === 'string' ? liquorsFormData[field].trim() : liquorsFormData[field];
            });

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
            else if(Number.isNaN(liquorsFormData.reorderlevel)) {
                props.onError('Reorder Level must be a number');
                return;
            }
            const categoryId = parseInt(props.categoryId, 10);
            trimmedFormData = {...trimmedFormData,category_id: categoryId};
            await axios.post('http://localhost:3001/product/liquors', trimmedFormData);
            setLiquorsFormData({ ...liquorsFormData, name: '', qty: '', cost_price: '', price: '', reorderlevel: 0 });
            setRefresh(!refresh);
         } catch(error) {
            if(error.response.data.message === 'Duplicate entry') {
                props.onError('Duplicate entry found');
            }
            console.log('Error submitting the data: ', error);
         }   
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        name === "units" &&  setSelectedUnits(value);
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
            const updatedSearchResult = searchResult.map((product) => {
                if(product.product_id === updateResult.product_id) {
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
    const displayUnits = units.map((item, index) => <option key={index} value={item.name} >{item.name}</option>);

    return(
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.formRow} >
                    <div>
                        <label htmlFor="name">Name</label> <br/>
                        <input onChange={handleChange} placeholder="Name" value={liquorsFormData.name} id="name" type="text" name="name" required/>
                    </div>

                    <div>
                        <label>Units</label> <br/>
                        <select value={selectedUnit} onChange={handleChange} name="units">
                            <option disabled >--Select--</option>
                            {displayUnits}
                        </select>
                    </div>
                </div>
                <div className={styles.clearfix} />
                <div className={styles.formRow} >
                    <div>
                        <label> Qty </label> <br/>
                        <input onChange={handleChange} placeholder="Qty" value={liquorsFormData.qty} type="text" name="qty" required/>
                    </div>
                    <div>
                        <label>Reorder Level</label> <br/>
                        <input onChange={handleChange}  value={liquorsFormData.reorderlevel} type="text" name="reorderlevel"/>
                    </div>
                </div>
                <div className={styles.clearfix} />
                <div className={styles.formRow} >
                    <div>
                        <label htmlFor="costprice">Cost Price</label> <br/>
                        <input onChange={handleChange} placeholder="Cost Price" value={liquorsFormData.cost_price} id="costprice" type="text" name="cost_price" required/>
                    </div>
                    <div>
                        <label htmlFor="price">Selling Price</label> <br/>
                        <input onChange={handleChange} placeholder="Selling Price" value={liquorsFormData.price} id="price" type="text" name="price" required/>
                    </div>
                </div>
                <div className={styles.clearfix} />
                <div>
                    <input type="submit"/>
                </div>
            </form>
           
            <h1>Products</h1>
            <div className={styles.searchBox}>
                 <input placeholder="Search Products" type="search" name="search" onChange={handleSearch}/>
            </div>
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
                units={units}
                />
        </>
    )
}

export default Liquors;
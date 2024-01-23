import React, {useState, useEffect} from 'react';
import axios from 'axios';
import LiquorsTable from './LiquorsTable';

function Liquors(props) {
    const [liquorsFormData, setLiquorsFormData] = useState({name: '', qty: '', price: ''});
    const [liquors, setLiquors] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [searchToogle, setSearchToogle] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [editId, setEditId] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await axios.get('http://localhost:3001/product/liquors');
            setLiquors(response.data);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [refresh])

    const handleSubmit = async () => {
         try {
            if (liquorsFormData.name === '') {
                props.onError('Please enter a name.');
                return;
            }else if (liquorsFormData.qty === '') {
                props.onError('Please enter a qty.');
                return;
            }else if (liquorsFormData.price === '') {
                props.onError('Please enter a price.');
                return;
            }
            const categoryId = parseInt(props.categoryId, 10);
            const updatedFormData = {...liquorsFormData,category_id: categoryId};
            const response = await axios.post('http://localhost:3001/product/liquors', updatedFormData);
            console.log(response.status);
            setLiquorsFormData({ ...liquorsFormData, name: '', qty: '', price: '' });
            setRefresh(!refresh);
         } catch(error) {
            console.log('Error submitting the data: ', error);
         }   
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'qty' && isNaN(value)) {
            props.onError('"Qty" must be valid number');
        } else if(name === 'price' && isNaN(value)) {
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
        setLiquors(updatedLiquors);
   }
   
   const handleRefresh = () => {
        setRefresh(!refresh);
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
        debouncedSearch(value);
   }
    const displayData = searchToogle ? searchResult : liquors;
    return(
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} value={liquorsFormData.name} style={{width: '200px'}} id="name" type="text" name="name" />
            </div>
            <div>
                 <label> Qty </label>
                 <input onChange={handleChange} value={liquorsFormData.qty} type="text" name="qty"/>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={liquorsFormData.price} id="price" type="text" name="price" />
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div style={{marginTop: '50px'}}><label htmlFor="search">Search: </label><input type="text" name="search" onChange={handleSearch}/></div>
            
            <LiquorsTable liquors={displayData} onDelete={handleDelete} onEdit={handleEdit} id={editId} onLiquorsUpdate={handleLiquorsUpdate} onRefresh={handleRefresh} onError={props.onError}/>
        </>
    )
}

export default Liquors;
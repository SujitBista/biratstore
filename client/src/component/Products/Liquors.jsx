import React, {useState} from 'react';
import axios from 'axios';

function Liquors(props) {
    const [liquorsFormData, setLiquorsFormData] = useState({name: '', qty: '', price: ''});
    const handleSubmit = async () => {
         try {
            if (liquorsFormData.name.trim() === '') {
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
     console.log(liquorsFormData);
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

        </>
    )
}

export default Liquors;
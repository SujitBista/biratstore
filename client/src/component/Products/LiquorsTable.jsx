import React, {useState} from 'react';
import axios from 'axios';

function LiquorsTable(props) {
    const [loading, setLoading] = useState(false);
    const [validationError, setValidationError] = useState('');
    const handleChange = (event) => {
        const {name, value}= event.target;
        const updatedLiquors = props.liquors.map((liquor) => {
            if(liquor.product_id === props.id) {
                let updatedValue = value;
                if(name === 'qty' || name === 'price') {
                    if(updatedValue === '') {
                        updatedValue = '';
                    } else {
                        updatedValue = parseInt(value);
                        if(isNaN(updatedValue)) {
                            updatedValue = '';
                        }
                        setValidationError('');
                    }
                } 
                return {...liquor, [name]: updatedValue};
            } else {
                return liquor;
            }
        });
        props.onLiquorsUpdate(updatedLiquors);
    }

    const handleSave = async () => {
        try {
            const data = props.liquors.find((liquor) => props.id === liquor.product_id);
            if(data.qty === '' || data.price === '') {
                setValidationError('Inavalid data. Please provide both the "Qty" and "Price" before submission.');
                props.onError('');
                return;
            } else if(data.product_name === '') {
                setValidationError('The "Name" field cannot be empty.');
                props.onError('');
                return;
            }
            setLoading(true);
            await axios.put(`http://localhost:3001/product/liquors/${props.id}`, data);
            setLoading(false);
            props.onEdit(0);
            props.onRefresh();
            setValidationError('');
            props.onError('');
          
        } catch (error) {
            console.error('Faild to save data : ', error);
            setLoading(false);
        }
    }
 
    return(
        <>
           {validationError && <span style={{color: 'red'}}>{validationError}</span>}
           <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.liquors && props.liquors.map((liquor) => (
                     liquor.product_id === props.id ? 
                     <tr key={liquor.product_id}>
                        <td><input type="text" name="product_name" value={liquor.product_name} onChange={handleChange}/></td>
                        <td><input type="text" name="qty" value={liquor.qty} onChange={handleChange}/></td>
                        <td><input type="text" name="price" value={liquor.price} onChange={handleChange}/></td>
                        <td><input type="text" value={liquor.qty * liquor.price} readOnly/></td>
                        <td>
                            <button onClick={() => props.onEdit(liquor.product_id)}>Edit</button> 
                            <button onClick={handleSave}>{!loading ? 'Save': 'Loading...'}</button>
                        </td>
                     </tr> :
                      <tr key={liquor.product_id}>
                        <td>{liquor.product_name}</td>
                        <td>{liquor.qty}</td>
                        <td>{liquor.price}</td>
                        <td>{liquor.qty * liquor.price}</td>
                        <td><button onClick={() => props.onEdit(liquor.product_id)}>Edit</button> <button onClick={() => props.onDelete(liquor.product_id)}>Delete</button></td>
                    </tr>))}
                </tbody>
           </table>
        </>
    )
}

export default LiquorsTable;
import React from 'react';

function LiquorsTable(props) {

    const handleChange = (event) => {
        const {name, value}= event.target;
        const updatedLiquors = props.liquors.map((liquor) => {
            if(liquor.product_id === props.id) {
                return {...liquor, [name]: value};
            } else {
                return liquor;
            }
        });
        props.onLiquorsUpdate(updatedLiquors);
    }
 
    return(
        <>
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
                            <button >Save</button>
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
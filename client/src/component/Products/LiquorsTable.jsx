import React from 'react';

function LiquorsTable(props) {
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
                        <td><input type="text" value={liquor.product_name} /></td>
                        <td><input type="text" value={liquor.qty} /></td>
                        <td><input type="text" value={liquor.price} /></td>
                        <td>{liquor.qty * liquor.price}</td>
                        <td>
                            <button onClick={() => props.onEdit(liquor.product_id)}>Edit</button> 
                            {!props.id && <button onClick={() => props.onDelete(liquor.product_id)}>Delete</button>}
                            <button>Save</button>
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
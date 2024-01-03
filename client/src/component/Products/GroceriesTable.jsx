import React from 'react';

function GroceriesTable() {
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
                    <tr>
                        <td>Dal</td>
                        <td>100kg</td>
                        <td>100</td>
                        <td>{100 * 10}</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>Rice</td>
                        <td>20kg</td>
                        <td>500</td>
                        <td>{500 * 20}</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>Chana</td>
                        <td>5kg</td>
                        <td>150</td>
                        <td>{150 * 20}</td>
                        <td>Edit | Delete</td>
                    </tr>
                </tbody>
           </table>
        </>
    )
}

export default GroceriesTable;
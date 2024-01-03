import React from 'react';

function LiquorsTable() {
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
                        <td>Ruslan Vodka 500 ml</td>
                        <td>10</td>
                        <td>400</td>
                        <td>{400 * 10}</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>Ruslan Vodka 500 ml</td>
                        <td>20</td>
                        <td>500</td>
                        <td>{500 * 20}</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>Ruslan Vodka 500 ml</td>
                        <td>20</td>
                        <td>500</td>
                        <td>{500 * 20}</td>
                        <td>Edit | Delete</td>
                    </tr>
                </tbody>
           </table>
        </>
    )
}

export default LiquorsTable;
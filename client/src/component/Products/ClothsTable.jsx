import React from 'react';

function ClothsTable() {
    return(
        <>
           <table style={{marginTop: '20px'}}>
                <thead>
                    <tr>    
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cloth A</td>
                        <td>10</td>
                        <td>100</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>Cloth B</td>
                        <td>10</td>
                        <td>100</td>
                        <td>Edit | Delete</td>
                    </tr>
                    <tr>
                        <td>Cloth C</td>
                        <td>10</td>
                        <td>100</td>
                        <td>Edit | Delete</td>
                    </tr>
                </tbody>
           </table>
        </>
    )
}

export default ClothsTable;
import React from 'react';

function Cloths() {
    return(
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" />
            </div>
            <div>
                <label htmlFor="qty">Qty</label>
                <input id="qty" type="text" name="qty" />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input id="price" type="text" name="price" />
            </div>
            <div>
                <button>Submit</button>
            </div>   
        </>
    )
}

export default Cloths;
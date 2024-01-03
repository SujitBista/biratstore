import React from 'react';

function Cosmetics() {
    return(
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" name="name" />
            </div>
            <div>
            <label>Unit </label>
            <select>
                <option>--Select--</option>
                <option>Kg</option>
                <option>ml</option>
                <option>Gram</option>
                <option>Cartoon</option>
                <option>Packet</option>
                <option>Dozen</option>
            </select>
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

export default Cosmetics;
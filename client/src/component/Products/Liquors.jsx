import React, {useState} from 'react';

function Liquors() {
    const [liquorsFormData, setLiquorsFormData] = useState({name: '', qty: 0, price: 0});
    return(
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input style={{width: '200px'}} id="name" type="text" name="name" />
            </div>
            <div>
                 <label> Qty </label>
                 <input type="text" name="qty"/>
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

export default Liquors;
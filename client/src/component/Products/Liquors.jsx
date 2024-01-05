import React, {useState} from 'react';

function Liquors(props) {
    const [liquorsFormData, setLiquorsFormData] = useState({});
    const handleSubmit = () => {
         setLiquorsFormData((prevData) => ({...prevData,category_id: props.categoryId}));
         setLiquorsFormData((prevData) => {
            if(prevData.category_id !== null) {
                console.log(liquorsFormData);
            }
         })
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setLiquorsFormData({...liquorsFormData, [name]: value});
    }

    return(
        <>
            <div>
                <label htmlFor="name">Name</label>
                <input onChange={handleChange} style={{width: '200px'}} id="name" type="text" name="name" />
            </div>
            <div>
                 <label> Qty </label>
                 <input onChange={handleChange} type="text" name="qty"/>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input onChange={handleChange} id="price" type="text" name="price" />
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </>
    )
}

export default Liquors;
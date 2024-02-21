import React,{useState} from 'react';
import axios from 'axios';

function Units() {
    const [error, setError] = useState('');
    const [popup, setPopUp] = useState(false);
    const [formData, setFormData] = useState({name: ''});

    const handleAddUnit = () => {
        setPopUp(true);
     }
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
     }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:3001/settings/unit', formData);
            setFormData({...formData, value: ''});
            console.log("form submitted successfully");
        } catch(error) {
            if(error.response) {
                setError(error.response.data);
                console.log('Server Error', error.response.data); 
                console.log('Status Code', error.response.status);  
                console.log('Response Headers', error.response.headers); 
            } else if(error.request) {
                console.log('No response received from the server:', error.request);
            } else {
                console.log('Error:', error.message);
            }
            console.log('Error: ' + JSON.stringify(error.config));
        }
    }
    console.log(formData);
    return (
        <div>
            {error && <div className="error-message">{error.message}</div>}
            <button onClick={handleAddUnit}>Add Unit</button>
            {popup && 
                <form onSubmit={handleSubmit}>
                    <div><input placeholder="Name" value={formData.value} type="text" name="name" onChange={handleChange}/></div>
                    {/* <div>
                        <select name="base_unit" onChange={handleChange}>
                            <option>Kg</option>
                            <option>Carton</option>
                        </select>
                    </div> */}
                    <button type="submit">Submit</button>
                </form>}
        </div>
    )
}

export default Units;
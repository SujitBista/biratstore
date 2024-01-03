import React, {useState, useEffect} from 'react';
const itemsPerPage = 5;

function Category() {
  // const [categoryName, setCategoryName] = useState('');
   const [formData, setFormData] = useState({name: ''});
   const [categories, setCategories] = useState([]);
   const [originalCategories, setOriginalCategories] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [categoryId, setCategoryId] = useState(0);
   const [reFresh, setRefresh] = useState(false);
   // Calculate the index range for the current page
   const startIndex = (currentPage - 1) * itemsPerPage;
   const endIndex = startIndex + itemsPerPage;
   const currentItems = categories.slice(startIndex, endIndex);
   const totalPages = Math.ceil(categories.length / itemsPerPage);

   useEffect(() => {
    const fetchData = async () => {
        try {
            const url = 'http://localhost:3001/categories';
            const response = await fetch(url);
            console.log('Response: ', response);
            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json(); //it converts json string send by server to a javascript object
            setCategories(data);
            setOriginalCategories(data);
            setRefresh(false);
        }
        catch(error) {
            console.error('Error fetching data: ', error.message);
            alert('Opps! Something went wrong. Please try agian later.');
        }
    }
    fetchData();
    }, [reFresh]);

   const handleSearch = (event) => {
        const { value } = event.target;
        if (value) {
            let matchedData = categories.filter((category) => category.name.toLowerCase().includes(value.toLowerCase()));
            if(matchedData.length !== 0) {
                setCategories(matchedData);
            }
            if(event.nativeEvent.inputType === 'deleteContentBackward') {
                setCategories(originalCategories.filter(category => category.name.toLowerCase().includes(value.toLowerCase())));
            }
        } else {
            setRefresh(true);
        }
    }
      
   const handlePageChange = (page) => {
        setCurrentPage(page);
   }

   const handleChange = (event) => {
        const {name, value} = event.target;
        //setFormData({...formData, [name]: value});
        setFormData(prevState => ({...prevState, [name]: value}));
   }

    const calculateCount = (index) => {
        // Calculate the count based on the current page and the index of the item
        return (currentPage - 1) * itemsPerPage + index + 1;
    }

   const handleInputChange = (event) => {
        const updatedCategories = categories.map((category) => {
            if(category.id === categoryId) {
                return {...category, name: event.target.value};
            } else {
                return category;
            }
        });
        setCategories(updatedCategories);
   }

   const handleSaveItems = async () => {
      try {
        if(categoryId === 0) {
            return;
        }
        const category = categories.find(category => category.id === categoryId);
        const response = await fetch(`http://localhost:3001/categories/${categoryId}`, {
           method: 'PUT',
           headers: {
                'Content-Type': 'application/json',
           },
           body: JSON.stringify(category),
        });
        if(!response.ok) {
            throw new Error(`Http Error! Status: ${response.status}`);
        } 
        setCategoryId(0);
     } catch(error) {
         console.log('Error :', error.message);
        
     }
   }

   const handleClick = (categoryId) => {
       setCategoryId(categoryId);
   }

   const handleDelete = async (categoryId) => {
        const bolValue = window.confirm('Are you sure you want to delete?');
        if(!bolValue) {
            return;
        }
        try {
            const category = categories.find((category) => category.id === categoryId);
            const response = await fetch(`http://localhost:3001/categories/${categoryId}`, {
                method: 'DELETE',
                headers: {
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify(category),
             });
             if(!response.ok) {
                 throw new Error(`Http Error! Status: ${response.status}`);
             } else {
                //if every item of current page is delted then show previous page
               let previousPage;
               if(currentItems.length === 1) {
                    previousPage = currentPage - 1;
                    if(previousPage > 0) {
                        setCurrentPage(previousPage);
                        setRefresh(true);
                    }  else {
                        setRefresh(true);
                   }
               } else {
                    setRefresh(true);
               }
             }
        } catch(error) {
            console.log('Error message: ' , error);
            alert('Opps something went wrong. Please try it later');
        }
   }

   const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://localhost:3001/categories';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            } else {
                return res.json(); // parses JSON response (response body(response body must be JSON object inorder to parse it correctly) sent by server) sent by server and converts it into javascript object
            }
        }).then(data => {
             setRefresh(true);
             if(data.message){
                window.alert(data.message);
                setFormData({name: ''});
             } else {
                console.log('Successfully inserted data', data);
             }      
        }).catch(error => {
            console.log('Error message: ' , error);
            alert('Opps something went wrong. Please try it later');
        });

    }

    // console.log(categories);
    return(
        <>
            <div>
            <h1>Add Category</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name <input type="text" name="name" value={formData.name} onChange={handleChange}/>
                    </label>
                    <button>Submit</button>
                </form>
            </div>   
            <div>
                <br />
                <label htmlFor="search">Search: </label><input type="text" name="search" onChange={handleSearch}/>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                            categories.length === 0 ? <tr><td>Categories is empty</td></tr> :
                            currentItems.map((category, index) => {
                                if(category.id !== categoryId) {
                                    return (
                                        <tr key={index}>
                                            <td>{calculateCount(index)}</td>
                                            <td>{category.name}</td>
                                            <td>
                                                <button onClick={() => {handleClick(category.id)}}>Edit</button>
                                                <button onClick={() => {handleDelete(category.id)}}>Delete</button>
                                            </td>
                                        </tr>
                                    )
                                } else {
                                    return (
                                        <tr key={index}>
                                            <td>{calculateCount(index)}</td>
                                            <td> <input type="text" value={category.name} onChange={handleInputChange}/> </td>
                                            <td>
                                                <button onClick={ () => {handleClick(category.id)}}>Edit</button>
                                                { categoryId ? '' : <button onClick={() => {handleDelete(category.id)}}>Delete</button>}
                                                <button onClick={handleSaveItems}>Save</button>
                                            </td>
                                        </tr>
                                    )
                                }
                                })
                            }                  
                    </tbody>
                </table>
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                                <button key={index} onClick={() => handlePageChange(index + 1)}>
                                    {index + 1}
                                </button>
                            ))}
                </div>
            </div> 
           
        </>
    )
}

export default Category;
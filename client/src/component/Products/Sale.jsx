import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Sale() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState('pieces');
    const [addToCart, setAddToCart] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await axios.get('http://localhost:3001/product/liquors');
            const result = response.data;
             setProducts(result);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }, [refresh]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        if(searchTerm) {
        const filteredOptions = products.filter((product) =>
          product.product_name.toLowerCase().includes(searchTerm)
        );
        setFilteredProducts(filteredOptions);
        setSelectedProductId('');
        }else {
            setFilteredProducts([]);
        }
      };

    const handleSelectChange = (event) => {
        const {value} = event.target;
        setSelectedProductId(value);
      }

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const handleAddToCart = (event,productId) => {
        let updatedItem;
        let sameProductFound = false;
        event.preventDefault();
        const id = parseInt(productId);
        //from the list of products find the specific item that is matched
        let item = products.find(product => product.product_id === id);
        const updatedCartItems = addToCart.map((cartProduct) => {
            if(item.product_id === cartProduct.product_id) {
                sameProductFound = true;
                return {...item, qty: cartProduct.qty + quantity, updatedPrice: item.price * (cartProduct.qty + quantity)}
            }
            return cartProduct;
        })
        if(sameProductFound) {
            setAddToCart(updatedCartItems);
        } else {
              //const matched = addToCart.find(cartItem => cartItem.product_id === productId);
            updatedItem = {...item, updatedPrice: item.price * quantity, qty: quantity};
            setAddToCart([...addToCart, updatedItem]);
        }
        
    }
    
    const calculateTotalPrice = () => {
        let total = 0;
        addToCart.forEach(item => total+= parseInt(item.updatedPrice));
        return total;
    }

    const handleCheckOut = async () => {
        try {
            const patchRequest = addToCart.map((item) => {
                const matchedProduct = products.find(product => product.product_id === item.product_id);
                console.log(matchedProduct);
                if(matchedProduct) {
                    const updatedQty = matchedProduct.qty - item.qty;
                    return axios.patch('http://localhost:3001/api/checkout', {
                        product_id: matchedProduct.product_id,
                        qty: updatedQty
                    });
                } else {
                    console.log(`Product with ID ${item.product_id} not found.`);
                    return Promise.resolve();
                }
            });
            await Promise.all(patchRequest);
            setAddToCart([]);
            setRefresh(!refresh);
        } catch(error) {
            console.log(error);
        }
    }
    
    return (
        <>
            <h1>Add Sale</h1>
            <div>
                <input
                    type="text"
                    placeholder="Product Search"
                    onChange={handleSearch}
                />
                <select value={selectedProductId} onChange={handleSelectChange}>
                    <option value="" disabled> Select a Product</option>
                    {filteredProducts.map((filteredProduct, index) => (
                        <option key={index} value={filteredProduct.product_id}>
                            {filteredProduct.product_name}
                        </option>
                    ))}
                </select>
            </div>  
            {selectedProductId && (
                <form onSubmit={(event) => handleAddToCart(event, selectedProductId)}>
                    <div>
                        <label htmlFor="unit">Unit:</label>
                        <select
                            id="unit"
                            name="unit"
                            value={unit}
                            onChange={handleUnitChange}
                        >
                            <option value="carton">Carton</option>
                            <option value="pieces">Pieces</option>
                        </select>
                        <label htmlFor="quantity">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button type="submit">Add to Cart</button>
                </form>
            )}
            {addToCart.length > 0 && <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Unit Price</th>
                        <th>Price</th>
                        <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                 {addToCart.map(cart => (
                    <tr key={cart.product_id}>
                        <td>{cart.product_name}</td>
                        <td>{cart.qty}</td>
                        <td>{cart.price}</td>
                        <td>{cart.updatedPrice}</td>
                        <td>pieces</td>
                    </tr>
                 ))}
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{calculateTotalPrice() !== 0 ? `Total: ${calculateTotalPrice()}`: ''}</td>
                        <td></td>
                    </tr>
                    <tr></tr>
                   <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <button onClick={handleCheckOut} style={{background: 'green', color: 'white', borderRadius: '25px'}}>Buy Now</button>
                    </tr>
                </tbody>
            </table>
            }
        </>
    )
}

export default Sale;

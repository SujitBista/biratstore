import {React, useState} from 'react';
import Dashboard from './Dashboard';

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    function handleSubmit(event) {
        event.preventDefault();
        //send a fetch request to a backend server for getting username and password //this apporach is bad
        const url = '/api/authentication';
        const credentials = {
            userName: userName,
            password: password
        };

        // send a fetch request along with username and password for authentication check
        // and based on authentication failed or success boolean value of true and false is returned

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then(res => {
            if(!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`)
            } else {
                return res.json();
            }
        }).then(data => {
            //console.log('Response from server:', data);
            setIsAuthenticated(data);
        }).catch(error => {
            console.log('Error message: ' , error);
        });
    }

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <>
        {isAuthenticated ? <Dashboard />: 
            <>
                <h1>Sign in</h1>
                <form onSubmit={handleSubmit}>
                <label forname="userName">Username</label>
                <input id="userName" type="text" onChange={handleUserNameChange}/>
                <input id="passWord" type="password" onChange={handlePasswordChange} />
                <button>Submit</button>
                </form>
             </>
        }
        </>
    )
}

export default Login;
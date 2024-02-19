import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBell} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';

function Header() {
    const [notify, setNotify] = useState(false);
    let stocks = ['Ruslan vodak is out of stock qty is 5 ', 
    'Some other is out of stock qty is 4','Ruslan vodak is out of stock qty is 5 ', 
    'Some other is out of stock qty is 4','Ruslan vodak is out of stock qty is 5 ', 'Some other is out of stock qty is 4'
    ];

    const notifications = stocks.map((stock, index) => {
        return <div key={index}>{stock}</div>
    });
    const handleNotifications = () => {
        setNotify(!notify);
    }   
    return(
        <>
            <div className={styles.headerlayout}>
                <div className={styles.logo}>
                    <h1>Birat Multistore</h1>
                </div>
                <div className={styles.bellIcon}><FontAwesomeIcon icon={faBell} onClick={handleNotifications}/></div>
                {notify &&
                <div className={styles.notifications}>
                    <div className={styles.notification}>
                        {notifications}
                    </div>
                </div> }
            </div>
        </>
    )
}

export default Header;
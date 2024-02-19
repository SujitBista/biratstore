import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import MainContent from './MainContent';
//import Footer from './Footer';
import Category from './Products/category';
import Product from './Products/Product';
import Sale from './Products/Sale';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [selectedLink, setSelectedLink] = useState('');
    const location = useLocation();
    const arrayOfSplitedPath = location.pathname.split('/');
    let lastElement = arrayOfSplitedPath[arrayOfSplitedPath.length - 1].toUpperCase();

    useEffect(() => {
        setSelectedLink(lastElement);
    }, [lastElement]);

    const renderMainContent = () => {
        switch(selectedLink) {
            case 'CATEGORY':   
                return <Category />
            case 'PRODUCT':
                return <Product />
            case 'SALE':
                return <Sale />
            default:
                return null;
        }
    }
    const heading = selectedLink !== 'Sale' && <Header />;
    return(
       <>
            {heading}
            <div className={styles.layout}>
                <SideBar />
                <main>
                    <MainContent childContent={renderMainContent} /> 
                </main>
            </div>
       </>
    )
}

export default Dashboard;
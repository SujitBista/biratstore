import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Header from './Header';
import SideBar from './SideBar';
import MainContent from './MainContent';
//import Footer from './Footer';
import Category from './Products/category';
import Product from './Products/Product';
import Sale from './Products/Sale';
import Units from './Settings/Units';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [selectedLink, setSelectedLink] = useState('');
    const [liquorsRefresh, setLiquorsRefresh] = useState(false);
    const location = useLocation();
    const arrayOfSplitedPath = location.pathname.split('/');
    let lastElement = arrayOfSplitedPath[arrayOfSplitedPath.length - 1].toUpperCase();

    useEffect(() => {
        setSelectedLink(lastElement);
    }, [lastElement]);

    const handleLiquorsRefresh = () => {
        setLiquorsRefresh(true);
    }

    const renderMainContent = () => {
        switch(selectedLink) {
            case 'CATEGORY':   
                return <Category />
            case 'PRODUCT':
                return <Product passToLiquors={liquorsRefresh}/>
            case 'SALE':
                return <Sale />
            case 'UNITS':
                return <Units onLiquorsRefresh={handleLiquorsRefresh}/>
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
                <main className={styles.mainContent}>
                    <MainContent childContent={renderMainContent} /> 
                </main>
            </div>
       </>
    )
}

export default Dashboard;
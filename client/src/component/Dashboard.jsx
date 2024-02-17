import React, {useState} from 'react';
//import Header from './Header';
import SideBar from './SideBar';
import MainContent from './MainContent';
//import Footer from './Footer';
import Category from './Products/category';
import Product from './Products/Product';
import Sale from './Products/Sale';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [selectedLink, setSelectedLink] = useState('');

    const handleSidebarLinkClick = (link) => {
        setSelectedLink(link);
    }

    const renderMainContent = () => {
        switch(selectedLink) {
            case 'Category':   
                return <Category />
            case 'Product':
                return <Product />
            case 'Sale':
                return <Sale />
            default:
                return null;
        }
    }

    return(
       <>
            <div className={styles.layout}>
                <SideBar onLinkClick={handleSidebarLinkClick}/>
                <main>
                    <MainContent childContent={renderMainContent} /> 
                </main>
            </div>
       </>
    )
}

export default Dashboard;
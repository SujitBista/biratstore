import React, {useState} from 'react';
//import Header from './Header';
import SideBar from './SideBar';
import MainContent from './MainContent';
//import Footer from './Footer';
import Category from './Products/category';
import Product from './Products/Product';

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
            default:
                return null;
        }
    }

    return(
       <>
        {/* <h1>Dash Board</h1>
         <Header /> */}
         <SideBar onLinkClick={handleSidebarLinkClick}/>
         <MainContent childContent={renderMainContent} /> 
         {/* <Footer /> */}
       </>
    )
}

export default Dashboard;
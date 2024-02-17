import React from 'react';
import {Link} from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar({onLinkClick}) {

    return(
        <div className={styles.sidebar}>
           {/* <h1>Side Bar</h1>  */}
           <nav>
                <ul>
                    <li><Link to="/products/category" title="Category" onClick={function handleClick() { onLinkClick('Category') }}>Category</Link></li>
                    <li><Link to="/products/product"  title="Product"  onClick={function handleClick() { onLinkClick('Product') }}>Product</Link></li>
                    <li><Link to="/products/sale" title="Sale" onClick={function handleClick() { onLinkClick('Sale') }}>Sale</Link></li>
                </ul>
           </nav>
        </div>
    )
}

export default SideBar;
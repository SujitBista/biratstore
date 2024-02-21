import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './SideBar.module.css';

function SideBar() {
    const [dropDown, setDropDown] = useState(false);
    const handleSettings = () => {
        setDropDown(!dropDown);
    }

    return(
        <div className={styles.sidebar}>
           {/* <h1>Side Bar</h1>  */}
           <nav>
                <ul>
                    <li><Link to="/products/category" title="Category">Category</Link></li>
                    <li><Link to="/products/product"  title="Product">Product</Link></li>
                    <li><Link to="/products/sale" title="Sale">Sale</Link></li>
                    <li>
                     <div onClick={handleSettings}>Settings</div>
                            {dropDown && <div className={styles.dropdown}>
                                <ul>
                                    <li>
                                        <Link to="/settings/units">Units</Link>
                                    </li>
                                </ul>
                             </div>
                            }
                    </li>
                </ul>
           </nav>
        </div>
    )
}

export default SideBar;
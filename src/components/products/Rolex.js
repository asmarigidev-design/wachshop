import React, { useEffect, useState, useRef } from 'react';  
import { useCart } from '../shopping-cart/CartContext'; // استفاده از context برای سبد خرید | Using context for cart
import Card from "../shopping-cart/Card";  
import Products from "./Products";  
import data from './data.json';  
import { FaHome} from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Rolex() {  
    const [item, setItem] = useState(data.products);  // لیست محصولات | Product list
    const [sort, setSort] = useState("asc");  // وضعیت مرتب‌سازی | Sorting state
    const [brand, setBrand] = useState("");  // فیلتر برند | Brand filter

    const { cartItems, addProducts, removeProducts } = useCart(); // دسترسی به آیتم‌های سبد خرید | Access cart items

    const topRef = useRef(null); // مرجع برای اسکرول به بالا | Ref for scroll-to-top

    useEffect(() => {  
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' }); // اسکرول نرم به ابتدای صفحه | Smooth scroll to top
        }
    }, []);

    const sortProducts = (event) => {  
        const newSort = event.target.value;  
        setSort(newSort);
    const sortedItems = [...item];
    sortedItems.sort((a, b) => 
        (newSort || sort) === "asc" ? a.id - b.id : b.id - a.id
    );
    setItem(sortedItems);
};


    const filterProducts = (event) => {  
        const selectedBrand = event.target.value;  
        setBrand(selectedBrand);  
        if (selectedBrand === "") {  
            setItem(data.products);  // نمایش همه محصولات | Show all products
        } else {  
            setItem(data.products.filter((product) => product.availableBrand.includes(selectedBrand)));  // فیلتر بر اساس برند | Filter by brand
        }  
    };  

    return (  
        <div className="container">  
            <header ref={topRef}> {/* مرجع برای اسکرول به بالا | Scroll-to-top ref */}
                <Link to="/"> <FaHome /></Link> {/* آیکون خانه برای بازگشت | Home icon for navigation */}
                <div class="logo">Adak</div>
            </header>  
            <main>  
                <div className="content">  
                    <div className="main">  
                        <div className="filter">  
                            <div className="result">  
                                تعداد محصولات: {item.length} {/* نمایش تعداد محصولات | Show product count */}
                            </div>  
                            <div className="sort">  
                                {/* گزینه‌های مرتب‌سازی | Sorting options */}
                                <div className="form-checkbox">  
                                    <div className="form-group">  
                                        <input type="radio" value="asc" name="radiovalues" onChange={sortProducts} />  
                                        <label> جدیدترین محصولات </label>  
                                    </div>  
                                    <div className="form-group">  
                                        <input type="radio" value="desc" name="radiovalues" onChange={sortProducts} />  
                                        <label>قدیمی ترین محصولات </label>  
                                    </div>  
                                </div>  
                            </div>  
                            <div className="brandha">  
                                {/* فیلتر برند | Brand filter */}
                                <label>محصولات</label>  
                                <select value={brand} onChange={filterProducts}>  
                                    <option value=""> همه ی محصولات </option>  
                                    <option value="Rolexm">رولکس مردانه</option>  
                                    <option value="Rolexw">رولکس زنانه</option>  
                                    <option value="Rolexs">ست رولکس</option>  
                                </select>  
                            </div>  
                        </div>  
                        <Products item={item} addProducts={addProducts} /> {/* نمایش محصولات | Display products */}
                    </div>  
                    <div className="sidebarr">  
                        <Card cartItems={cartItems} removeProducts={removeProducts} /> {/* نمایش سبد خرید | Display cart */}
                    </div>  
                </div>  
            </main>  
        </div>  
    );  
}  

export default Rolex;

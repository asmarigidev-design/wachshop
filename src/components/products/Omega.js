import React, { useState, useRef, useEffect } from 'react';  
import Card from "../shopping-cart/Card";  
import Products from "./Products";  
import data from './data.json';  
import { useCart } from '../shopping-cart/CartContext'; // استفاده از Context برای مدیریت سبد خرید // Cart context for managing cart state
import { FaHome} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // استفاده از Link برای جلوگیری از بارگذاری مجدد صفحه // Use Link to prevent full page reload

function Omega() {  
    const [item, setItem] = useState(data.productssss || []);  // بارگذاری اولیه محصولات از فایل JSON // Initial product load from JSON
    const [sort, setSort] = useState("asc");  // وضعیت مرتب‌سازی محصولات // Product sorting state
    const [brand, setBrand] = useState("");  // فیلتر برند انتخاب‌شده // Selected brand filter
    const { cartItems, addProducts, removeProducts } = useCart(); // دسترسی به سبد خرید از طریق Context // Access cart via context

    const topRef = useRef(null); // مرجع برای اسکرول به بالا // Ref for scrolling to top

    useEffect(() => {  
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' }); // اسکرول نرم به ابتدای صفحه هنگام بارگذاری // Smooth scroll to top on load
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
            setItem(data.productssss || []);  // نمایش همه محصولات در صورت انتخاب خالی // Show all products if no brand selected
        } else {  
            setItem(data.productssss.filter(product => product.availableBrand && product.availableBrand.includes(selectedBrand)));  // فیلتر محصولات بر اساس برند // Filter products by brand
        }  
    };  

    return (  
        <div className="container">  
            <header ref={topRef}> {/* مرجع برای اسکرول به بالا */}
                <Link to="/"> <FaHome /></Link> {/* استفاده از Link برای جلوگیری از ری‌لود شدن صفحه // Use Link to avoid page reload */}
                <div class="logo">
                    Adak
                </div>
            </header>  
            <main>  
                <div className="content">  
                    <div className="main">  
                        <div className="filter">  
                            <div className="result">  
                                تعداد محصولات: {item.length}  {/* نمایش تعداد محصولات فیلتر شده // Show filtered product count */}
                            </div>  
                            <div className="sort">  
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
                                <label>محصولات</label>  
                                <select value={brand} onChange={filterProducts}>  
                                    <option value=""> همه ی  محصولات </option>  
                                    <option value="Omegam">امگا مردانه</option>  
                                    <option value="Omegaw">امگا زنانه</option>  
                                    <option value="Omegas">ست امگا</option>  
                                </select>  
                            </div>  
                        </div>  
                        <Products item={item} addProducts={addProducts} /> {/* کامپوننت محصولات با قابلیت افزودن به سبد خرید // Products component with add-to-cart */}
                    </div>  
                    <div className="sidebarr">  
                        <Card cartItems={cartItems} removeProducts={removeProducts} /> {/* کامپوننت سبد خرید با قابلیت حذف محصول // Cart component with remove functionality */}
                    </div>  
                </div>  
            </main>    
        </div>  
    );  
}  

export default Omega;

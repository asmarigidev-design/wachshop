import React, { useEffect, useState, useRef } from 'react'; // ایمپورت ری‌اکت و هوک‌ها برای مدیریت وضعیت و افکت‌ها // Importing React and hooks for state and effects
import Card from "../shopping-cart/Card"; // کامپوننت کارت خرید برای نمایش آیتم‌های سبد خرید // Cart component to show items in cart
import Products from "./Products"; // کامپوننت محصولات برای نمایش لیست کالاها // Products component to display product list
import data from './data.json'; // داده‌های محصولات از فایل JSON // Product data from JSON file
import { useCart } from '../shopping-cart/CartContext'; // استفاده از Context برای مدیریت سبد خرید // Using Context for cart management
import { FaHome } from 'react-icons/fa'; // آیکون خانه برای بازگشت به صفحه اصلی // Home icon for navigation
import { Link } from 'react-router-dom';

function Cacio() {
    const [item, setItem] = useState(data.productss || []); // بارگذاری اولیه محصولات از JSON // Initial product load from JSON
    const topRef = useRef(null); // مرجع برای اسکرول به ابتدای صفحه // Ref to scroll to top of page

    useEffect(() => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' }); // اسکرول نرم به بالا هنگام بارگذاری // Smooth scroll to top on mount
        }
    }, []);

   const [sort, setSort] = useState("asc"); // وضعیت مرتب‌سازی محصولات // Product sorting state
const [brand, setBrand] = useState(""); // وضعیت فیلتر برند انتخاب‌شده // Selected brand filter state
const { cartItems, addProducts, removeProducts } = useCart(); // دسترسی به آیتم‌های سبد خرید و توابع افزودن/حذف // Access to cart items and add/remove functions

const sortProducts = (event) => { // تابع مرتب‌سازی بر اساس شناسه محصول // Sorting function by product ID
    const newSort = event.target.value;
    setSort(newSort);
    const sortedItems = [...item];
    sortedItems.sort((a, b) => 
        (newSort || sort) === "asc" ? a.id - b.id : b.id - a.id
    );
    setItem(sortedItems);
};


    const filterProducts = (event) => { // فیلتر محصولات بر اساس برند انتخاب‌شده // Filter products by selected brand
        const selectedBrand = event.target.value;
        setBrand(selectedBrand);
        if (selectedBrand === "") {
            setItem(data.productss || []); // نمایش همه محصولات در صورت عدم انتخاب برند // Show all products if no brand selected
        } else {
            setItem(data.productss.filter(product =>
                product.availableBrand && product.availableBrand.includes(selectedBrand)
            ));
        }
    };

    return (
        <div className="container"> {/* کانتینر اصلی صفحه محصولات // Main container for product page */}
            <header div className="homeicon" ref={topRef}> {/* هدر با آیکون خانه و لوگو // Header with home icon and logo */}
<Link to="/"> <FaHome /></Link>                    <div class="logo">Adak</div>
            </header>

            <main>
                <div className="content"> {/* بخش محتوا شامل فیلترها، محصولات و سایدبار // Content section with filters, products, and sidebar */}
                    <div className="main">
                        <div className="filter"> {/* فیلترهای مرتب‌سازی و برند // Sorting and brand filters */}
                            <div className="result">
                                تعداد محصولات: {item.length} {/* نمایش تعداد محصولات // Display number of products */}
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
                                <select value={brand} onChange={filterProducts}> {/* انتخاب برند برای فیلتر کردن محصولات // Brand selection for filtering */}
                                    <option value=""> همه ی  محصولات </option>
                                    <option value="Caciom">کاسیو مردانه</option>
                                    <option value="Caciow">کاسیو زنانه</option>
                                    <option value="Cacios">ست کاسیو</option>
                                </select>
                            </div>
                        </div>

                        <Products item={item} addProducts={addProducts} /> {/* نمایش محصولات با قابلیت افزودن به سبد خرید // Display products with add-to-cart functionality */}
                    </div>

                    <div className="sidebarr">
                        <Card cartItems={cartItems} removeProducts={removeProducts} /> {/* نمایش سبد خرید با قابلیت حذف آیتم‌ها // Display cart with item removal */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Cacio; 
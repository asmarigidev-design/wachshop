import React, { createContext, useContext, useState } from 'react';  

// ایجاد Context برای مدیریت سبد خرید | Create cart context
const CartContext = createContext();  

// فراهم کردن Context برای استفاده در سایر کامپوننت‌ها | Provide context to children
export const CartProvider = ({ children }) => {  
    const [cartItems, setCartItems] = useState([]); // وضعیت سبد خرید | Cart state

    // افزودن محصول به سبد | Add product to cart
    const addProducts = (product) => {  
        const exist = cartItems.find((item) => item.id === product.id);  
        if (exist) {  
            // اگر محصول وجود دارد، فقط تعداد را افزایش بده | Increase quantity if exists
            setCartItems(cartItems.map((item) =>  
                item.id === product.id ? { ...exist, qty: exist.qty + 1 } : item  
            ));  
        } else {  
            // اگر محصول جدید است، اضافه کن با تعداد ۱ | Add new product with qty 1
            setCartItems([...cartItems, { ...product, qty: 1 }]);  
        }  
    };  

    // حذف محصول از سبد | Remove product from cart
    const removeProducts = (product) => {  
        const exist = cartItems.find((item) => item.id === product.id);  
        if (exist.qty === 1) {  
            // اگر فقط یک عدد باقی مانده، حذف کامل شود | Remove item completely
            setCartItems(cartItems.filter((item) => item.id !== product.id));  
        } else {  
            // در غیر این صورت، تعداد را کاهش بده | Decrease quantity
            setCartItems(cartItems.map((item) =>  
                item.id === product.id ? { ...exist, qty: exist.qty - 1 } : item  
            ));  
        }  
    };  

    return (  
        <CartContext.Provider value={{ cartItems, addProducts, removeProducts }}>  
            {children} {/* ارسال داده‌ها به کامپوننت‌های فرزند | Pass context to children */}
        </CartContext.Provider>  
    );  
};  

// هوک برای استفاده از Context در کامپوننت‌ها | Custom hook to use cart context
export const useCart = () => {  
    return useContext(CartContext);  
};

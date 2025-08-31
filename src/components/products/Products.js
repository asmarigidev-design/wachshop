import React from 'react'
import formatCurrency from '../shopping-cart/util'; // قالب‌بندی قیمت | Format price
import Fade from 'react-reveal/Fade'; // افکت انیمیشن برای نمایش محصولات | Animation effect for product display

function Products(props) {
     return (
          <div>
             <Fade bottom cascade> {/* افکت نمایشی هنگام بارگذاری لیست | Entry animation for product list */}
               <ul className="products">
                    {
                         props.item.map((item) =>
                              <li key={item.id}> {/* کلید یکتا برای هر محصول | Unique key for each product */}
                                   <div className="product">
                                        <img src={item.image} alt="" /> {/* تصویر محصول | Product image */}
                                        <p>{item.title}</p> {/* عنوان محصول | Product title */}
                                        <div className="product-price">
                                             {/* دکمه افزودن به سبد خرید | Add to cart button */}
                                             <button onClick={() => props.addProducts(item)}>افزودن به سبدخرید</button>
                                             {/* نمایش قیمت با قالب مناسب | Display formatted price */}
                                             <div className="price">{formatCurrency(item.price)}</div>
                                        </div>
                                   </div>
                              </li>
                         )
                    }
               </ul>
            </Fade>
          </div>
     )
}

export default Products

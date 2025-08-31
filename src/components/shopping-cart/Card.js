import React from 'react'
import formatCurrency from './util'; // قالب‌بندی قیمت | Format price
import Fade from 'react-reveal/Fade'; // افکت نمایشی برای آیتم‌ها | Animation effect for items

function Card(props) {
  const { cartItems, removeProducts } = props;

  // محاسبه مجموع قیمت آیتم‌ها | Calculate total price
  const itemPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const totalPrice = itemPrice;

  return (
    <>
      {
        // نمایش پیام خالی بودن یا تعداد محصولات | Show empty message or item count
        cartItems.length === 0 ?
          <div className="empty-price">سبدخرید خالی است</div> :
          <div className="show-price">شما {cartItems.length} محصول در سبدخرید دارید</div>
      }

      <div className="card-item">
        {
          // نمایش هر آیتم در سبد خرید | Render each cart item
          cartItems.map((item) =>
            <Fade left> {/* افکت ورود از چپ | Entry animation from left */}
              <div className="product-item" key={item.id}>
                <div className="product-detail">
                  <img src={item.image} alt="" /> {/* تصویر محصول | Product image */}
                  <h2>{item.title}</h2> {/* عنوان محصول | Product title */}
                </div>
                <div className="product-price">
                  <div className="price">
                    <span>{formatCurrency(item.price)}</span> {/* قیمت واحد | Unit price */}
                    <span className="qty">خرید {item.qty}</span> {/* تعداد خرید | Quantity */}
                  </div>
                  <div className="remove-item">
                    {/* دکمه حذف محصول از سبد | Remove item button */}
                    <button onClick={() => removeProducts(item)}>حذف از سبد</button>
                  </div>
                </div>
              </div>
            </Fade>
          )
        }
      </div>

      {/* نمایش مجموع قیمت | Display total price */}
      <div className="total-price">
        <div className="total-text">مجموع قیمت</div>
        <div className="total">{formatCurrency(totalPrice)} تومان</div>
      </div>
    </>
  );
}

export default Card;

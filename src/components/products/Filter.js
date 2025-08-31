import React from 'react'

function Filter(props) {
     return (
          <div className="filter">
               <div className="result">
                    {/* نمایش تعداد محصولات | Display number of products */}
                    tedad mahsolat:{props.count}
               </div>

               <div className="sort">
                    <div className="sort-title">moratab saze bar asas</div>
                    <div className="form-checkbox">
                         {/* گزینه‌های مرتب‌سازی | Sorting options */}
                         <div className="form-group">
                              <input type="radio" value="asc" name="radiovalues" onChange={props.sortProducts} />
                              <label htmlFor="">jadidarin mahsoolat</label>
                         </div>
                         <div className="form-group">
                              <input type="radio" value="desc" name="radiovalues" onChange={props.sortProducts} />
                              <label htmlFor="">ghadiime tarin mahsoolat</label>
                         </div>
                    </div>
               </div>

               <div className="brand">
                    {/* فیلتر برندها | Brand filter */}
                    berandha
                    <select value={props.brand} onChange={props.filterProducts}>
                         <option value="">hameh</option>
                         <option value="samsung">samsung</option>
                         <option value="iphone">iphone</option>
                         <option value="motorola">motorola</option>
                         <option value="blackberry">blackberry</option>
                         <option value="lg">lg</option>
                         <option value="sony">sony</option>
                    </select>
               </div>
          </div>
     )
}

export default Filter

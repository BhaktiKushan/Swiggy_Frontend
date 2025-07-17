import React from 'react'

const Sidebar = ({showfirmHandler,showproductHandler,AllproductHandler}) => {
  return (
    <div>
        <div className="Sidebar-section">
            <ul>
                <li onClick={showfirmHandler}>Add Firm</li>
                <li onClick={showproductHandler}>Add Product</li>
                <li onClick={AllproductHandler}>All Products</li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar

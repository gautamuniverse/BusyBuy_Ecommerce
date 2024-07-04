//We are sending an array in the form of data, which contains the product card in the first index and addtocart function in the second index.

import { useEffect } from "react";
import { useProductData } from "../Context/productContext";

function ProductCard({ product }) {
  const { cartItems, addToCart } = useProductData();

  return (
    <>
      <div className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.title} />
          
        </div>
     
        <div className="product-body">
        <div style={{marginLeft: '4px', fontWeight: 'bolder', color: "#6a5acd"}}>----------------------------------</div>
          <h5>{product.title}</h5>
          <strong>₹{product.price}</strong>
        </div>
        <button className="product-atc" onClick={() => addToCart(product)}>
          Add to cart
        </button>
      </div>
    </>
  );
}

export default ProductCard;

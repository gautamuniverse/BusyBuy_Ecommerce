import { useEffect, useState } from "react";
import { useProductData } from "../Context/productContext";

function Cart() {
  const {
    fetchCartItems,
    cartItems = { count: 0, cost: 0, items: [] }, // Set default values
    addToCart,
    decreaseCartQuantity,
    deleteCartItem,
    emptyCart,
    placeOrder,
  } = useProductData();

  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(cartItems.items || []);
  }, [cartItems]);

  return (
    <>
      {cartItems.count === 0 ? (
        <h1 id="cart-page-heading" style={{ color: "red" }}>
          Your Cart Is Empty!
        </h1>
      ) : (
        <>
          <div id="purchase-container">
            <p>
              Your total is: <strong>₹{cartItems.cost}</strong>
            </p>
            <button id="purchase-button" onClick={() => placeOrder()}>
              Place Order
            </button>
          </div>

          <h1 id="cart-page-heading"> Cart </h1>
          <div className="cart-page-container">
            <div className="cart-cards-container">
              {items.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  style={{ overflow: "clip" }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="product-body">
                    <div
                      style={{
                        marginLeft: "4px",
                        fontWeight: "bolder",
                        color: "#6a5acd",
                      }}
                    >
                      ----------------------------------
                    </div>
                    <h5>{product.title}</h5>
                    <strong>₹{product.price}</strong>
                    <h6 className="cart-count">Quantity: {product.count}</h6>
                    <div className="cart-actions">
                      <button
                        class="cart-quantity-btn"
                        onClick={() => decreaseCartQuantity(product)}
                      >
                        -
                      </button>
                      <span>{product.count}</span>
                      <button
                        class="cart-quantity-btn"
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                      <button
                        className="cart-remove-btn"
                        onClick={() => deleteCartItem(product)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Cart;

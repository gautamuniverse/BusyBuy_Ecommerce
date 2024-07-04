import { useEffect } from "react";
import { useProductData } from "../Context/productContext";

function Orders() {
  const { orders, fetchOrders } = useProductData();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      {orders.length > 0 ? (
        <div className="orders-container">
          <h1>Your Orders</h1>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Time</th>
                <th>Item Title</th>
                <th>Quantity</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderTime}</td>
                  <td>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="item-description">
                        {item.title}
                      </div>
                    ))}
                  </td>
                  <td>
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="item-quantity">
                        {item.count}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className="no-orders-message">You have not purchased any products!</h1>
      )}
    </>
  );
}

export default Orders;

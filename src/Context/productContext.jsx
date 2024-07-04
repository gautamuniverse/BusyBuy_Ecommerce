import { createContext, useContext, useEffect, useState } from "react";
import data from "../productData";
import { useAuthValues } from "./authContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../Config/firestore";
import { toast } from "react-toastify";

const productContext = createContext();
export function useProductData() {
  return useContext(productContext);
}

function ProductProvider({ children }) {
  const productData = data;
  const categories = [
    "men's clothing",
    "women's clothing",
    "electronics",
    "jewelery",
  ];

  const [filterCategories, setFilterCategories] = useState([]);
  const [filterPrice, setFilterPrice] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [cartItems, setCartItems] = useState({});
  const { currentUser } = useAuthValues();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //Function to set the search query based on the changes in the input field when the user types.
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchOrders = async () => {
    try {
      if (!currentUser) {
        toast.error("No user logged in");
        return;
      }

      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", currentUser.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const ordersData = [];
        querySnapshot.forEach((doc) => {
          ordersData.push(doc.data());
        });

        setOrders(ordersData);
      } else {
        if (window.location.href.includes("/orders"))
          toast.error("No orders found");
      }
    } catch (error) {
      toast.error("Error fetching orders");
    }
  };

  const fetchCartItems = () => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.email);
      onSnapshot(
        userDocRef,
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setCartItems(docSnapshot.data().cart);
          } else {
            const defaultCart = { cost: 0, count: 0, items: [] };
            setCartItems(defaultCart);
            setDoc(userDocRef, { cart: defaultCart }, { merge: true }).catch(
              (error) => {
                console.error("Error setting default cart values:", error);
              }
            );
          }
        },
        (error) => {
          console.error("Error fetching cart items:", error);
        }
      );
    }
  };

  const addToCart = async (product) => {
    if (!currentUser) {
      toast.error("Please login first to add items to the cart!");
      return;
    }

    if (!cartItems.items) {
      cartItems.items = [];
    }

    const cartItem = cartItems.items.find((i) => i.id === product.id);
    if (cartItem) {
      await updateDoc(doc(db, "users", currentUser.email), {
        cart: {
          cost: cartItems.cost + product.price,
          count: cartItems.count + 1,
          items: cartItems.items.map((i) =>
            i.id === product.id ? { ...i, count: cartItem.count + 1 } : i
          ),
        },
      });
      toast.success(`${product.title} quantity increased!`);
    } else {
      const newCart = {
        cost: cartItems.cost + product.price,
        count: cartItems.count + 1,
        items: [...cartItems.items, { ...product, count: 1 }],
      };
      await setDoc(
        doc(db, "users", currentUser.email),
        { cart: newCart },
        { merge: true }
      );
      toast.success(`${product.title} added to cart!`);
    }
  };

  const decreaseCartQuantity = async (product) => {
    if (!currentUser) {
      toast.error("Please login to continue!");
      return;
    }

    const cartItem = cartItems.items.find((i) => i.id === product.id);
    if (cartItem.count === 1) {
      await updateDoc(doc(db, "users", currentUser.email), {
        cart: {
          cost: cartItems.cost - product.price,
          count: cartItems.count - 1,
          items: cartItems.items.filter((i) => i.id !== product.id),
        },
      });
      toast.success(`${product.title} removed from cart!`);
    } else {
      await updateDoc(doc(db, "users", currentUser.email), {
        cart: {
          cost: cartItems.cost - product.price,
          count: cartItems.count - 1,
          items: cartItems.items.map((i) =>
            i.id === product.id ? { ...i, count: i.count - 1 } : i
          ),
        },
      });
      toast.success(`${product.title} quantity decreased!`);
    }
  };

  const deleteCartItem = async (product) => {
    if (!currentUser) {
      toast.error("Please login to continue!");
      return;
    }

    await updateDoc(doc(db, "users", currentUser.email), {
      cart: {
        cost: cartItems.cost - product.price,
        count: cartItems.count - 1,
        items: cartItems.items.filter((i) => i.id !== product.id),
      },
    });
    toast.success(`${product.title} removed from cart!`);
  };

  const emptyCart = async (purchased) => {
    if (!currentUser) {
      toast.error("Please login to continue!");
      return;
    }

    await updateDoc(doc(db, "users", currentUser.email), {
      cart: { cost: 0, count: 0, items: [] },
    });
    if (!purchased) toast.success("Cart has been emptied!");
  };

  const placeOrder = async () => {
    if (!currentUser) {
      toast.error("Please login to continue!");
      return;
    }

    const orderTime = new Date().toLocaleString();
    const cart = await getDoc(doc(db, "users", currentUser.email));
    const cartItems = cart.data().cart;

    await addDoc(collection(db, "orders"), {
      items: cartItems.items,
      cost: cartItems.cost,
      count: cartItems.count,
      orderTime: orderTime,
      userId: currentUser.email,
    });
    toast.success(
      "Your order has been placed! Thank you for shopping with us! :D"
    );
    emptyCart(true);

    // Delay navigation to give the toast message time to display
    setTimeout(() => {
      window.location.replace("/orders");
    }, 2500);
  };

  const handleFilterCategories = (category, price) => {
    if (category) {
      if (filterCategories.includes(category)) {
        setFilterCategories(filterCategories.filter((cat) => cat !== category));
      } else {
        setFilterCategories([...filterCategories, category]);
      }
    }
    setFilterPrice(price);
  };

  const setFiltered = () => {
    let filtered = productData;
    if (filterCategories.length > 0) {
      filtered = filtered.filter((product) =>
        filterCategories.includes(product.category)
      );
    }
    if (filterPrice) {
      filtered = filtered.filter((product) => product.price <= filterPrice);
    }

    // Handling the case when there is a search input by the user.
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    setFiltered();
  }, [filterCategories, filterPrice, searchQuery]);

  useEffect(() => {
    if (currentUser) {
      fetchCartItems();
    }
  }, [currentUser]);

  return (
    <productContext.Provider
      value={{
        categories,
        filterCategories,
        handleFilterCategories,
        filterPrice,
        setFilterPrice,
        filteredProducts,
        setFilteredProducts,
        fetchCartItems,
        cartItems,
        addToCart,
        decreaseCartQuantity,
        deleteCartItem,
        emptyCart,
        orders,
        placeOrder,
        fetchOrders,
        handleSearch,
      }}
    >
      {children}
    </productContext.Provider>
  );
}

export default ProductProvider;

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./Components/ErrorPage";
import Home from "./Components/Home";
import Navbar from "./Components/navbar";
import Cart from "./Components/Cart";
import SignIn from "./Components/Authentication/SignIn";
import SignUp from "./Components/Authentication/SignUp";
import Orders from "./Components/Orders";
import "./Styles/common.css";
import AuthProvider from "./Context/authContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductProvider from "./Context/productContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/orders", element: <Orders /> },
    ],
  },
]);
function App() {
  return (
    <>
      <AuthProvider className="container">
        <ProductProvider>
          <RouterProvider router={router} />
        </ProductProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;

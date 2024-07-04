import { Outlet } from "react-router-dom";
import logo from "../Assets/logo.png";
import home from "../Assets/home.png";
import { useAuthValues } from "../Context/authContext";
import { doSignOut } from "../Config/auth";
import { useState } from "react";
import { useProductData } from "../Context/productContext";

function Navbar() {
  // Get the auth context value of isLoggedIn
  const { isLoggedIn } = useAuthValues();
  const {
    categories,
    handleFilterCategories,
    filterPrice,
    setFilterPrice,
    handleSearch,
  } = useProductData();

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "slateblue" }}
      >
        <div className="container-fluid">
          <img
            src={logo}
            onClick={() => window.location.replace("/")}
            style={{ height: "3rem", cursor: "pointer" }}
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-5">
                <a className="fs-6 mt-1 btn" aria-current="page" href="/">
                  <img src={home} id="home-logo" />
                  <strong id="nav-home-text">Home</strong>
                </a>
              </li>
            </ul>
            <div className="d-flex gap-3">
              {/* We will dynamically show the below buttons when user signs in */}
              {isLoggedIn ? (
                <a id="cart-btn" className="btn btn-outline-light" href="/cart">
                  Cart
                </a>
              ) : (
                ""
              )}
              {isLoggedIn ? (
                <a
                  id="orders-btn"
                  className="btn btn-outline-light"
                  href="/orders"
                >
                  My Orders
                </a>
              ) : (
                ""
              )}
              {isLoggedIn ? (
                <div class="dropdown">
                  <button
                    class="btn btn-outline-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Filters
                  </button>
                  <div class="dropdown-menu">
                    <label htmlFor="priceRange">
                      Price: {filterPrice ? filterPrice : 100000}
                    </label>
                    <input
                      id="filter-range"
                      name="priceRange"
                      type="range"
                      min="0"
                      max="100000"
                      value={filterPrice ? filterPrice : 100000}
                      onChange={(e) =>
                        handleFilterCategories(null, e.target.value)
                      }
                    />

                    <hr />
                    <strong style={{ fontSize: "large" }}>Categories:</strong>
                    <div>
                      {categories.map((category, index) => {
                        return (
                          <div key={index} style={{ paddingTop: "10px" }}>
                            <input
                              name={category}
                              type="checkbox"
                              onClick={() =>
                                handleFilterCategories(category, filterPrice)
                              }
                              style={{
                                transform: "scale(1.3)",
                                marginRight: "5px",
                              }}
                            />
                            <label
                              htmlFor={category}
                              style={{ paddingInline: "5px" }}
                            >
                              {category.charAt(0).toUpperCase() +
                                category.slice(1).toLowerCase()}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e)}
                />
                {/* <button className="btn btn-outline-light ms-2" type="submit">
                  Search
                </button> */}
              </form>
              {isLoggedIn ? (
                <a className="btn btn-outline-light" onClick={doSignOut}>
                  Signout
                </a>
              ) : (
                <a className="btn btn-outline-light" href="/signin">
                  Sign in
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;

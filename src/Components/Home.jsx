import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductData } from "../Context/productContext";
import data from "../productData";

function Home() {
  //Get all the products in the starting

  const [loading, setLoading] = useState(true);
  const { filteredProducts, setFilteredProducts, addToCart } = useProductData();

  return (
    <>
      <h1 className="mt-4" style={{ textAlign: "center" }}>
        Welcome!
      </h1>
      <div className="product-cards-container">
        {filteredProducts.map((i, index) => (
          <ProductCard product={i} key={index} />
        ))}
      </div>
    </>
  );
}

export default Home;

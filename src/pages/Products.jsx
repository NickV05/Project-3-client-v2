import { useState, useEffect } from "react";
import { get } from "../services/authService";
import EachProduct from "../components/EachProduct";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

const Products = () => {
  const [allProducts, setMarket] = useState([]);
  const [sorting, setOrder] = useState("");

  const getAllProducts = () => {
    get("/items")
      .then((response) => {
        console.log("All products:", response.data);
        setMarket(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    console.log("Sorting ===>", sorting);
  }, [sorting]);

  return (
    <div className="block align-middle justify-center">
      <div className="flex">
        <SearchBar getAllProducts={getAllProducts} setMarket={setMarket} />
        <Filter getAllProducts={getAllProducts} setMarket={setMarket} />
        <Sort setOrder={setOrder} />
      </div>
      {allProducts.length ? (
        <div class="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {!sorting
            ? allProducts.map((product) => (
                <EachProduct key={product._id} {...product} />
              ))
            : sorting === "name"
            ? allProducts
                .slice()
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product) => (
                  <EachProduct key={product._id} {...product} />
                ))
            : sorting === "priceHigh"
            ? allProducts
                .slice()
                .sort((a, b) => b.cost - a.cost)
                .map((product) => (
                  <EachProduct key={product._id} {...product} />
                ))
            : sorting === "priceLow"
            ? allProducts
                .slice()
                .sort((a, b) => a.cost - b.cost)
                .map((product) => (
                  <EachProduct key={product._id} {...product} />
                ))
            : null}
        </div>
      ) : (
        <div className="flex justify-center ml-9 font-bold mt-56 text-2xl">
          No items were found
        </div>
      )}
    </div>
  );
};

export default Products;

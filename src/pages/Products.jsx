import { useState, useEffect } from "react";
import { get } from "../services/authService";
import EachProduct from "../components/EachProduct";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

const Products = () => {
  const [allProducts, setMarket] = useState([]);

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

  return (
    <div className="block align-middle justify-center">
      <div className ="flex">
        <SearchBar getAllProducts={getAllProducts} setMarket={setMarket} />
        <Filter getAllProducts={getAllProducts} setMarket={setMarket}/>
      </div>
      {allProducts.length ? <div class="py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
        
          {allProducts.map((product) => {
            return <EachProduct key={product._id} {...product} />;
          })}
          </div>
         : 
          <div className ="flex justify-center ml-9 font-bold mt-56 text-2xl">No items were found</div>
        }
      
    </div>
  );
};

export default Products;

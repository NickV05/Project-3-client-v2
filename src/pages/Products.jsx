import { useState, useEffect } from "react";
import { get } from "../services/authService";
import EachProduct from "../components/EachProduct";
import SearchBar from "../components/SearchBar";



const Products = () => {
    
    const [allProducts, setMarket] = useState([]);

    const getAllProducts = () => {
        get('/items')
          .then((response) => {
            console.log("All products:", response.data)
            setMarket(response.data)
        })
          .catch((error) => console.log(error));
      };

    useEffect(() => {
        getAllProducts();
    },[])

  return (

      <div className = "block align-middle justify-center">
    <SearchBar getAllProducts = {getAllProducts} setMarket = {setMarket}/>
    <div class = "py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
    
      {allProducts.length ? allProducts.map((product) => {
          return (
            <EachProduct key={product._id} {...product} />
          );
        }) : <img
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691760277/project3/spinner_jtv0k4.gif"
              class="w-full flex justify-center align-middle"
              alt="Spinner"
            />}
        
    </div>

    </div>

  )
}

export default Products

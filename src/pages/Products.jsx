import { useState, useEffect } from "react";
import { get } from "../services/authService";
import EachProduct from "../components/EachProduct";
import { Link } from "react-router-dom";


const Products = () => {
    const getToken = () => {
        return localStorage.getItem('authToken')
      }
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
    <div class = "py-12 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
    
      {allProducts.length ? allProducts.map((product) => {
          return (
            <EachProduct key={product._id} {...product} />
          );
        }) : <p>No products</p>}
        
    </div>



  )
}

export default Products

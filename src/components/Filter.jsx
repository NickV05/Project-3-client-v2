import { get } from "../services/authService";
import { useState, useEffect } from "react";

const Filter = ({ getAllProducts, setMarket }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleFilter = (e) => {
    setSelectedCategory(e.target.value);
  };

useEffect(() => {
    if (selectedCategory !== "all") {
      get("/items")
        .then((response) => {
          return response.data.filter((item) => item.category === selectedCategory);
        })
        .then((filteredItems) => {
          setMarket(filteredItems);
        });
    } else {
      getAllProducts();
    }
  }, [selectedCategory]);

  return (
    <div className="flex mt-7 h-14 mr-3">
      <div className="relative inline-block w-36">
        
        <select
          value={selectedCategory}
          onChange={handleFilter}
          className={`absolute inset-0 w-full py-2 pl-3 pr-8 text-gray-900 bg-white border border-gray-300 rounded-lg
           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          <option value="all">All</option>
          <option value="foodAndDrinks">Food & Drinks</option>
          <option value="clothes">Clothes</option>
          <option value="electronics">Electronics</option>
          <option value="vehicles">Vehicles</option>
          <option value="homeAndGarden">Home & Garden</option>
          <option value="forKids">For Kids</option>
          <option value="health">Health & Personal Care</option>
          <option value="software">Software</option>
          <option value="art">Art & Crafts</option>
          <option value="travel">Travel</option>
          <option value="music">Music</option>
          <option value="sport">Sport</option>
          <option value="office">Office Products</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;

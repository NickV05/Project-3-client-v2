import { get } from "../services/authService";
import { useState } from "react";

const Filter = ({getAllProducts, setMarket}) => {
    const [showSelect, setShowSelect] = useState(false);

    const handleButtonClick = () => {
        setShowSelect(!showSelect);
      };

    const handleFilter = (e) => {
        if(e.target.value !== "all"){
            get("/items")
            .then((response) => {
                console.log("Tartget ===>", e.target.value)
                return response.data.filter((item) => item.category === e.target.value)
            })
            .then((filteredItems) => {
                console.log("filtered ==>", filteredItems)
                setMarket(filteredItems)
            })
        }
        else{
            getAllProducts();
        }
        
    }
  return (
    <div className="flex mt-7 h-14 mr-auto ">
    <button onClick = {handleButtonClick} className="mr-3 text-gray-500 dark:text-gray-400 border border-gray-300 rounded-lg bg-gray-50 
    focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
    dark:focus:ring-blue-500 dark:focus:border-blue-500 hover:bg-white transition-all ease-in-out duration-700">
      <label
        for="countries_multiple"
        className="block mb-2 text-sm  text-gray-500 dark:text-gray-400 dark:text-white w-36 px-3 pt-1"
      >
        Search by category
      </label>
      </button>
      {showSelect && <select
        multiple
        id="countries_multiple"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
        w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 
        dark:focus:border-blue-500"
        onChange = {handleFilter}
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
      </select>}
    </div>
  );
};

export default Filter;

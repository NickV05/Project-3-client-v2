import { useState, useEffect } from "react";
const Sort = ({setOrder}) => {

    const [selectedSorting, setSelectedSorting] = useState("featured");

  const handleFilter = (e) => {
    setSelectedSorting(e.target.value);
  };

useEffect(() => {
    if(selectedSorting === "featured"){
        setOrder("")
    }
    else{
        switch (selectedSorting) {
            case "priceLow":
                setOrder(`priceLow`)
                break;
        
            case "priceHigh":
                setOrder(`priceHigh`)
                break;

            case "name":
                setOrder(`name`)
                break;
        }
    }
    
  }, [selectedSorting]);

  return (
    <div className="flex mt-7 h-14 mr-auto ">
      <div className="relative inline-block w-36">
        
        <select
          value={selectedSorting}
          onChange={handleFilter}
          className={`absolute inset-0 w-full py-2 pl-3 pr-8 text-gray-900 bg-white border border-gray-300 rounded-lg
           focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
           dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        >
          <option value="featured">Featured</option>
          <option value="priceLow">Price low to high</option>
          <option value="priceHigh">Price high to low</option>
          <option value="name">Name</option>
          
        </select>
      </div>
    </div>
  )
}

export default Sort

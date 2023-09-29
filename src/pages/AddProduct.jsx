import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../services/authService";

import { fileChange } from "../services/fileChange";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    cost: 0,
    description: "",
    image: "",
    category: ""
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [buttonDisabled, setButtonDisabled] = useState(false)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleNumberChange = (e) => {
    setProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddProd = (e) => {
    e.preventDefault();

    post("/items/new-item", product)
      .then((response) => {
        navigate("products");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleSelectionChange = (e) => {
    const itemTypeSelect = document.getElementById('categoryType');
    setProduct((prev) => ({...prev,[e.target.name]: itemTypeSelect.value}));
    
  }

  const handleFileChange = (e) => {

    setButtonDisabled(true)

    fileChange(e)
      .then((response) => {
        setProduct((prev) => ({...prev, [e.target.name]: response.data.image}));
        setButtonDisabled(false);
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log("Error while uploading the file: ", err);
      });

}

  return (
<div
  id="defaultModal"
  tabIndex="-1"
  className="flex md:fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
>
  <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
      <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Product
        </h3>
        <Link to="/products">
        <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="defaultModal"
        >
          <svg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        </Link>
      </div>

      <form onSubmit={handleAddProd}>
        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              onChange={handleTextChange}
              type="text"
              name="name"
              value={product.name}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              required=""
            />
          </div>
          <div className="relative mt-8 flex justify-center" data-te-input-wrapper-init>
            <input
              type="file"
              name="image"
              className="peer block min-h-[auto] w-3/4 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput33"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              onChange={handleNumberChange}
              type="number"
              name="cost"
              value={product.cost}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="2999"
              required=""
            />
          </div>
          <div>
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
                id="categoryType"
                name="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 
                block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                dark:focus:border-primary-500"
                onChange={handleSelectionChange}
                >
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
          <div className="sm:col-span-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              onChange={handleTextChange}
              name="description"
              value={product.description}
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Write product description here"
            ></textarea>
          </div>
        </div>
        <button
          disabled={buttonDisabled}
          type="submit"
          className="text-white inline-flex bg-blue-500 items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="mr-1 -ml-1 w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Add new product
        </button>
      </form>
    </div>
  </div>
</div>

  );
};

export default AddProduct;

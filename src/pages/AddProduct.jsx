import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { post } from "../services/authService";

import { fileChange } from "../services/fileChange";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    cost: 0,
    description: "",
    image: "",
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
        console.log("New Product", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log("Error", error);
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleFileChange = (e) => {

    setButtonDisabled(true)

    fileChange(e)
      .then((response) => {
        console.log(response.data);
        console.log("post", product)
        setProduct((prev) => ({...prev, [e.target.name]: response.data.image}));
        setButtonDisabled(false);
        console.log("post after", product)
      })
      .catch((err) => {
        setButtonDisabled(false);
        console.log("Error while uploading the file: ", err);
      });

}

  return (
    <section class="h-80 flex justify-center align-middle">

<div class="md:w-4/12 lg:ml-6 lg:w-4/12 flex justify-center align-middle">
  <form
    onSubmit={handleAddProd}
    class="flex flex-col justify-center align-middle mt-60"
  >
    <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
      <input
        type="text"
        name="name"
        value={product.name}
        class="peer flex min-h-[auto]  justify-center align-middle rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
        outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
        motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
        [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Product name"
        onChange={handleTextChange}
      />
    </div>

    <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
    <textarea
         name="description"
        value={product.description}
        class="peer min-h-[auto] rounded flex justify-center align-middle border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
        outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
        motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
        [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Product description"
        onChange={handleTextChange}
      />
    </div>

    <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
      <input
       type="number"
        name="cost"
        value={product.cost}
        class="peer block min-h-[auto] rounded justify-center align-middle border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
        outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
        motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
        [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        placeholder="Price"
        onChange={handleNumberChange}
      />
    </div>

    <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
      <input
        type="file" 
        name="image" 
        class="peer block min-h-[auto] w-3/4 rounded justify-center align-middle border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
        outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
        motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
        [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
        id="exampleFormControlInput33"
        onChange={handleFileChange} 
      />
    </div>


    <button
      type="submit"
      className=" w-72  flex justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
      transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
      focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
      focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
      dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
      dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
      dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] ml-5"
      data-te-ripple-init
      data-te-ripple-color="light"
      disabled={buttonDisabled}
    >
      Add product
    </button>

  </form>
</div>
</section>
  );
};

export default AddProduct;

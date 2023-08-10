
import { useParams, useNavigate } from "react-router-dom"; 

import { useState, useEffect } from "react";

import { get, post} from "../services/authService";

import { fileChange } from '../services/fileChange'


function EditProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [image, setImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const { productId } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {                                  
    get(`/items/item-detail/${productId}`)
      .then((response) => {
        const oneProduct = response.data;
        setName(oneProduct.name);
        setDescription(oneProduct.description);
        setCost(oneProduct.cost);
        setImage(oneProduct.image);
      })
      .catch((error) => console.log(error));
    
  }, [productId]);

  const handleFormSubmit = (e) => {                     
    e.preventDefault();
    const requestBody = { name, description, cost, image };
    post(`/items/item-update/${productId}`, requestBody)
      .then((response) => {
        console.log("Updated", response.data)
        navigate(`/product-details/${productId}`)
      });
  };

  const deleteProduct = () => {                    
    post(`/items/delete-item/${productId}`)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };  

  const handleFileChange = (e) => {

    setButtonDisabled(true)

    fileChange(e)
      .then((response) => {
        console.log(response.data);
        setImage( response.data.image);
        setButtonDisabled(false);
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
        onSubmit={handleFormSubmit}
        class="flex flex-col justify-center align-middle mt-60"
      >
        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
          <input
            type="text"
            name="title"
            value={name}
            class="peer flex min-h-[auto]  justify-center align-middle rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput3"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
        <textarea
             name="description"
            value={description}
            class="peer min-h-[auto] rounded flex justify-center align-middle border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div class="relative mb-6 flex justify-center" data-te-input-wrapper-init>
          <input
           type="text"
            name="cost"
            value={cost}
            class="peer block min-h-[auto] rounded justify-center align-middle border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] 
            outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 
            motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 
            [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlInput33"
            onChange={(e) => setCost(e.target.value)}
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
          class=" w-72  flex justify-center rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
          transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          disabled={buttonDisabled}
        >
          Update info
        </button>

        
        <button
          type="submit"
          class=" w-72 rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] 
          transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
          dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
          dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          data-te-ripple-init
          data-te-ripple-color="light"
          disabled={buttonDisabled}
          onClick={deleteProduct}
        >
          Delete product
        </button>

      </form>
    </div>
</section>
  );
}

export default EditProductPage;

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

  const handleSignupSubmit = (e) => {
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
    <div>
      <h1>List your item</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Product name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleTextChange}
        />

        <label>Price</label>
        <input
          type="number"
          name="cost"
          value={product.cost}
          onChange={handleNumberChange}
        />

        <label>description</label>
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleTextChange}
        />

        <label>Image</label>
        <input 
          type="file" 
          name="image" 
          onChange={handleFileChange} 

          />

        <button type="submit" disabled={buttonDisabled}>Add product</button>
      </form>
    </div>
  );
};

export default AddProduct;

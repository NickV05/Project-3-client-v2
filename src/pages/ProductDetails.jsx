import { useState, useEffect } from "react";
import { get, post } from "../services/authService";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import EachComment from "../components/EachComment";
import { CartContext } from "../context/cart.context";
import addToCartSound from "/audio/add.mp3"
import deleteSound from "/audio/deleted.mp3"

const ProductDetails = () => {
  const [details, setDetails] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const { user } = useContext(AuthContext);
  const { cart, setCart, getCart } = useContext(CartContext);
  const { productId } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState({
    comment: "",
  });

  const getAllDetails = () => {
    get(`/items/item-detail/${productId}`)
      .then((response) => {
        console.log("Product info", response.data);
        setDetails(response.data);
      })
      .catch((error) => console.log(error));
  };

  const playAddToCartSound = () => {

    const audio = new Audio(addToCartSound);
    audio.play();
    setTimeout(() => {
      audio.currentTime = 0;
      audio.pause();

    }, 1000);
  };

  const playDeleteSound = () => {

    const audio = new Audio(deleteSound);
    audio.play();
    setTimeout(() => {
      audio.currentTime = 0;
      audio.pause();

    }, 1000);
  };

  useEffect(() => {
    getAllDetails();
    getCart();
    console.log("Details ==== >", details);
  }, []);

  const editProduct = () => {
    setEditing(true);
  };

  const isOwner = () => {
    if (user) {
      if (user._id) {
        return details.owner._id === user._id;
      }
    }
  };

  const isNotOwner = () => {
    if (user) {
      if (user._id) {
        return details.owner._id !== user._id;
      }
    }
  };

  const stopEditing = () => {
    setEditing(false);
    setReview({ comment: "" });
  };

  const deleteProduct = () => {
    playDeleteSound();
    post(`/items/delete-item/${productId}`)
      .then(() => {
        navigate("/products");
      })
      .catch((err) => console.log(err));
  };

  const addToCart = () => {
    playAddToCartSound();
    if (cart.message) {
      const body = {
        details: details,
      };

      console.log("Body", body);

      console.log("User", user);

      post("/cart/create", body)
        .then((response) => {
          console.log("New cart", response.data);
          setCart(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const body = {
        itemId: details._id,
        cartId: cart._id,
        itemCost: details.cost,
      };

      post("/cart/update", body)
        .then((response) => {
          console.log("Updated cart", response.data);
          setCart(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleTextChange = (e) => {
    setReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    post(`/items/add-comment/${productId}`, review)
      .then((response) => {
        console.log("RESPONSE", response.data);
        setDetails(response.data);
        stopEditing();
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className ="md:flex ">
      {details ? (
        <div
          id="readProductModal"
          tabIndex="-1"
          className="flex justify-start md:ml-10 items-center w-50 md:inset-0 h-modal md:h-full"
        >
          <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                  <h3 className="font-semibold ">{details.name}</h3>
                  <Link to={`/profile/${details.owner._id}`}>
                  <h3 className="font-semibold ">By: {details.owner.fullName}</h3>
                  </Link>
                  <p className="font-bold">
                    {details.cost
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    $
                  </p>
                  <img src={details.image} />
                </div>
                <div>
                  <Link to="/products">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg 
                        text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-toggle="readProductModal"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 
                            4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </Link>
                </div>
              </div>
              <dl>
                <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                  Details
                </dt>
                <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                  {details.description}
                </dd>
              </dl>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  {isOwner() && (
                    <Link to={`/product/edit/${details._id}`}>
                      <button
                        type="button"
                        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 
                        focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
                        dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        <svg
                          className="mr-1 -ml-1 w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                          <path
                            fillRule="evenodd"
                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Edit
                      </button>
                    </Link>
                  )}

                  {isNotOwner() && (
                    <button
                      onClick={addToCart}
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium text-gray-900 
                       focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 
                       focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 
                       dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Add to Cart
                    </button>
                  )}

                  {isNotOwner() && !isEditing && (
                    <button
                      onClick={editProduct}
                      type="button"
                      className="py-2.5 px-5 text-sm font-medium
                         text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 
                         hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 
                         dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      Review
                    </button>
                  )}
                </div>
                {isOwner() && (
                  <button
                    onClick={deleteProduct}
                    type="button"
                    className="inline-flex items-center text-white bg-red-600
                     hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 
                     text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    <svg
                      className="w-5 h-5 mr-1.5 -ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 
                        100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 
                        0 00-1-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}


      {details && (<div className =" w-96 mt-4">

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-lg lg:text-2xl font-bold ml-5 text-gray-900 dark:text-white">Discussion ({details.comments.length})</h2>
    </div>
      {isEditing && (
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <div className="py-2 px-4 mb-4 mx-5 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label for="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              type="text"
              name="comment"
              onChange={handleTextChange}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 
                dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-500 ml-5 text-white bg-primary-700 rounded-lg focus:ring-4 
            focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            Post comment
          </button>
        </form>
      )}

      {details && (
        <div>
          {details.comments &&
            details.comments
              .slice()
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <EachComment
                  key={comment._id}
                  {...comment}
                  getAllDetails={getAllDetails}
                />
              ))}
        </div>
      )}
    </div>)}
    </div>
  );
};

export default ProductDetails;

import { useState, useEffect } from "react";
import { get, post } from "../services/authService";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import EachComment from "../components/EachComment";
import { CartContext } from "../context/cart.context";

const ProductDetails = () => {
  const [details, setDetails] = useState(null);
  const [isEditing, setEditing] = useState(false);
  const { user } = useContext(AuthContext);
  const { cart, setCart, getCart } = useContext(CartContext);
  const { productId } = useParams();

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

  const addToCart = () => {
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
    <>
      {details && (
        <div className="flex flex-col justify-between h-full w-full md:w-1/2 max-w-xs mx-auto space-y-4 min-h-128">
          <Link to="/">
            <button
              className=" text-white border border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm mt-5"
            >
              Back to products
            </button>
          </Link>

          <div className="font-primary">
            <h1 className="leading-relaxed font-extrabold text-3xl text-palette-primary ">
              {details.name}
            </h1>
            <div className="relative h-58">
              <img
                src={details.image}
                alt="productImage"
                layout="fill"
                className="transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
            <div className="text-xl text-palette-primary font-medium py-4 px-1">
              <p className="text-2xl">
                {details.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                $
              </p>
            </div>
            <p className="font-medium text-lg">{details.description}</p>
          </div>

          <div className="w-full">
            {details._id && (
              <>
                {user && (
                  <div>
                    {isOwner() && (
                      <Link to={`/product/edit/${productId}`}>
                        <button
                          className=" text-white border border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
                        >
                          Edit Product info
                        </button>
                      </Link>
                    )}
                  </div>
                )}
              </>
            )}

            {isNotOwner() && (
              <button
                className="pt-3 pb-2  text-white w-full mt-2 rounded-sm font-primary font-semibold text-xl flex 
              justify-center items-baseline"
                aria-label="cart-button"
                onClick={addToCart}
              >
                Add To Cart
              </button>
            )}

            {isNotOwner() && (
              <>
                {!isEditing && (
                  <div>
                    <h3>Review this product</h3>
                    <button
                      onClick={editProduct}
                      className=" text-white border border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm mb-5"
                    >
                      Write a customer review
                    </button>
                  </div>
                )}

                {isEditing && (
                  <form onSubmit={handleCommentSubmit}>
                    <label>Your comment:</label>
                    <input
                      type="text"
                      name="comment"
                      value={review.comment}
                      onChange={handleTextChange}
                      className="my-2"
                    />
                    <button
                      type="submit"
                      className=" text-white border my-3 border-palette-primary text-palette-primary text-lg 
            font-primary font-semibold pt-2 pb-1 leading-relaxed flex justify-center items-center focus:ring-1 focus:ring-palette-light 
            focus:outline-none w-full hover:bg-palette-lighter rounded-sm"
                    >
                      Post Review
                    </button>
                  </form>
                )}
              </>
            )}

            {details && (
              <div>
                {details.comments &&
                  details.comments
                    .slice()
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((comment) => (
                      <EachComment
                        key={comment._id}
                        {...comment}
                        getAllDetails={getAllDetails}
                      />
                    ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;

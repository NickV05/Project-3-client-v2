import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { CartContext } from "../context/cart.context";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const [groupedItems, setGroupedItems] = useState({})

  console.log("in Cart", cart);
  const navigate = useNavigate();
  const cartId = cart?._id;


  useEffect(() => {

    if (cart && !cart.message) {

      const theseItems = cart.items.reduce((groupedItems, item) => {
        if (!groupedItems[item._id]) {
          groupedItems[item._id] = {
            ...item,
            quantity: 1,
          };
        } else {
          groupedItems[item._id].quantity++;
        }
        console.log("groupedItems", groupedItems)
        return groupedItems;
      }, {})

      setGroupedItems(theseItems)

    }

    

    console.log("in Cart", cart);
}, [cart])


    const proceedToPayment = () => {
      post(`/stripe/create-checkout-session/${cart._id}`, groupedItems)
          .then((response) => {
              console.log("STRIPE URL:", response.data);
              const url = response.data.url;
              setCart(null)
              window.location.href = url;
              
          })
          .catch((error) => {
            console.log("Error", error)
          })

    }

    const deleteFromCart = (_id) => {
      console.log("Id:", _id)
      post(`/cart/remove-item/${_id}`, cartId)
          .then((response) => {
              console.log("Updated cart:", response.data);
              if(!response.data.items.length){
                setCart(null)
              }
              setCart(response.data)
              navigate("/cart");
          })
          .catch((error) => {
              console.log("Error", error);
          });
  }


  const decreaseItem = (_id) => {
    post(`/cart/decrease-item/${_id}`, cartId)
          .then((response) => {
              console.log("Updated cart:", response.data);
              if(!response.data.items.length){
                setCart(null)
              }
              setCart(response.data)
              navigate("/cart");
          })
          .catch((error) => {
              console.log("Error", error);
          });
  }

  

  return (
    <div class = "flex justify-center align-middle mt-28 w-full">
    {cart && !cart.message ? (
      <>
        {cart.items.length ? (
          <div >
            <table className="mx-auto">
              <thead>
                <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                  <th className="font-primary font-normal px-6 py-4">Product</th>
                  <th className="font-primary font-normal px-6 py-4">Image</th>
                  <th className="font-primary font-normal px-6 py-4">Price</th>
                  <th className="font-primary font-normal px-6 py-4">Quantity</th>
                  <th className="font-primary font-normal px-6 py-4">Adjust changes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-palette-lighter">
                {Object.values(groupedItems).map((groupedItem) => {
                  const { _id, name, cost, quantity, image } = groupedItem;
                  return (
                    <tr key={_id} className="text-sm sm:text-base text-gray-600 text-center">
                      <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                        <Link to={`/product-details/${_id}`}>
                          <h3 className="pt-1 hover:text-palette-dark">{name}</h3>
                        </Link>
                      </td>
                      <td>
                        <img src={image} alt="productImage" height={64}
                  width={64} />
                      </td>
                      <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">${cost}</td>
                      <td className="font-primary font-medium px-4 sm:px-6 py-4">{quantity}</td>
                      <td>
                        <button onClick={() => decreaseItem(_id)} className="font-primary font-medium px-4 sm:px-6 py-4 text-white">Decrease amount</button>
                        <button onClick={() => deleteFromCart(_id)} className="font-primary font-medium px-4 sm:px-6 py-4 text-white">Remove item</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div class = "flex flex-col justify-center align-middle">
            <p class ="text-center">Subtotal: $ {cart.subtotal} </p>
            <p class ="text-center">Tax: 8%</p>
            <p class ="text-center">Total: $ {cart.total} </p>
            <button class ="w-1/3 ml-64 " onClick={proceedToPayment}>Proceed to checkout</button>
            </div>
          </div>
        ) : (
          <div>Your cart is empty</div>
        )}
      </>
    ) : (
      <h2>{cart?.message}</h2>
    )}
  </div>

  


);


}
export default Cart;

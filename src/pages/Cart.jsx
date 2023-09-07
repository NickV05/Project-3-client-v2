import { useContext, useEffect, useState } from "react";
import { post } from "../services/authService";
import { CartContext } from "../context/cart.context";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const [groupedItems, setGroupedItems] = useState({})
  
  console.log("in Cart 1", cart);
  const navigate = useNavigate();
  const cartId = cart?._id;

  const formatNumber = (number) => {
    console.log("Number ===>", number)
    if(number){
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
  }


  useEffect(() => {

    if (cart && !cart.message) {

      console.log("Cart for grouping ===>", cart)
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

    console.log("in Cart 2", cart);
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
              setCart(response.data)
              navigate("/cart");
          })
          .catch((error) => {
              console.log("Error", error);
          });
  }

  const increaseItem = (_id) => {
    post(`/cart/increase-item/${_id}`, cartId)
        .then((response) => {
          console.log("Updated cart ===>", response.data);
          setCart(response.data);
          navigate("/cart")
        })
        .catch((error) =>{
          console.log("Error",error)
        })
  }

  return (
<>
  {cart && cart.items && !cart.message ? <div class="container md:p-8 p-2 mx-auto mt-12">
  <div class="w-full overflow-x-auto">
    <div class="my-2">
      <h3 class="md:text-xl text-sm font-bold tracking-wider">Shopping Cart </h3>
    </div>
    <table class="w-full shadow-inner">
      <thead>
        <tr class="bg-gray-100">
          <th class="md:px-6 py-3 font-bold whitespace-nowrap">Image</th>
          <th class="md:px-6 py-3 font-bold whitespace-nowrap">Product</th>
          <th class="md:px-6 py-3 font-bold whitespace-nowrap">Qty</th>
          <th class="md:px-6 py-3 font-bold whitespace-nowrap">Price</th>
          <th class="md:px-6 py-3 font-bold whitespace-nowrap">Remove</th>
        </tr>
      </thead>
      <tbody>
      {Object.values(groupedItems).map((item) => {
                  const { _id, name, cost, quantity, image } = item;
                  return (             
        <tr key={_id}>
          <td>
            <div class="flex justify-center">
              <img
                src={image}
                class="object-cover md:h-28 w-28 rounded-2xl"
                alt="image"
              />
            </div>
          </td>
          <td class="md:p-4 md:px-6 text-center whitespace-nowrap">
            <div class="flex flex-col items-center justify-center">
            <Link to={`/product-details/${_id}`}>
              <h3>{name}</h3>
              </Link>
            </div>
          </td>
          <td class="md:p-4 md:px-6 text-center whitespace-nowrap">
            <div>
              <button onClick={() => decreaseItem(_id)} className =" bg-white hover:bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-flex md:w-6 md:h-6 w-4 h-4 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>

              <input
                type="text"
                name="qty"
                value={quantity}
                class="md:w-12 w-6 text-center bg-gray-100 outline-none"
              />
              
              <button onClick={() => increaseItem(_id)} className =" bg-white hover:bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="inline-flex md:w-6 md:h-6 w-4 h-4 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </td>
          <td class="md:p-4 md:px-6 px-1 text-center whitespace-nowrap">$ {formatNumber(cost)}</td>
          <td class="md:p-4 md:px-6 text-center whitespace-nowrap">
            <button onClick={() => deleteFromCart(_id)} className =" bg-white hover:bg-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="md:w-6 md:h-6 w-4 h-4 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </td>
        </tr>
        );
                })}
        
      </tbody>
    </table>
    
    <div class="mt-4">
      <div class="py-4 rounded-md shadow">
        <h3 class="text-xl font-bold text-blue-600">Order Summary</h3>
        <div class="flex justify-between px-4">
          <span class="font-bold">Subtotal</span>
          {cart && cart.subtotal ? <span class="font-bold">$ {formatNumber(cart.subtotal.toFixed(2))}</span> 
          : <span class="font-bold">$ 0 </span>}
        </div>
 
        <div class="flex justify-between px-4">
          <span class="font-bold">Sales Tax</span>
          {cart && cart.subtotal ? <span class="font-bold">$ {(cart.subtotal * 0.08).toFixed(2)}</span>
          :<span class="font-bold">$ 0</span>}   
        </div>
        <div
          class="
            flex
            items-center
            justify-between
            px-4
            py-2
            mt-3
            border-t-2
          "
        >
          <span class="text-xl font-bold">Total</span>
          {cart && cart.total ? <span class="text-2xl font-bold">$ {formatNumber(cart.total)}</span>
          : <span class=" text-2xl font-bold">$ 0 </span>}
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button
        onClick={proceedToPayment}
        class="
          w-full
          py-2
          text-center text-white
          bg-blue-500
          rounded-md
          shadow
          hover:bg-blue-600
        "
      >
        Proceed to Checkout
      </button>
    </div>
  </div>
</div> : <div className =" h-full flex justify-center">
<img src ="https://res.cloudinary.com/dyto7dlgt/image/upload/v1692911525/project3/empty_cart_kgfei1.png" className =" md:h-96 w-auto mt-32"/>
</div>}
</>

);


}
export default Cart;

import { Link } from "react-router-dom";
import { useContext,useState} from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import {
  Collapse,
  initTE,
} from "tw-elements";
import {FaBars, FaTimes} from "react-icons/fa"
 
function Navbar() {
  initTE({ Collapse });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const click = () => {
    setIsMenuOpen(false)
  }

    let number;
    const {user, logOutUser } = useContext(AuthContext);
    const {cart} = useContext(CartContext)
    if(cart && cart.items){
      number = cart.items.length
    }

    const getToken = () => {
      return localStorage.getItem('authToken')
    }
    
  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 
      shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between md:px-3 px-1">
        <div>
          <Link
            to="/"
            className="md:mx-2 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
          >
            <img
              className="md:h-10 h-7 mt-2 md:mt-0"
              src="https://res.cloudinary.com/dyto7dlgt/image/upload/v1691628543/project3/home_q0jx93.png"
              alt="TE Logo"
              loading="lazy"
            />
          </Link>
        </div>

        <button
          onClick={toggleMenu}
          type="button"
          data-dial-toggle="speed-dial-menu-top-right"
          aria-controls="speed-dial-menu-top-right"
          aria-expanded="false"
          className="flex md:hidden items-center justify-center text-white bg-blue-700 rounded-full w-7 h-7
     hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none 
     dark:focus:ring-blue-800 hover:rotate-45 mt-1"
        >
          <span class="sr-only">Open actions menu</span>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="hidden md:flex items-center">
          {getToken() && (
            <>
              <Link to="/cart">
                <span className="flex mr-7">
                  <img src="/cart.png" className="w-8 h-8 mr-3 " />{" "}
                  {number !== 0 && (
                    <p className="text-base mt-1 font-bold border-b-2 border-black">
                      {number}
                    </p>
                  )}
                </span>
              </Link>

              <Link to="/add-product">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  List item
                </button>
              </Link>

              <Link to="/products">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Shop
                </button>
              </Link>

              {user && (
                <Link to={`/profile/${user._id}`}>
                  <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Your Profile
                  </button>
                </Link>
              )}

              {user && (
                <Link to={`/messenger/${user._id}`}>
                  <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Messenger
                  </button>
                </Link>
              )}

              <button
                onClick={logOutUser}
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Logout
              </button>
            </>
          )}

          {!getToken() && (
            <>
              <Link to="/signup">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Sign Up
                </button>
              </Link>

              <Link to="/login">
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="mr-3 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Login
                </button>
              </Link>
            </>
          )}
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-row absolute top-2 left-9 gap-0.5 pr-2 space-y-2 bg-transparent 
          rounded-lg z-10 ">
          {user ? (
              <>
            <Link onClick={click} to="/cart" className=" flex justify-around">
              <span className="flex">
                <img src="/cart.png" className="w-8 h-8 text-xs mr-0.5 mt-1.5" alt="Cart" />
                
              </span>
            </Link>
            <Link to="/add-product" className=" flex justify-center">
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={click}
                className=" w-13 h-7 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
              >
                List item
              </button>
            </Link>
            <Link to="/products" className=" flex justify-center">
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={click}
                className=" w-9 h-7 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
              >
                Shop
              </button>
            </Link>
            
                <Link
                  to={`/profile/${user._id}`}
                  className=" flex justify-center"
                >
                  <button
                    type="button"
                    onClick={click}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className=" w-13 h-7 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
                  >
                    Your Profile
                  </button>
                </Link>
                <Link
                  to={`/messenger/${user._id}`}
                  className=" flex justify-center"
                >
                  <button
                    type="button"
                    onClick={click}
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className=" w-13 h-7 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
                  >
                    Messenger
                  </button>
                </Link>
            <button
              onClick={() => {
                logOutUser();
                click();
              }}
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className=" w-11 h-7 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
            >
              Logout
            </button>
              </>
            ):(
              <>
              <Link to="/signup">
                <button
                onClick={click}
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className=" w-14 h-7 ml-48 mt-2 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
                >
                  Sign Up
                </button>
              </Link>

              <Link to="/login">
                <button
                onClick={click}
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className=" w-11 h-7 ml-1 text-xs bg-white font-semibold hover:bg-gray-300 transition-all ease-in-out duration-700"
                >
                  Login
                </button>
              </Link>
            </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
 
export default Navbar;
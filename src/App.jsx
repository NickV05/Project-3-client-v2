import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./pages/Products";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import ProductDetails from "./pages/ProductDetails";
import EditProductPage from "./pages/EditProductPage";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import CancelPayment from "./pages/CancelPayment";
import Messenger from "./pages/Messenger";
import HomePage from "./pages/HomePage";


function App() {

  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="">
      <Navbar />
 
      <Routes>      
        <Route element={<LoggedIn />}>
        <Route path="/products" element={ <Products /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/add-product" element={ <AddProduct /> } />
        <Route path="/product-details/:productId" element={ <ProductDetails /> } />
        <Route path="/product/edit/:productId" element={<EditProductPage />} />
        <Route path="/product/add-comment/:productId" element={<EditProductPage />} />
        <Route path="/profile/:userId" element={ <Profile /> } />
        <Route path="/success" element={ <Success /> } />
        <Route path="/cancel" element={<CancelPayment />} />
        <Route path ="/messenger/:userId" element={<Messenger/>}/>
        <Route path ="/" element={<HomePage/>}/>

        </Route>

        <Route element={<NotLoggedIn />}>
          
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

        </Route>


      </Routes>
      
    </div>
  );
}
export default App;

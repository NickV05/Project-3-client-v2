import { useState, useEffect, createContext, useContext } from "react";

import { AuthContext } from "./auth.context";

import { get } from "../services/authService";

const CartContext = createContext()

const CartProvider = ({ children }) => {

    const [cart, setCart] = useState(null)

    const { user } = useContext(AuthContext)

    const getCart = () => {

        get('/cart')
            .then((response) => {
                console.log("CART ======>", response.data)
                setCart(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {

        if (!cart) {

            getCart()
        }


    }, [user , cart])


    return (
        <CartContext.Provider value={{ cart, setCart, getCart }} >
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }
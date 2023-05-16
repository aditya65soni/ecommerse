import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const localcartitem = () => {

    let localStoragedata = localStorage.getItem("CartItems")
    // if (localStoragedata === []) {
    //     return [];
    // } else {
    //     return JSON.parse(localStoragedata)
    // }

    const parsedata = JSON.parse(localStoragedata);
    if (!Array.isArray(parsedata)) return [];
    return parsedata;
}

const initialState = {
    // cart: [],
    cart: localcartitem(),
    total_item: "",
    total_amount: "",
    shipping_fee: 5000,
};

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
    };

    //    to decrease amount of item in the cart 
    const setDecrease = (id) => {
        dispatch({ type: "SET_DECREASE", payload: id })
    }

    //    to increase amount of item in the cart 
    const setIncrease = (id) => {
        dispatch({ type: "SET_INCREASE", payload: id })
    }
    // to remove items 
    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", payload: id })
    }

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" })
    }

    useEffect(() => {
        dispatch({ type: "CAR_TOTAL_ITEM" });
        dispatch({ type: "CAR_TOTAL_PRICE" });

        localStorage.setItem("CartItems", JSON.stringify(state.cart))
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setIncrease, setDecrease }}>
            {children}
        </CartContext.Provider>
    );
};

const UseCartContext = () => {
    return useContext(CartContext);
};

export { CartProvider, UseCartContext };
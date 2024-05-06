// CartContext.js
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // Check if the item is already in the cart
      const existingIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // If the item exists, update the quantity
        state[existingIndex].quantity += action.payload.quantity;
        return [...state];
      } else {
        // If the item is not in the cart, add it
        return [...state, { ...action.payload, quantity: 1 }]; // Initialize quantity to 1
      }

    case "REMOVE_FROM_CART":
      // Remove the item from the cart
      return state.filter((item) => item.id !== action.payload);

    case "UPDATE_QUANTITY":
      // Update the quantity of the specified item
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        // Ensure the quantity is never below 1
        state[itemIndex].quantity = Math.max(action.payload.quantity, 1);
        return [...state];
      } else {
        return state;
      }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (item, quantity) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };

  const removeFromCart = (itemId) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: itemId,
    });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: itemId, quantity },
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };

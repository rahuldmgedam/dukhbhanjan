import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// import { CartProvider } from "./CartContext";
import { Provider } from 'react-redux'
import { store } from "./redux/store";
import ThemeProvider from "./components/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <ChakraProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ChakraProvider>
    </Provider>
  </>
);

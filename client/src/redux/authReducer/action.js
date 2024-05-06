import axios from "axios"
import {CART_PRODUCT_FAILURE, CART_DELETE_PRODUCT_SUCCESS, CART_PRODUCT_REQUEST, CART_GET_PRODUCT_SUCCESS, CART_ADD_PRODUCT_SUCCESS } from "./actionType"

export const addCartProduct = (product) => (dispatch) => {
   console.log("action", product)
   dispatch({ type: CART_PRODUCT_REQUEST })
  return  axios.post("https://outrageous-shoulder-pads-fly.cyclic.app/cart/create", product,{
   headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
 })
      .then((res) => {
         console.log(res.data)
         dispatch({ Type: CART_ADD_PRODUCT_SUCCESS })
      })
      .catch(() => {
         dispatch({ type: CART_PRODUCT_FAILURE })
      })
}

export const getCartProduct = () => (dispatch) => {

   dispatch({ type: CART_PRODUCT_REQUEST })
  return axios.get("https://outrageous-shoulder-pads-fly.cyclic.app/cart",{
      headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${localStorage.getItem("token")}`
       }
   })
      .then((res) => {
         dispatch({ type: CART_GET_PRODUCT_SUCCESS, payload: res.data })
      })
      .catch((err) => {
         console.log(err)
         dispatch({ type: CART_PRODUCT_FAILURE })
      })
}


 
 export const handleCartDelete = (id) => (dispatch) => {
   dispatch({type:CART_PRODUCT_REQUEST})
  return  axios.delete(`https://outrageous-shoulder-pads-fly.cyclic.app/cart/delete/${id}`)
   .then((res) => {
      dispatch({type:CART_DELETE_PRODUCT_SUCCESS})
   })
   .catch((err)=> {
      dispatch({type:CART_PRODUCT_FAILURE})
   })
 }
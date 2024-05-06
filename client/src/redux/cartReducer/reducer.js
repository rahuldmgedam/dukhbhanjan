import { CART_PRODUCT_FAILURE, CART_PRODUCT_REQUEST, CART_GET_PRODUCT_SUCCESS, CART_ADD_PRODUCT_SUCCESS, CART_DELETE_PRODUCT_SUCCESS} from "./actionType"

const initState = {
    isLoading: false,
    isError: false,
    carts: []
}


export const reducer = (state = initState, { type, payload }) => {
    switch (type) {

        case CART_PRODUCT_REQUEST:
            return { ...state, isLoading: true }
        case CART_ADD_PRODUCT_SUCCESS:
            return { ...state, isLoading: false }
        case CART_PRODUCT_FAILURE:
            return { ...state, isLoading: false, isError: true }
        case CART_GET_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, carts: payload }
        case CART_DELETE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false }
        default:
            return state
    }
}
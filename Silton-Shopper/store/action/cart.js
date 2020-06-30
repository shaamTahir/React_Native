export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const add_to_cart = product => {
    return{
        type: ADD_TO_CART,
        product: product
    }
}

export const remove_from_cart = productId => {
    return{
        type: REMOVE_FROM_CART,
        pid: productId
    }
}
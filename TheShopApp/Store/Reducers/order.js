import { ADD_ORDERS, SET_ORDERS } from "../Actions/order";
import Orders from "../../models/order";

const initialState = {
    orders: []
}

const ordersReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ORDERS:
            return{
                orders: action.orders
            }
        case ADD_ORDERS:
            const newOrder = new Orders(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            );
            return{
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
}

export default ordersReducer;
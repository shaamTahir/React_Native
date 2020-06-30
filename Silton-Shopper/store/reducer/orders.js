import { ADD_ORDER, SET_ORDERS } from "../action/orders"
import Orders from "../../models/orders"

const initialState = {
    orders : []
}

const ordersReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ORDERS:
            return{
                orders: action.orders
            }
        case ADD_ORDER:
            const newOrder = new Orders(
                action.orderData.id,
                action.orderData.items,
                action.orderData.amount,
                action.orderData.date
            )
            return{
                ...state,
                orders: state.orders.concat(newOrder)
            }
    }
    return state;
}

export default ordersReducer;
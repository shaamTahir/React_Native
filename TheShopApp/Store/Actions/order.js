import Orders from "../../models/order";

export const ADD_ORDERS = 'ADD_ORDERS';
export const SET_ORDERS = 'SET_ORDERS';

export const fetch_orders = () => {
    return async (dispatch, getState) => {
        try{
            const userId = getState().auth.userId;
            const response = await fetch(`https://rn-shopapp-adb33.firebaseio.com/orders/${userId}.json`);
            if (!response.ok) {
                throw new Error('Something went wrong.');
            }
            const responseData = await response.json();
            const loadedOrders = [];
    
            for (const key in responseData) {
                loadedOrders.push(new Orders(
                    key,
                    responseData[key].cartItems,
                    responseData[key].totalAmount,
                    new Date(responseData[key].date)
                ));
            }
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            })
        }
        catch(err) {
            throw err;
        }
    }
}

export const add_orders = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        //any async code
        try{
            const token = getState().auth.token;
            const userId = getState().auth.userId;
            const date = new Date();
            const response = await fetch(`https://rn-shopapp-adb33.firebaseio.com/orders/${userId}.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cartItems,
                    totalAmount,
                    date: date.toISOString()
                })
            });

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            
            const responseData = await response.json();
    
            dispatch({
                type: ADD_ORDERS,
                orderData: {
                    id: responseData.name, 
                    items: cartItems, 
                    amount: totalAmount,
                    date: date
                }
            });
        }
        catch(err) {
            throw err;
        }
    }
}
import Order from "../../models/orders";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const fetch_orders = () => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId;
            const response = await fetch(`https://rn-shopapp-practice-bf364.firebaseio.com/orders/${userId}.json`);
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json();
            // console.log(resData);
            let loadedOrders = [];
            for (const key in resData) {
                loadedOrders.push(
                    new Order(
                        key,
                        resData[key].cartItems,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    )
                );
            }
    
            dispatch({
                type: SET_ORDERS,
                orders: loadedOrders
            })
        } catch (error) {
            throw error;
        }
    }
}

export const add_order = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date();
        const response = await fetch(`https://rn-shopapp-practice-bf364.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        });
        const resData = await response.json();
        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                items: cartItems,
                amount: totalAmount,
                date: date
            }
        })
    }
}
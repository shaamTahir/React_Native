import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetch_products = () => {
    return async (dispatch, getState) => {
        try{
            const userId = getState().auth.userId;
            const response = await fetch("https://rn-shopapp-adb33.firebaseio.com/products.json", {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error('Something went Wrong!');
            }
            const responseData = await response.json();
    
            const loadedProducts = [];
            for (const key in responseData) {
                loadedProducts.push(new Product(
                    key,
                    responseData[key].ownerId,
                    responseData[key].title,
                    responseData[key].imageUrl,
                    responseData[key].description,
                    responseData[key].price,
                ))
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            });
        }
        catch(err) {
            throw err;
        }

    } 
}

export const delete_product = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-shopapp-adb33.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE' });

        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        });
    }

}

export const create_product = (title, imageUrl, price, description) => {
    return async (dispatch, getState) => {
        //any async code
        try{
            const token = getState().auth.token;
            const userId = getState().auth.userId;
            const response = await fetch(`https://rn-shopapp-adb33.firebaseio.com/products.json?auth=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    price,
                    description,
                    ownerId: userId
                })
            });

            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            
            const responseData = await response.json();
            console.log(responseData);
    
            dispatch({
                type: CREATE_PRODUCT,
                productData: {
                    id: responseData.name,
                    title,
                    imageUrl,
                    price,
                    description,
                    ownerId: userId
                }
            });
        }
        catch(err) {
            throw err;
        }
    }
}

export const update_product = (id, title, imageUrl, description) => {
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.token;
            const response =  await fetch(`https://rn-shopapp-adb33.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    imageUrl,
                    description
                })
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            dispatch({
                type: UPDATE_PRODUCT,
                pid: id,
                productData: {
                    title,
                    imageUrl,
                    description
                }
            });
        }
        catch (err) {
            throw err;
        }
    }

}
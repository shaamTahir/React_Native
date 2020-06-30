import Product from "../../models/Product";

export const SET_PRODUCTS = "SET_PRODUCTS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const set_products = () => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId;
            const response = await fetch(`https://rn-shopapp-practice-bf364.firebaseio.com/products.json`);
            if (!response.ok) {
                throw new Error("Something went wrong!")
            }
            const resData = await response.json();
            // console.log(resData);
            let loadedProducts = [];
            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                );
            }
    
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
            })
        } catch (error) {
            throw error;
        }
    }
}

export const create_product = (title, imageUrl, description, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-shopapp-practice-bf364.firebaseio.com/products.json?auth=${token}`,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId: userId
            })
        });
        const resData = await response.json();
        // console.log(resData);

        dispatch({
          type: CREATE_PRODUCT,
          productData: {
              id: resData.name,
              title,
              imageUrl,
              description,
              price,
              ownerId: userId
          }
        });
    }
}

export const update_product = (id ,title, imageUrl, description) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-shopapp-practice-bf364.firebaseio.com/products/${id}.json?auth=${token}`,{
            method: "PATCH",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description
            })
        })

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                imageUrl,
                description
            }
        })
    }
}

export const delete_product = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-shopapp-practice-bf364.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: "DELETE"
        })
        dispatch({
            type: DELETE_PRODUCT,
            pid: productId
        })
    }
}
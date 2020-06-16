import {AsyncStorage} from 'react-native';

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const AUTOSIGNIN = "AUTOSIGNIN";

export const auto_signin = (userId, token) => {
    return{
        type: AUTOSIGNIN,
        userId: userId,
        token: token
    }
}

export const log_out = () => {
    return{
        type: LOGOUT
    }
}

export const sign_up = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAq5orBJQ3jqbqeSrdlKeTtoOvopTpSH4w",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);

            let message = "Something went wrong."
            const errorId = errorData.error.message;

            if (errorId === 'EMAIL_EXISTS') {
                message= "The email address is already in use by another account."
            }
            else if(errorId === 'OPERATION_NOT_ALLOWED') {
                message= "Password sign-in is disabled for this project."
            }
            else if(errorId === 'TOO_MANY_ATTEMPTS_TRY_LATER') {
                message= "We have blocked all requests from this device due to unusual activity. Try again later."
            }

            throw new Error(message);
        }

        const responseData = await response.json();

        console.log(responseData);

        dispatch({
            type: SIGNUP,
            token: responseData.idToken,
            userId: responseData.localId
        });
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        addDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
}

export const log_in = (email, password) => {
    return async dispatch => {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAq5orBJQ3jqbqeSrdlKeTtoOvopTpSH4w",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData);

            let message = "Something went wrong."
            const errorId = errorData.error.message;

            if (errorId === 'EMAIL_NOT_FOUND') {
                message= "This email could not be found."
            }
            else if(errorId === 'INVALID_PASSWORD') {
                message= "This password is not valid."
            }

            throw new Error(message);
        }

        const responseData = await response.json();

        console.log(responseData);

        dispatch({
            type: LOGIN,
            token: responseData.idToken,
            userId: responseData.localId
        });
        const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000);
        addDataToStorage(responseData.idToken, responseData.localId, expirationDate);
    }
}

const addDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token,
        userId,
        expiryDate: expirationDate.toISOString()
    }))
}
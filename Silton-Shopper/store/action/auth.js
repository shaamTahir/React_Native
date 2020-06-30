import {AsyncStorage} from 'react-native';

export const SIGNUP = "SIGNUP";
export const SIGNIN = "SIGNIN";
export const AUTO_LOGIN = "AUTO_LOGIN";
export const LOGOUT  = "LOGOUT";

export const auto_login = (token, userId) => {
    return{
        type: AUTO_LOGIN,
        token: token,
        userId: userId
    }
}

export const signup = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAswUuQaYrzlhyHmJMYKbdf1YURMlPcXHQ`, {
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
                let message = "Something went wrong."
                const errorResData = await response.json();
                // console.log(errorResData);
                const errorId = errorResData.error.message;
                if (errorId === "EMAIL_EXISTS") {
                    message = "The email address is already in use by another account."
                } 
                else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
                    message = "We have blocked all requests from this device due to unusual activity. Try again later."
                }
                throw new Error(message);
            }
            const resData = await response.json();
            // console.log(resData);
    
            dispatch({
                type: SIGNUP,
                token: resData.idToken,
                userId: resData.localId
            });
        } catch (err) {
            throw err;
        }
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAswUuQaYrzlhyHmJMYKbdf1YURMlPcXHQ`, {
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
                let message = "Something went wrong."
                const errorResData = await response.json();
                // console.log(errorResData);
                const errorId = errorResData.error.message;
                if (errorId === "EMAIL_NOT_FOUND") {
                    message = "There is no user record corresponding to this email."
                } 
                else if (errorId === "INVALID_PASSWORD") {
                    message = "The password is invalid."
                }
                throw new Error(message);
            }
            const resData = await response.json();
            // console.log(resData);
    
            dispatch({
                type: SIGNIN,
                token: resData.idToken,
                userId: resData.localId
            });
            const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
            saveDataToStorage(resData.idToken, resData.localId, expirationDate)
        } catch (err) {
            throw err;
        }
    }
}

export const log_out = () => {
    console.log("here");
    
    return{
        type: LOGOUT
    }
}

const saveDataToStorage = (token, userId, expirationDate) => {
    AsyncStorage.setItem("userData", JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate.toISOString()
    }))
}
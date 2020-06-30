import { SIGNIN, SIGNUP, AUTO_LOGIN, LOGOUT } from "../action/auth"

const initialState = {
    token: null,
    userId: null
}

export default authReducer = (state = initialState, action ) => {
    switch(action.type){
        case AUTO_LOGIN:
            return{
                token: action.token,
                userId: action.userId
            }
        case SIGNIN:
            return{
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return{
                token: action.token,
                userId: action.userId
            }
        case LOGOUT:
            console.log('red')
            return{
                token: null,
                userId: null
            }
        default:
            return state;
    }
}
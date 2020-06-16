import { LOGIN, SIGNUP, AUTOSIGNIN, LOGOUT } from "../Actions/auth";

const initialState = {
    token: null,
    userId: null
}

const authReducer  = (state = initialState, action) => {
    switch(action.type) {
        case LOGOUT:
            return initialState;
        case AUTOSIGNIN:
            return{
                token: action.token,
                userId: action.userId
            }
        case LOGIN:
            return{
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return{
                token: action.token,
                userId: action.userId
            }
        default:
            return state
    }
}

export default authReducer;
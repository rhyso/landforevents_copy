import { JOIN_START, LOGIN_USER } from './action-types'

export const initialState = {
    joinStart: false,
    joinFail: false,
    joinSuccess: false,
    joinError: false,
    signUpSource: null,
    user: null
}

export const joinAuthReducer = ( state= initialState, action ) =>{

    if (action.type === JOIN_START ){
        return {
            ...state,
            joinStart: true,
            signUpSource: (action.payload)
        }
    }
    if (action.type === LOGIN_USER ){
        return {
            ...state,
            loggedIn: true,
            signUpSource: (action.payload)
        }
    }
    return state
}

export default joinAuthReducer
import {  
   LOGIN_USER_SUCCESS,
   LOGIN_START,
   LOGIN_USER_FAIL,
   LOAD_ALL_USER_DATA
} from '../actions/action-types.js'
import { createAction } from 'redux-actions';


// export const createUser = (email, pass) => dispatch => {
//     firebase.auth().createUserWithEmailAndPassword(email, pass)
//         .then((resp) => {
//             return dispatch(createUserSuccess(resp));
//         })
//         .catch((error) => disptach(createUserFail));
// }


export const loginUserFail = (response) => dispatch => {
    dispatch({
       type: LOGIN_USER_FAIL,
       response
    });
}

export const loginUser = (response) => dispatch => {
     dispatch({
        type: LOGIN_USER_SUCCESS,
        response
     });
}

export const loginStart = (response) => dispatch => {
   dispatch({
      type: LOGIN_START,
      response
   });
}




// export const getUserPrivileges = () => dispatch => {
//    dispatch(createAction(USER_PRIVILEGES_GET)())
//    return menuService.getMenu()
//    .then (
//       privileges => dispatch(createAction(USER_PRIVILGES_COMPLETE)({privileges})),
//       error => dispatch(createAction(USER_PRIVILGES_ERROR)({error})),
//    )
// }


// export const loginStart = (dispatch,payload) => {
//     console.log('attempting login')
//     dispatch({type: LOGIN_START, payload: { isAttemptingLogin: true } })
// }

// export const loginError = (dispatch,payload) => {
//     console.log('login failed')
//     console.log(payload)
//     dispatch({type: LOGIN_ERROR, payload: { isAttemptingLogin: false, ...payload } })
// }


// export const loggedIn = (dispatch,payload) => {
//     console.log('login success')
//     console.log(payload)

//     const { uid, email, emailVerified } = payload
//     console.log(email, uid)
//     dispatch({type: LOGGED_IN, payload: { 
//         isLoggedIn: true, 
//         user : {
//             uid: uid,
//             email: email,
//             emailVerified :emailVerified
//         },
//         ...payload } 
//     })
// }
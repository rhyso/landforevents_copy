
import { CREATE_USER_SUCCESS, CREATE_USER_FAIL, 
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_START } from '../actions/action-types';

const initialState = {
    loggingIn: false,
    loggedIn: true,
    loggingOut: false,
    loginError: null,
    user: null,
    //add below to skip login
    // user: {
    //     uid: 'EWvoW0Dncoc7HNlnFyBkOYCTFlV',
    //     displayName: null,
    //     photoURL: null,
    //     email: 'rhys.thomas@rbs.co.uk',
    //     emailVerified: false,
    //     phoneNumber: null,
    //     isAnonymous: false,
    //     tenantId: null,
    //     providerData: [
    //       {
    //         uid: 'rhys.thomas@rbs.co.uk',
    //         displayName: null,
    //         photoURL: null,
    //         email: 'rhys.thomas@rbs.co.uk',
    //         phoneNumber: null,
    //         providerId: 'password'
    //       }
    //     ],
    //     apiKey: 'AIzaSyBsx86uH2iNe_TwhBg1uVoJo90kCET6Cfk',
    //     appName: '[DEFAULT]',
    //     authDomain: 'fieldsandbarnssand.firebaseapp.com',
    //     stsTokenManager: {
    //       apiKey: 'AIzaSyBsx86uH2iNe_TwhBg1uVoJo90kCET6Cfk',
    //       refreshToken: 'AE0u-NfmB1CgT4wO77sg4Kzhe8ezDlrJksdmOUg9PX5aUUkCkxsxAjMBSXU0wb4KqKM1scRiHTqzYZdj1MXLa6CbHA58qlNRRfPBG8vQbM3vtx_fKaq5jaurFAkP4C7IBStG9fjL-nUXLwc5ri88QEAqF1o_YuRJKKk1ffrFBSKPBravM8rgFawv-JSpF5Vn9rfJm8G0OnTevCPVYOb6SvyNEynL-BhNGw',
    //       accessToken: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYWJiMjI0NDBkYTAzMmM1ZDAwNDJjZGFhOWQyODVjZjhkMjAyYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmllbGRzYW5kYmFybnNzYW5kIiwiYXVkIjoiZmllbGRzYW5kYmFybnNzYW5kIiwiYXV0aF90aW1lIjoxNTg3MzMwNTc2LCJ1c2VyX2lkIjoiRVd2b1cwRG5jb2M3SE5sbkZ5QmtPWUNURmxWMiIsInN1YiI6IkVXdm9XMERuY29jN0hObG5GeUJrT1lDVEZsVjIiLCJpYXQiOjE1ODczMzA1NzYsImV4cCI6MTU4NzMzNDE3NiwiZW1haWwiOiJyaHlzLnRob21hc0ByYnMuY28udWsiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsicmh5cy50aG9tYXNAcmJzLmNvLnVrIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.iJ09tPY4K98-RzGdjPB56sSFp2oluUuVxQZKAy71pnlQ-3IkOYQuDY3pyvLPxG1A9oKxlIsuWt6BWjjh0t3TQ2SqNfUSm8Cv-y5aoq95s-z1UhNAsM8QXtAryG5xsL_AKmH_rnwReF8y7hWcK_Nu4o-3EF2hT3OvVZKeWjr7xjnUfgFm2c0eFOU_hIGbvZa3AjxHy0B3VGmhl6XtF3pYSxiQou4vEyPJ5EZWkskZjnJiRymOQNiIZiOKHAjOhtivoXReZMUNgK0xc8KSf5R4b8oiB7bVXR_OP4DhUJ8c2wsMq_ihj0Msp-at6EflBMPoMqwHBbNNxrhjBukmVBmIGg',
    //       expirationTime: 1587334176000
    //     },
    //     redirectEventId: null,
    //     lastLoginAt: '1587330576533',
    //     createdAt: '1585324235614',
    //     multiFactor: {
    //       enrolledFactors: []
    //     }
    // }
}

const auth = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_USER_SUCCESS:
            const user = action.response;
            return {
               ...state,
               loggedIn: true,
               user
            };
        case LOGIN_START:
            return {
                ...state,
                loggingIn: true,
            };
        case LOGIN_USER_FAIL:
            return {
                ...state,
                loggedIn: false,
                loginError: action.response
            };
        // case CREATE_USER_SUCCESS:
        //     return {
        //         ...state
        //     };    
        // case CREATE_USER_FAIL:
        //     return {
        //         ...state
        //     };   
        default:
            return state;
    }
}


export default auth;









// import { handleActions } from 'redux-actions'
// import { 
//     LOGIN_START, 
//     LOGGED_IN,
//     LOGOUT_START,
//     LOGGED_OUT,
//     LOGIN_ERROR, 
// } from '../actions/action-types.js'

// export const initialState ={
//     isAttemptingLogin: false,
//     isLoggedIn: false,
//     user: null,
//     hasError: false,
//     error:null
// }

// const loginReducer = handleActions({
//     [LOGIN_START]: (state, action) => ({
//         ...state,
//         isAttemptingLogin: true,
//         ...action.payload
//     }),
//     [LOGGED_IN]: (state, action) => ({
//         ...state,
//         isLoggedIn: true,
//         isAttemptingLogin: false,
//         error: false,
//         user: { ...action },
//         ...action.payload
//     }),
//     [LOGOUT_START]: (state, action) => ({
//         ...state,
//         isLoggedIn: false,
//         ...action.payload,
//     }),
//     [LOGGED_OUT]: (state, action) => ({
//         ...state,
//         isLoggedIn: false,
//         user:null,
//         ...action.payload,
//     }),
//     [LOGIN_ERROR]: (state, action) => ({
//         ...state,
//         user: null,
//         error: true,
//         ...action.payload,
//     })

// }, initialState)

// export default loginReducer


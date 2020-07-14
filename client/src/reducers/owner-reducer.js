import {FETCH_OWNERS_PENDING, FETCH_OWNERS_SUCCESS, FETCH_OWNERS_ERROR} from '../actions/action-types';

const initialState = {
    pending: false,
    owners: [],
    error: null
}

export function ownersReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_OWNERS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case FETCH_OWNERS_SUCCESS:
            console.log(action.owners)
            return {
                ...state,
                pending: false,
                owners: action.owners
            }
        case FETCH_OWNERS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export const getOwners = state => state.owners.owners;
export const getOwnersPending = state => state.owners.pending;
export const getOwnersError = state => state.owners.error;


// import { handleActions } from 'redux-actions'
// import { 
//     PERFORM_SEARCH, 
//     PERFORM_SEARCH_SUCCESS, 
//     PERFORM_SEARCH_ERROR } from '../actions/action-types.js'

// export const initialState ={
//     isFetching: false,
//     fetched: false,
//     error: null,
//     result: []
// }

// const ownerReducer = handleActions({
//     [PERFORM_SEARCH]: state => ({
//         ...state,
//         isFetching: true,
//     }),
//     [PERFORM_SEARCH_SUCCESS]: (state, action) => ({
//         ...state,
//         isFetching: false,
//         fetched: true,
//         result: action.payload,
//     }),
//     [PERFORM_SEARCH_ERROR]: state => ({
//         ...state,
//         isFetching: false,
//         error: true,
//     })

// }, initialState)

// export default ownerReducer



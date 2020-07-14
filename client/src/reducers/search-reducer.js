import { handleActions } from 'redux-actions'
import { 
    PERFORM_SEARCH, 
    PERFORM_SEARCH_SUCCESS, 
    PERFORM_SEARCH_ERROR } from '../actions/action-types.js'

export const initialState ={
    isFetching: false,
    fetched: false,
    error: null,
    result: []
}

const searchReducer = handleActions({
    [PERFORM_SEARCH]: state => ({
        ...state,
        isFetching: true,
    }),
    [PERFORM_SEARCH_SUCCESS]: (state, action) => ({
        ...state,
        isFetching: false,
        fetched: true,
        result: action.payload,
    }),
    [PERFORM_SEARCH_ERROR]: state => ({
        ...state,
        isFetching: false,
        error: true,
    })

}, initialState)

export default searchReducer



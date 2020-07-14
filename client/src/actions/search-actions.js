import { PERFORM_SEARCH, PERFORM_SEARCH_SUCCESS, PERFORM_SEARCH_ERROR } from '../actions/action-types.js'
import requestOpenAPi from '../api/search'

export const performSearchAction = (dispatch,payload) => {
    console.log('hit perform search action')
    dispatch({type: PERFORM_SEARCH })

    return requestOpenAPi()
    .then(res => {
            dispatch({type: PERFORM_SEARCH_SUCCESS, payload: {res}})
            console.log('here', res)
        },
        error => dispatch({type:PERFORM_SEARCH_ERROR})
    )
}



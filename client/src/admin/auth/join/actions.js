import { createAction } from 'redux-actions'
import * as actionTypes from './action-types'

export const joinStarted = payload => dispatch => {

    dispatch(createAction(actionTypes.JOIN_START)(payload))
    
}
export const loginUser = payload => dispatch => {

    dispatch(createAction(actionTypes.LOGIN_USER)(payload))
    
}

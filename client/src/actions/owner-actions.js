import {  FETCH_OWNERS_PENDING, FETCH_OWNERS_SUCCESS, FETCH_OWNERS_ERROR} from './action-types'

export function fetchOwnersPending() {
    return {
        type: FETCH_OWNERS_PENDING
    }
}

export function fetchOwnersSuccess(owners) {
    return {
        type: FETCH_OWNERS_SUCCESS,
        owners: owners
    }
}

export function fetchOwnersError(error) {
    return {
        type: FETCH_OWNERS_ERROR,
        error: error
    }
}
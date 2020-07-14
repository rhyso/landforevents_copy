import { createAction } from 'redux-actions'
import {  LOAD_ALL_USER_DATA_PENDING } from './action-types'

export function loadUserData() {
   //get all date
//         .then((resp) => {
//             return dispatch(createUserSuccess(resp));
//         })
//         .catch((error) => disptach(createUserFail));
    return {
        type: LOAD_ALL_USER_DATA_PENDING
    }
}


// export const getUserPrivileges = () => dispatch => {
//    dispatch(createAction(USER_PRIVILEGES_GET)())
//    return menuService.getMenu()
//    .then (
//       privileges => dispatch(createAction(USER_PRIVILGES_COMPLETE)({privileges})),
//       error => dispatch(createAction(USER_PRIVILGES_ERROR)({error})),
//    )
// }

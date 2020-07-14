import {fetchOwnersPending, fetchOwnersSuccess, fetchOwnersError} from '../actions/owner-actions';

function fetchOwners() {
    return dispatch => {
        dispatch(fetchOwnersPending());
        console.log(process.env.REACT_APP_DEV_API_URL)
        fetch (`http://localhost:3001/api/getOwners/`)
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            console.log(res)
            dispatch(fetchOwnersSuccess(res.owners))
            return res.owners;
        })
        .catch(error => {
            dispatch(fetchOwnersError(error));
        })
    }
}

export default fetchOwners;

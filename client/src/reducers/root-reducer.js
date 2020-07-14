import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import searchReducer  from './search-reducer'
import loginReducer  from './login-reducer'
import joinAuthReducer from '../admin/auth/join/reducer'
import { ownersReducer } from './owner-reducer';

export default combineReducers({
    form: reduxFormReducer, // mounted under "form"
    search: searchReducer,
    login: loginReducer,
    join: joinAuthReducer,
    owners: ownersReducer,
});

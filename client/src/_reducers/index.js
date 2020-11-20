import { combineReducers } from 'redux';
import user from './user_reducer';
import test from './test_reducer';


const rootReducer = combineReducers({
    user, test
});

export default rootReducer;
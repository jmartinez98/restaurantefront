import {createStore, combineReducers} from 'redux';
import authReducer from './auth'
import orderReducer from './oder'
const store = combineReducers({
    authReducer,
    orderReducer
}) 

export default createStore(store, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
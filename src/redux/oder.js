import {OrderActions} from './actions'

const initialState = {
    table: null,
    reserve: null,
    dishes: [],
    total: null
}

export default function orderReducer(state= initialState, action){
    switch (action.type) {
        case OrderActions.SET_ORDER:
            return {...state , dishes: action.payload.dishes, total: action.payload.total}
        case OrderActions.GET_TABLE: 
            return {...state, table: action.payload.num, reserve: action.payload.reserve,}
        default:
            return state
    }
}
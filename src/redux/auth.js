import {authActions} from './actions';
import {userData,deleteToken,saveToken} from '../utils/tokenFunctions';

let initialState = {
    token: null,
    nombre: null,
    correo: null,
    rol: null,
    id: null
};

let token = localStorage.getItem('token');
if (token) {
    console.log('prueba ',token)
    initialState = userData(token)
};

export default function authReducer (state= initialState, action){
    switch (action.type) {
        case authActions.LOGIN_SUCCESS:
            saveToken(action.payload.token)
            return{
                token: action.payload.token,
                nombre: action.payload.nombre,
                correo: action.payload.correo,
                rol: action.payload.rol,
                id: action.payload.id
            }
            
        case authActions.LOGOUT:
            deleteToken()

            return initialState
        default :
            return state;
    }
}
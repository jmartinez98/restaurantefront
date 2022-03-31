import jwt from 'jsonwebtoken';

export function userData (token){
    return {
        token: token,
        ...jwt.decode(token).usuario
    }
}

export function saveToken (token ){
    localStorage.setItem('token', token);
    localStorage.setItem('rol', jwt.decode(token).usuario.rol);
} 

export function getUserData() {
    let token = localStorage.getItem('token');
    return jwt.decode(token)?.usuario
}

export function deleteToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
}
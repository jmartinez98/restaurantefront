import Api from '../../../utils/ClientApi';

export async function formInitData(){
    let response
    try {
        const platos = await Api.get('/api/plato')
        response = {platos: platos.data.data}
    } catch (error) {
        response={
            error: error
        }
    }
    return new Promise((resolve, reject)=>{
        if (response.platos) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}

export async function addDish(data){
    let response
    try {
        const dish = await Api.post('/api/plato', data)
        
        response ={
            dish: dish.data
        }
    } catch (error) {
        response={error:error}
    }
    return new Promise((resolve, reject)=>{
        if (response.dish) {
            resolve(response)
        } else {
            reject(response)
        }
    })
}

export async function createMenu(data, dishes){
    let response
    let sendData
    try {
        sendData={
            ...data,
            platos: dishes.map(e=> e._id)
        }
        const menu = await Api.post('/api/menu', sendData)
        response={
            menu: menu.data
        }
    } catch (error) {
        response={
            error: error
        }
    }
    return new Promise((resolve,reject)=>{
        if (response.error) {
            reject(response)
        } else {
            resolve(response)
        }
    })
}

export function AddItems(userSelected , data) {
    const found = userSelected.find(element => element._id === data._id);
        if (found) {
            return userSelected
        }else{
            return[...userSelected, data]
            
        }   
}
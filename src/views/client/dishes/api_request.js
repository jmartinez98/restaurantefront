import Api from '../../../utils/ClientApi'
import {getUserData} from '../../../utils/tokenFunctions';
import {states} from '../../../utils/states'
export async function submit(reservaId, data, total) {
    let submitData = {
        reserva: reservaId,
        pedidos: data.map(e=> {
            return  {menu: e._id, cantidad: e.cantidad}
        }),
        total: total
    }
    let state = {
        dishes: [...data],
        total: total
    }
    let response
    try {
        const reserve = await Api.put(`/api/reserva/${reservaId}`,{estado: 'pedido'})
        const pedido = await Api.post('/api/pedido', submitData)    
        response= {
            reserva: reserve.data,
            pedido: pedido.data, 
            stado: state
        } 
    } catch (error) {
        response = {
            state: false,
            error: error
        }
    }
    return new Promise((resolve, reject)=>{
        if (response.reserva) {
            resolve(response)
        } else {
            reject(response)    
        }
        

    })
}

export async function initialData (){
    const userData= getUserData();
    let response 
    let pageAccess = false

    try {
        const reserve = await Api.get(`/api/reserva/usuario/${userData.id}`)
        const menu = await Api.get('/api/menu')
        let userReserves= reserve.data.data
        let lastReserveState
        if (userReserves.length>0) {
            lastReserveState = userReserves[userReserves.length - 1]
            if (lastReserveState.estado === states.reserva) {
                pageAccess= true
                
            }
        }
        response = {
            reserva: lastReserveState,
            pageAccess: pageAccess,
            menu: menu.data.data
        }
    } catch (error) {
        response = {
            state: false,
            error: error
        }
    }
    return new Promise((resolve, reject)=>{
        if (response.reserva) {
            resolve(response)
        } else {
            reject(response)    
        }
        

    })
}

export function AddItems(userSelected , data) {
    const found = userSelected.find(element => element._id === data._id);
        if (found) {
            let new_data  = userSelected.filter(plato=>{
                if(plato._id===data._id){
                    plato['cantidad'] += 1
                    plato['total'] = data.precio*plato.cantidad 
                }
                return plato
            },[])
            return new_data
        }else{
            data['total'] = data.precio
            data['cantidad'] = 1
            return[...userSelected, data]
        }
}
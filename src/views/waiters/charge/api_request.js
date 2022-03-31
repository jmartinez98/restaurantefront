import Api from '../../../utils/ClientApi';

export async function submitCharge(tableId, reserveId) {
    let response
    try {
        const table = await Api.put(`/api/mesa/${tableId}`,{estado: true});
        const reserve = await  Api.put(`/api/reserva/${reserveId}`,{estado: 'finalizado'})
        response={
            table: table.data,
            reserve: reserve.data
        }
    } catch (error) {
        response={
            error: error
        }
    }
    return new Promise((resolve, reject)=>{
        if (response.error) {
            reject(response)
        } else {
            resolve(response)
        }
    })
}
import React, {useState, useEffect} from 'react'
import {Col, Row, CardTitle,CardSubtitle,CardText} from 'reactstrap';
import {SecondaryBtn, WaringBtn} from '../../../components/Buttons/Buttons';
import {ItemCard} from '../../../components/cards/Cards';
import Api from '../../../utils/ClientApi';
import Loading from '../../../components/animations/loading';
import {URL} from '../../../utils/api';
import io from 'socket.io-client';
const connectSocketServer=()=>{
    const socket = io(URL,{transports: ['websocket']});
    return socket
}

export default function Dishes() {
    const [loading, setLoading] = useState(false);
    const [menus, setMenus] = useState([]);
    const [orders, setOrders] = useState([]);
    const [prepareDish, setPrepareDish] = useState(null);
    const [ socket ] = useState(connectSocketServer());
    const submit = () =>{
        Api.put(`/api/reserva/${prepareDish.reserva._id}`, {estado: 'preparado'}).then(()=>{
            setPrepareDish(null);
            setLoading(true)
            socket.emit('cocinero-mesero');
        })
    }
    const getPdidos=()=>{
        Api.get('/api/pedido').then(e=>{
            
            let data = e.data.data.filter(order=> order.reserva.estado === "pedido")
            let currentDish=data[0]
            setLoading(false)
            setOrders(data)
            setPrepareDish(currentDish)
        })
    }
    useEffect(()=>{
        getPdidos()
    },[loading])
    useEffect(()=>{
        Api.get('/api/menu').then(e=>{
            setMenus(e.data.data);
        })
    },[])
    useEffect(() => {
        socket.on('cliente-cocinero', (data) => {
            getPdidos()
        });
        
    }, [orders])
    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <Row style={{marginTop: '10px'}}>
                <Col xs = {12} lg={8}>
                    <ItemCard className='d-flex justify-content-center align-items-center scroll' style={{height: '60vh', overflowY: 'scroll'}}>
                        {prepareDish?(
                            <div style={{padding: '20px'}}>
                                <CardTitle tag="h5">Mesa {prepareDish.reserva.mesa.numero}</CardTitle>
                                <div>
                                    <ul className="list-group">
                                        {prepareDish.pedidos.map(e=>(
                                            <li key={e._id} className="list-group-item" style={{backgroundColor: '#fff0'}}>
                                                <div className="d-flex justify-content-between">
                                                    
                                                    <b>{e.cantidad}</b> 
                                                    <div>
                                                        {e.menu.nombre}
                                                    </div> 
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {/* <CardText>Tiempo de espera: <b>00:05</b></CardText> */}
                                <SecondaryBtn style={{fontSize: '30px', width: '100%'}} onClick={submit}>
                                    Plato preparado
                                </SecondaryBtn>
                            </div>
                        ):(
                            <h1>No hay platos por preparar</h1>
                        )


                        }
                        

                        
                    </ItemCard>
                </Col>
                <Col xs = {12} lg={4}>
                    <ItemCard className="scroll"  style={{height: '60vh', overflow: 'hidden', overflowY: 'scroll'}} >
                        <div>
                            <h5>Numero de platos pedidos</h5>
                        </div>
                        <ul className="list-group">
                            {orders.map(order=>(
                                <div key={order._id}>
                                    <p> mesa {order.reserva.mesa.numero}</p>
                                    {
                                        order.pedidos.map(pedido=>(
                                            <li key={pedido._id} className="list-group-item">
                                                
                                                <div className="d-flex justify-content-between">
                                                    <div>
                                                        {pedido.menu.nombre}
                                                    </div>
                                                    <div>
                                                        <b>{pedido.cantidad}</b>
                                                    </div>  
                                                </div>
                                            </li>
                                        ))
                                    }
                                    
                                </div>
                                
                               
                            ))}
                           
                        </ul>
                        
                        
                    </ItemCard>
                </Col>
            </Row>
            <Row  style={{marginTop: '10px'}}>
                <h4>Menu</h4>
            </Row>
            <Row style={{marginTop: '10px'}}>
                {menus.map(data=>(
                    <Col key={data._id}>
                        <ItemCard>
                            <CardTitle tag="h6">{data.nombre}</CardTitle>
                            <div>
                                <ul className="list-group">
                                    {data.platos.map(plato=>(
                                        <li key={plato._id} className="list-group-item" style={{backgroundColor: '#fff0'}}>
                                            {plato.nombre}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </ItemCard>
                    </Col>
                ))}
                
                
            </Row>
            
        </>
        
    )
}

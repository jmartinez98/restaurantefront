import React,{useState, useEffect} from 'react';
import {Row, Col} from 'reactstrap';
import {useSelector} from 'react-redux';
import {SecondaryBtn} from '../../../components/Buttons/Buttons';
import {ItemCard} from '../../../components/cards/Cards';
import {MenuContent} from '../dishes/styles';
import Api from '../../../utils/ClientApi';
import {URL} from '../../../utils/api';
import {useHistory} from 'react-router-dom';
import {states} from '../../../utils/states';
import io from 'socket.io-client';
const connectSocketServer=()=>{
    const socket = io(URL,{transports: ['websocket']});
    return socket
}
export default function Orders() {
    const [pedido, setPedido] = useState([]);
    const selector = useSelector(state=> state.orderReducer);
    const history = useHistory();
    const [allData, setAllData]= useState({});
    const [orderReady,  setOrderready] = useState(false);
    const [socket ] = useState(connectSocketServer())
    const goTooBack =()=>history.push('/dashboard');

    const getData=()=>{
        Api.get(`/api/pedido/reserva/${selector.reserve}`).then(e=>{
            let order= e.data.data
            if (order.length>0) {
                setPedido(order[order.length-1].pedidos);
                setAllData(order[order.length-1]);
                if (order[order.length-1].reserva.estado===states.preparado) {
                    setOrderready(true)
                }
            }
        })
        .catch(()=>{
            goTooBack()
        })
    }
    useEffect(() => {
        socket.on('cocinero-mesero', (data) => {
            getData()
        });
        
    }, [allData])

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Row>
                {orderReady?(
                    <Col>
                        <h3 className="text-center">Tu orden esta ya esta Lista!</h3>
                        <small className="text-center">Estamos llevando tu plato al a mesa</small>
                        
                    </Col>
                ):(
                    <Col>
                        <h3 className="text-center">Tu orden esta en Proceso</h3>
                        <small className="text-center">Estamos llevando tu plato al a mesa</small>
                    </Col>
                )}
               
            </Row>
            <Row>
                <Col>
                    <h3 className="text-center">Tu Orden </h3>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={12} md={9} lg={8}>
                    <Row>
                        {pedido.map((data)=>(
                            <Col style={{marginBlock: '5px'}} key={data._id} xs={12} sm={12} md={6} lg={4}>
                                <ItemCard>
                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                        <h5>{data.cantidad} {data.menu.nombre}</h5>
                                        <small>${data.menu.precio} c/u</small>
                                    </div>
                                    <MenuContent className={'scroll'}>
                                        {data.menu.platos.map(plato=>(
                                            <div key={plato._id} >
                                                <div className="d-flex w-100 justify-content-between">
                                                    <h6 className="mb-1">{plato.nombre}</h6>

                                                </div>
                                                <p className="mb-1">{plato.descripcion??''}</p>
                                            </div>
                                            
                                        ))}
                                    </MenuContent>
                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                        
                                        <h4>$ {data.menu.precio*data.cantidad}</h4>
                                    </div>
                                </ItemCard>
                            </Col>
                        ))}
                        {pedido.length>0?(
                            <Col style={{marginBlock: '5px'}}  xs={12} sm={12} md={6} lg={4}>
                                <ItemCard>
                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                        <h4>Total</h4>
                                    </div>
                                    <div className="d-flex w-100 justify-content-between align-items-center">
                                        
                                        <h3>$ {allData.total} </h3>
                                    </div>
                                </ItemCard>
                            </Col>
                        ):(
                            <ItemCard>
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    <h4>Todavia no tienes un pedido</h4>
                                </div>
                                <div className="d-flex w-100 justify-content-between align-items-center">
                                    
                                <SecondaryBtn onClick={()=>history.goBack()}>
                                    Continuar
                                </SecondaryBtn>
                                </div>
                            </ItemCard>
                        )}   
                    </Row>
                </Col>
            </Row>
        </>
        
    )
}

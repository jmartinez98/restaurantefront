import React, {useEffect, useState} from 'react';
import {Col, Row, CardTitle,CardSubtitle,CardText, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {ItemCard} from '../../../components/cards/Cards';
import {SecondaryBtn, PrimaryBtn} from '../../../components/Buttons/Buttons';
import Loading from '../../../components/animations/loading';
import Api from '../../../utils/ClientApi';
import {URL} from '../../../utils/api';
import io from 'socket.io-client';
const connectSocketServer=()=>{
    const socket = io(URL,{transports: ['websocket']});
    return socket
}
export default function Tables() {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [deliveData, setDeliveData] = useState(null);
    const [modal, setModal] = useState(false);
    const [socket ] = useState(connectSocketServer());
    const toggle = () => setModal(!modal);

    const deliver=(data) =>{
        setDeliveData(data)
        setModal(true)
    }

    const submit=()=>{
        console.log("uwu")
        Api.put(`/api/reserva/${deliveData?.reserva?._id}`,{estado: 'entregado'}).then(e=>{
            setModal(false)
            setLoading(true)
        }).catch(()=>{
            setModal(false)
        })
    }
    const getOrders=()=>{
        Api.get('/api/pedido').then(e=>{
            let data= e.data.data.filter( e=> e.reserva.estado ==="preparado" )
            setOrders(data)
            setLoading(false)
        })
    }
    
    useEffect(() => {
        getOrders()
    }, [loading])
    useEffect(() => {
        socket.on('cocinero-mesero', (data) => {
            getOrders()
        })
    }, [orders])



    if (loading) {
        return <Loading/>
    }

    return (
        <>
            <Row style={{marginTop: '15px'}}>
                {orders.map(order=>(
                    <Col key={order._id} md={4} style={{height: '300px'}}>
                        <ItemCard>
                            <div style={{padding: '20px'}}>
                                <CardTitle tag="h5">Mesa {order.reserva.mesa.numero}</CardTitle>
                                
                                <CardText className="scroll" style={{height:70}}>
                                    {order.pedidos.map(dishes=>(
                                        <li key={dishes._id}><b>{dishes.cantidad}</b> {dishes.menu.nombre}</li>
                                    ))}
                                    
                                </CardText>
                                {/* <CardText>Hora de pedido: <b>{order.reserva.fecha}</b></CardText> */}
                            </div>
                            <SecondaryBtn onClick={()=>deliver(order)}>
                                Entregar  
                            </SecondaryBtn>
                        </ItemCard>
                    </Col>
                ))}
                {!orders.length>0?(
                    <Col>
                        <h1>Sin mesas por despachar </h1>
                    </Col>
                    
                ):null}
                <DeliverModal submit={submit} data={deliveData} modal={modal} toggle={toggle}/>
            </Row>
        </>
    )
}


const DeliverModal = ({submit, data, modal, toggle}) =>(
    
    <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}> Mesa {data?.reserva?.mesa?.numero}</ModalHeader>
        <ModalBody>
            <ItemCard>
                <CardText>Entregar plato a mesa  ?</CardText>
            </ItemCard>
        </ModalBody>
        <ModalFooter>
            <PrimaryBtn onClick={submit}>
                 Entregar 
            </PrimaryBtn>
            <SecondaryBtn onClick={toggle}>
                Cancelar
            </SecondaryBtn>
        </ModalFooter>
    </Modal>
)

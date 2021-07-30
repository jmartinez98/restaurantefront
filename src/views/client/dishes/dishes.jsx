import React,{useState,useEffect} from 'react';
import {ItemCard, BtnCard} from '../../../components/cards/Cards';
import {Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {PrimaryBtn, SecondaryBtn} from '../../../components/Buttons/Buttons';
import {StikyContent, RowResponsive, MenuContent} from './styles';
import { TiDelete } from "react-icons/ti";
import {useSelector, useDispatch} from 'react-redux';
import {OrderActions} from '../../../redux/actions';
import {submit, initialData, AddItems} from './api_request';
import {useHistory} from 'react-router-dom';
import {CenterText,H2} from '../tables/style';
import Loading from '../../../components/animations/loading';
import {URL} from '../../../utils/api';
import io from 'socket.io-client';
const connectSocketServer=()=>{
    const socket = io(URL,{transports: ['websocket']});
    return socket
}
export default function Dishes() {
    const [userSelected, setUserSelected] = useState([]);
    const [total, setTotal] = useState(0);
    const [menu, setMenu] = useState([]);
    const [loading, setLoadig] = useState(false);
    const [modal, setModal] = useState(false);
    const [access, setAccess] = useState(true);
    const [socket ] = useState(connectSocketServer());
    const reserveID = useSelector(state=>state.orderReducer.reserve);
    const history = useHistory();
    const dispatch = useDispatch();
    
    const toggle = () => {  
        let acumulator = 0
        userSelected.forEach(e=>{
            acumulator += e.total
        })
        setTotal(acumulator)
        setModal(!modal)
    }

    const selectItem=(data)=>{
        setUserSelected(AddItems(userSelected,data))
    }

    const deleteItem =(id)=>{
        let item = userSelected.filter(plato => plato._id !== id);
        setUserSelected(item)
    }

    const submit_order = () => {
        setLoadig(true)
        submit(reserveID,userSelected,total).then(e=>{
            socket.emit('cliente-cocinero');
            dispatch({type: OrderActions.SET_ORDER, payload: e.stado})
            
            history.push('/dashboard/order')
        })
        .catch(e=>{
            setLoadig(false)
        })
        
    }
    useEffect(() => {
        setLoadig(true)
        initialData().then(e=>{
            setAccess(e.pageAccess)
            setMenu(e.menu)
            setLoadig(false)
        })
        .catch(e=>{
            setLoadig(false)
        })
    }, [])

    if (!access) {
        return(
            <Row>
                <Col style={{height: 300}} >
                    <BtnCard onClick={()=> history.push('/dashboard/order')}>
                        <CenterText>
                            <H2> ya estan procesando tu pedido</H2>
                            <H2>Continuar</H2>
                        </CenterText>
                    </BtnCard>
                </Col>
            </Row>
        )
    }
    if (loading) {
        return(
            <Loading/>
         )
    }else{
        return (
            <>
                <Row>
                    <Col>
                        <h2 className="text-center">Elige Tus Platos</h2>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={3} lg={4}>
                        <StikyContent >
                            <SelectedItems data={userSelected} deleteItem={deleteItem}/>
                            <Row>
                                <Col >
                                    <div className="d-flex justify-content-center">
                                        <PrimaryBtn onClick={toggle}>
                                            <h4 style={{margin: 0}}> Ordenar </h4>
                                        </PrimaryBtn>    
                                    </div>
                                </Col>
                            </Row>
                        </StikyContent>
                        
                    </Col>
                    <Col xs={12} sm={12} md={9} lg={8}>
                        <Row>
                            {menu.map((data)=>(
                                <Col style={{marginBlock: '5px'}} key={data._id} xs={12} sm={12} md={6} lg={4}>
                                    <ItemCard>
                                        <h5>{data.nombre}</h5>
                                        <MenuContent className={'scroll'}>
                                            {data.platos.map(plato=>(
                                                <div key={plato._id} >
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h6 className="mb-1">{plato.nombre}</h6>
                                                    </div>
                                                    <p className="mb-1">{plato.descripcion??''}</p>
                                                </div>
                                                
                                            ))}
                                        </MenuContent>
                                    
                                        <div className="d-flex w-100 justify-content-between align-items-center">
                                            <SecondaryBtn onClick={()=>selectItem(data)}>Agregar</SecondaryBtn>
                                            <h4>$ {data.precio}</h4>
                                        </div>
                                        
                                    </ItemCard>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>

                <div>
                    
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Pedido</ModalHeader>
                        <ModalBody>
                            {userSelected.map((plato)=>(
                                    <Col key = {plato._id} style={{marginBlock: '5px'}} xs={12}>
                                        <div className="d-flex w-100 justify-content-between align-items-center">
                                            <h6>{plato.nombre}</h6>
                                            <h6>{plato.cantidad}</h6>
                                            <h5>$ {plato.total}</h5>
                                        </div>
                                    </Col>
                                ))
                            }
                            <div className="d-flex w-100 justify-content-between align-items-center">
                                <h6>Total:</h6>
                                <h5>$ {total}</h5>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                        <Button color="primary" disabled={userSelected.length===0?true: false} onClick={submit_order}>Ordenar</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancelar</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </>
        )
    }
}

const SelectedItems = ({data, deleteItem}) => {
    return(
        <RowResponsive className={'scroll'}>
            {data.map((plato)=>(
                <Col key={plato._id} style={{marginBlock: '5px'}} xs={12}>
                    <ItemCard>
                        <div className="d-flex w-100 justify-content-between align-items-center">
                            <h5>{plato.nombre}</h5>
                            <h2>{plato.cantidad}</h2>
                            <h3>$ {plato.total}</h3>
                            <TiDelete style={{cursor: 'pointer'}} onClick={()=>deleteItem(plato._id)} size={30}/>
                        </div>
                    </ItemCard>
                </Col>
            ))
            }
        </RowResponsive>
    )
}
import React, {useState, useEffect} from 'react';
import {ItemCard} from '../../../components/cards/Cards';
import { Form, FormGroup, Label, Input, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, UncontrolledAlert } from 'reactstrap';
import {SecondaryBtn, PrimaryBtn, WaringBtn} from '../../../components/Buttons/Buttons';
import {formInitData, addDish, AddItems, createMenu} from './api_request';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom';
export default function AddMenuForm() {
    const [modal, setModal] = useState(false);
    const [platos, setPlatos]= useState([]);
    const history = useHistory()
    const [loading , setLoadig] = useState(false);
    const [error, setError] = useState(false);
    const [newDish, setNewDish] = useState(false);
    const [menuDishes, setMenuDishes] = useState([])
    const menuFormik = useFormik({
        initialValues: {nombre:"", precio: ""},
        validationSchema: yup.object(menuSchema()),
        onSubmit: (form)=>{
            createMenu(form, menuDishes)
            .then(e=>{
                history.replace("/dashboard/menu")
            }).catch((e)=>{
                console.log(e)
            })
        }
    })
    const dishesFormik = useFormik({
        initialValues:{nombre:"", descripcion: ""},
        validationSchema: yup.object(disheSchema()),
        onSubmit: (form)=>{
            addNewDish(form)
            
        }
    })

    const toggle = () => setModal(!modal);
    const addNewDish = (form) =>{
        setLoadig(true)
        addDish(form).then(e=>{
            setNewDish(true)
            setModal(false)
        })
        .catch((e)=>{
            setModal(false)
        })
    }

    const addDishesToMenu = (data) =>{
        setMenuDishes(AddItems(menuDishes, data))
    }
    const deleteItem =(id)=>{
        let item = menuDishes.filter(plato => plato._id !== id);
        setMenuDishes(item)
    }
    useEffect(() => {
        formInitData().then(e=>{
            setPlatos(e.platos)
            setNewDish(false)
            setLoadig(false)
        })
        .catch(()=>{
            setError(true)
            setNewDish(false)
            setLoadig(false)
        })
    }, [newDish])
    return (
        <>
        <ItemCard style= {{marginTop: '15px'}}>
            <UncontrolledAlert color="warning" isOpen={error} toggle={()=>setError(false)}>
                Ocurrio un error intentalo nuevamente
            </UncontrolledAlert>
            <Form onSubmit={menuFormik.handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="nombre">Nombre del menu</Label>
                            <Input type="text" invalid={menuFormik.errors.nombre?true:false} onChange={menuFormik.handleChange} name="nombre" id="nombre" placeholder="Ej: Desayuno, Almuerzo , Desatuno Continental etc." />
                        </FormGroup>
                        
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="precio">Precio</Label>
                            <Input type="number" step=".01" invalid={menuFormik.errors.precio?true:false} onChange={menuFormik.handleChange} name="precio" id="precio" placeholder="Precio"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ListGroup>
                            {menuDishes.map(dish=>(
                                <ListGroupItem key={dish._id} style={{backgroundColor: '#fff0'}}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                        <ListGroupItemHeading>{dish.nombre}</ListGroupItemHeading>
                                        <ListGroupItemText>
                                            {dish.descripcion}
                                        </ListGroupItemText>
                                        </div>  
                                        <WaringBtn type="button" onClick={()=>deleteItem(dish._id)}>Quitar</WaringBtn>    
                                    </div>
                                    
                                </ListGroupItem>
                            ))}
                            
                        </ListGroup>
                    </Col>
                </Row>
                <Row style={{marginBlock: '15px'}}>
                    <Col>
                        <PrimaryBtn type="submit"  disabled={menuDishes.length>0 && !loading?false: true}>Crear</PrimaryBtn>
                    </Col>
                </Row>
            </Form>
        </ItemCard>
        <Row>
            <Col xs={12} style={{marginBlock: '10px'}}>
                <SecondaryBtn type="button" onClick={toggle}>Crear nuevo plato</SecondaryBtn>{' '}
                <AddDishesModal modal={modal} toggle={toggle}  formik={dishesFormik}/>
                
            </Col>
        </Row>
        <Row >
            {loading?(
                <div>cargando</div>
            ):(
                platos.map(plato=>(
                    <Col key={plato._id} xs={6} md={4} lg={3} style={{marginBlock: 10}}>
                        <ItemCard>
                            <h6>{plato.nombre}</h6>
                            <p>{plato.descripcion??"-"}</p>
                            <SecondaryBtn type="button" onClick={()=>addDishesToMenu(plato)}>Agregar</SecondaryBtn>
                        </ItemCard>
                        
                    </Col>
                ))
            )}
            
        </Row>
        </>
    )
}


const AddDishesModal=({modal,toggle, formik, loading})=>(
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Crear Plato</ModalHeader>
        <Form onSubmit={formik.handleSubmit}>
            <ModalBody>
                <FormGroup>
                    <Label for="nombre">Nombre del Plato</Label>
                    <Input type="text" invalid={formik.errors.nombre?true:false} onChange={formik.handleChange} name="nombre" id="nombre" placeholder="Ej: Seco de Pollo, Encebollado, Coca Cola, Jugo etc." />
                </FormGroup>
                <FormGroup>
                    <Label for="descripcion">Descripcion del plato</Label>
                    <Input type="text" invalid={formik.errors.descripcion?true:false} onChange={formik.handleChange} name="descripcion" id="descripcion" placeholder="Ej: Arroz con pollo al jugo, Jugo de naranja etc." />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                {loading?null:(
                    <>
                        <PrimaryBtn type="submit">Crear</PrimaryBtn>{' '}
                        <SecondaryBtn type="button" onClick={toggle}>Cancelar</SecondaryBtn>
                    </>
                )}
                
            </ModalFooter>
            
        </Form>
        
      </Modal>
    </div>
)

function menuSchema(){
    return{
        nombre: yup.string().required(true),
        precio: yup.number().required(true)
    }
}

function disheSchema(){
    return{
        nombre: yup.string().required(true),
        descripcion: yup.string().required(true),
    }
}
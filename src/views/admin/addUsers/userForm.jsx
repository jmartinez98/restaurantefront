import React,{useState, useEffect} from 'react';
import {ItemCard} from '../../../components/cards/Cards';
import { Form, FormGroup, Label, Input, Row, Col,Alert} from 'reactstrap';
import {PrimaryBtn,SecondaryBtn} from '../../../components/Buttons/Buttons';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom';
import Loading from '../../../components/animations/loading';
import Api from '../../../utils/ClientApi';
export default function UserForm() {
    const history = useHistory();
    const [isEdit, setIsEdit] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [loading, setLoading] = useState(false);
    const [initialValues, setinitialValues] = useState({
            nombre : "",
            correo : "",
            password: "",
            rol: ""
        });
    const [done, setDone] = useState(false);
    const goBack=()=> history.goBack();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema : yup.object(validationSchema()),
        enableReinitialize: true, 
        onSubmit:(form)=>{
            if (isEdit) {
                Api.put(`/api/usuario/${history.location.state.id}`,form).then(e=>{
                    setDone(true)
                })
            }else{
                Api.post(`/api/usuario`, form).then(e=>{
                    setDone(true)
                })
            }
        }
    });
    useEffect(()=>{
        if (history.location.state) {
            setLoading(true)
            setIsEdit(true)
            setReadOnly(true)
            let userId= history.location.state.id
            Api.get(`api/usuario/${userId}`).
            then(e=>{
                
                const {nombre, correo, rol} = e.data.data;
                setinitialValues({
                    nombre : nombre,
                    correo : correo,
                    password: "",
                    rol: rol
                })
                setLoading(false)
            })
            .catch(e=>{
                console.log(e)
            })
        }
    },[])

    if (loading) {
        return <Loading/>
    }
    if (done) {
        return(
            <Row>
                <Col>
                    <Alert  color="info">
                        
                        <div class="d-flex justify-content-between">
                            Usuario Guardado Correctamente
                            <SecondaryBtn type="button" onClick={goBack}>Continuar</SecondaryBtn>
                        </div>
                        
                    </Alert >
                </Col>
            </Row>
        )
    }
    return (
        <ItemCard style= {{marginTop: '15px'}}>
            {isEdit?(
                <Row>
                    <Col>
                        <div class="d-flex justify-content-end">
                            <SecondaryBtn onClick={()=>setReadOnly(false)}>
                                    Editar
                            </SecondaryBtn>
                        </div>
                    </Col>
                </Row>
            ):null}
            
            <Form onSubmit={formik.handleSubmit} >
                <fieldset disabled={readOnly}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="nombre">Usuario</Label>
                                <Input type="text" value={formik.values.nombre} invalid={formik.errors.nombre?true:false} onChange={formik.handleChange} name="nombre" id="nombre" placeholder="" />
                            </FormGroup>
                            
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="email">Correo</Label>
                                <Input type="email" value={formik.values.correo} invalid={formik.errors.correo?true:false} onChange={formik.handleChange} name="correo" id="email" placeholder="ejemplo@email.com"/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroup>
                                <Label for="password">Contraseña</Label>
                                <Input type="password" value={formik.values.password} invalid={formik.errors.password?true:false} onChange={formik.handleChange} name="password" id="password" placeholder="" />
                            </FormGroup>
                            
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="Cargo">Rol</Label>
                                {readOnly?(
                                    <Input type="text" value={formik.values.rol} onChange={formik.handleChange} name="rol" id="Cargo" placeholder="" />
                                ):(
                                    <Input type="select" invalid={formik.errors.rol?true:false} onChange={formik.handleChange} name="rol" id="Cargo">
                                        <option selected disabled>Eliga un Cargo</option>
                                        <option>Cocinero</option>
                                        <option>Mesero</option>
                                    </Input>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    
                </fieldset>
                <Row style={{marginBlock: '15px'}}>
                    <Col xs={12} md={6} lg={4}>
                        <div class="d-flex justify-content-around">
                            <PrimaryBtn disabled={readOnly} type="submit">
                               {isEdit?"Guardar": "Crear"}
                            </PrimaryBtn>
                            
                            <SecondaryBtn type="button" onClick={goBack}>Cancelar</SecondaryBtn>
                        </div>
                        
                    </Col>
                    
                </Row>
                
            </Form>
        </ItemCard>
    )
}


function validationSchema() {
    return {
        nombre: yup.string().required(true),
        correo: yup.string().email().required(true),
        rol: yup.string().ensure().required(true),
        password: yup.string().required(true)
    }
    
}
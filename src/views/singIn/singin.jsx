import React,{useState, useEffect} from 'react'
import {
    Container , Row, Col, Form, 
    FormGroup, Label, Input, UncontrolledAlert
} from 'reactstrap';
import {SimpleCard} from '../../components/cards/Cards';
import {PrimaryBtn, SecondaryBtn} from '../../components/Buttons/Buttons';
import {useHistory, Redirect, useLocation} from 'react-router-dom';
import  {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../../components/animations/loading';
import {authActions} from '../../redux/actions';
import jwt from 'jsonwebtoken';
import * as yup  from 'yup';
import Api from '../../utils/api';
export default function Singin() {
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const isLoggedIn = useSelector((state)=>state.authReducer.token);
    const [loading, setLoading] =useState(false);
    const [error, setError]= useState(false);
    const [redirectTo, setRedirectTo] = useState(false)
    const back = () => history.goBack();
    const formik = useFormik({
        initialValues: InitialValues(),
        validationSchema: yup.object(validationSchema()),
        onSubmit: (form)=>{
            let data={
                nombre: form.nombre,
                correo: form.correo,
                password: form.password,
                rol: 'cliente'
            }
            submit(data)
        }
    });
    const submit =(data)=>{
        setLoading(true)
        Api.post('api/usuario',data)
        .then(e=>{
            Api.post('api/usuario/login',{correo: data.correo, password: data.password})
            .then(response=>{
                let userData= {
                    ...jwt.decode(response.data.token).usuario,
                    token: response.data.token
                }
                dispatch({type: authActions.LOGIN_SUCCESS, payload: userData})
            })
            .catch((e)=>{
                setError(true)
                setLoading(false)
            })
        })
        .catch((e)=>{
            setError(true)
            setLoading(false)
        })
    }


    useEffect(()=>{
        if (isLoggedIn) {
            setRedirectTo(true)
        }
    },[isLoggedIn])
    let {from} = location.state || {from: {pathname:'/dashboard'}}
    if(redirectTo){
        return <Redirect to={from}/>
    }

    if (loading) {
        return(
            <Loading/>
        )
    }

    return (
        <Container >
            <Row style={{height:'100vh'}} className={'justify-content-center align-items-center'}>
                <Col xs={12} md={8} lg={6}>
                    <SimpleCard>
                        <h5>Registro</h5>
                        <UncontrolledAlert color="warning" isOpen={error} toggle={()=>setError(false)}>
                                Correo o Contraseña Incorrectos
                        </UncontrolledAlert>
                        <Form  onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" invalid={formik.errors.correo?true:false} onChange={formik.handleChange} name="correo" id="exampleEmail" placeholder="Ingrese un correo" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="name">Nombre</Label>
                                <Input type="text" invalid={formik.errors.nombre?true:false} onChange={formik.handleChange} name="nombre" id="name" placeholder="Ingrese un nombre" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" invalid={formik.errors.password?true:false} onChange={formik.handleChange} name="password" id="examplePassword" placeholder="Ingrese su contraseña" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Password">Verificar Contraseña</Label>
                                <Input type="password" invalid={formik.errors.password2?true:false} onChange={formik.handleChange} name="password2" id="Password" placeholder="Ingrese su contraseña otra vez" />
                            </FormGroup>
                            <div className="d-flex justify-content-between align-items-center">
                                <PrimaryBtn  disabled={loading} type='submit' >Registrase</PrimaryBtn>
                                <SecondaryBtn disabled={loading} type='button' onClick={back} >Cancelar</SecondaryBtn>
                            </div>
                            
                        </Form>
                    </SimpleCard>
                </Col>
            </Row>
        </Container>
    )
}

function InitialValues(){
    return{
        correo: "",
        nombre:"",
        password: "",
        password2: ""
    }
}

function validationSchema (){
    return{
        correo: yup.string().email().required(true),
        nombre: yup.string().required(true),
        password: yup.string().required(true),
        password2: yup.string().oneOf([yup.ref('password')]).required(true)
    }
}
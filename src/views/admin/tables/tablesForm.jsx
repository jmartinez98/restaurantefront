import React,{useState} from 'react';
import {ItemCard} from '../../../components/cards/Cards';
import { Form, FormGroup, Label, Input, Row, Col,Alert} from 'reactstrap';
import {PrimaryBtn,SecondaryBtn} from '../../../components/Buttons/Buttons';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {useHistory} from 'react-router-dom';
import Loading from '../../../components/animations/loading';
import Api from '../../../utils/ClientApi';
export default function TablesForm() {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const goBack=()=> history.goBack();
    const formik = useFormik({
        initialValues: {numero : 0 },
        validationSchema : yup.object(validationSchema()),
        onSubmit:(form)=>{
            setLoading(true)
            Api.post('/api/mesa', form)
            .then(()=> setLoading(false))
            .then(()=> setDone(true))
        }
    });
    if (loading) {
        return <Loading/>
    }
    if (done) {
        return(
            <Row>
                <Col>
                    <Alert  color="info">
                        
                        <div class="d-flex justify-content-between">
                            Mesa creada Correctamente
                            <SecondaryBtn type="button" onClick={goBack}>Continuar</SecondaryBtn>
                        </div>
                        
                    </Alert >
                </Col>
            </Row>
        )
    }
    return (
        <ItemCard style= {{marginTop: '15px'}}>
            
            <Form onSubmit={formik.handleSubmit} >
                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="nombre">Numero de mesa</Label>
                            <Input type="number" invalid={formik.errors.numero?true:false} onChange={formik.handleChange} name="numero" id="nombre" placeholder="" />
                        </FormGroup>
                        
                    </Col>
                </Row>
                
                <Row style={{marginBlock: '15px'}}>
                    <Col xs={12} md={6} lg={4}>
                        <div class="d-flex justify-content-around">
                            <PrimaryBtn type="submit">
                               Crear
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
        numero: yup.number().required(true)
    }
    
}

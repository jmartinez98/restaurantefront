import React,{useState, useEffect} from 'react';
import {PrimaryBtn} from './../../../components/Buttons/Buttons'
import {useLocation, useHistory} from 'react-router-dom';
import QRCode from 'qrcode.react';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
export default function ViewTables() {
    const data = useLocation();
    const history = useHistory();
    console.log(data.state)
    if (data.state) {
        const {numero, estado} = data.state
        return (
            <div  className="center-container">
                <Card>
                    <div style={{marginTop: 20}} className="center-container">
                    <QRCode size={400} imageSettings={{src:`https://via.placeholder.com/150/FFFFFF/000000?text=M${numero}`}} value={JSON.stringify(data.state)} />
                    </div>
                    <CardBody>
                    <CardTitle tag="h5">Mesa N: {numero}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{estado?"Disponible": "ocupado"}</CardSubtitle>
                    <CardText>Este código Qr contiene la informcion de la mesa que permite al cliente tomar la mesa para su pedido</CardText>
                    <Button onClick={()=>history.goBack()}>Volver</Button>
                    </CardBody>
                </Card>
                
            </div>
        )    
    }
    return(
        <div className="center-container">
            <PrimaryBtn onClick={()=>history.goBack()}>
                Seleciona una mesa
            </PrimaryBtn>
            
        </div>
    )
    
}

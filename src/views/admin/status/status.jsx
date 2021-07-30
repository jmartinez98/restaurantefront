import React from 'react';
import {Row,Col} from 'reactstrap';
import {CenterText} from '../../client/tables/style';
import {BtnCard} from '../../../components/cards/Cards';
import {useHistory} from 'react-router-dom';
export default function GeneralStatus() {
    const history = useHistory();
    return (
        <Row>
            <Col md={6} xs={12} lg={4} style={{height: '300px', marginBottom: 15}}>
                <BtnCard onClick={()=>history.push('/dashboard/menu')} >
                    <CenterText>
                    
                        <h1>Menu</h1>
                    </CenterText>
                </BtnCard>
            </Col>
            <Col md={6} xs={12} lg={4} style={{height: '300px', marginBottom: 15}}>
                <BtnCard onClick={()=>history.push('/dashboard/users')} >
                    <CenterText>
                    
                        <h1>Usuarios</h1>
                    </CenterText>
                </BtnCard>
            </Col>
        </Row>
    )
}

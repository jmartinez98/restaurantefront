import React from 'react'
import {Row, Col, Progress} from 'reactstrap'
import {ItemCard } from '../../../components/cards/Cards'
export default function Daily() {
    return (
        <>
            <Row>
                <Col xs={12} md={7} xl={8} >
                    <Row>
                        <Col>
                            <ItemCard>
                                <div className="card-body">
                                    <h5 className="card-title">fecha</h5>
                                    <p className="card-text">Plato 1<b>$20.00</b> </p>
                                    <p className="card-text">Plato 2 <b>$20.00</b> </p>
                                </div>
                                <div className="card-body">
                                    <p className="d-flex justify-content-end card-text">Total <b>$20.00</b> </p>
                                </div>
                                
                            </ItemCard>
                        </Col>
                        <Col>
                            <ItemCard>
                                <div className="card-body">
                                    <h5 className="card-title">fecha</h5>
                                    <p className="card-text">Plato 1<b>$20.00</b> </p>
                                    <p className="card-text">Plato 2 <b>$20.00</b> </p>
                                </div>
                                <div className="card-body">
                                    <p className="d-flex justify-content-end card-text">Total <b>$20.00</b> </p>
                                </div>
                                
                            </ItemCard>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} md={5} xl={4}>
                    <Row>
                        <Col>
                            <ItemCard>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item" style={{backgroundColor: '#ffffff5c'}}>
                                        <p className="card-text">Ventas de ayer <b>$200.00</b> </p>
                                        <div className="text-center">25% Hoy <b>$50.00</b></div>
                                        <Progress value="25" />
                                    </li>
                                    <li className="list-group-item" style={{backgroundColor: '#ffffff5c'}}>
                                    <p className="card-text">Clientes atendidos <b>5</b> </p>
                                    </li>
                                </ul>
                                
                            </ItemCard>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
            
        </>
    )
}

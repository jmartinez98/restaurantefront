import React from 'react'
import {Row, Col, Spinner} from 'reactstrap'
export default function Loading() {
    return (
        <Row>
            <Col>
                <div style={{height: '95vh' }} className="d-flex align-items-center justify-content-center">
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="secondary" />
                    <Spinner type="grow" color="secondary" />
                </div>
            </Col>
        </Row>
    )
}

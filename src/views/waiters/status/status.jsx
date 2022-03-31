import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "reactstrap";
import { MdRestaurantMenu } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { CenterText } from "../../client/tables/style";
const size = 40;
export default function Status() {
  const history = useHistory();
  return (
    <>
      <Row>
        <Col className="dashboard-col">
          <CenterText>
            <div class="one">
              <h1 className=" text-white">Menu de Mesero</h1>
            </div>
          </CenterText>
        </Col>
      </Row>
      <Row className="">
        <Col md={6} xs={12} lg={6} className="dashboard-col">
          <button
            onClick={() => history.push("/dashboard/tables")}
            className="flat-card"
          >
            <CenterText>
              <MdRestaurantMenu size={size} className=" text-white" />
              <h2 className=" text-white">Entregar</h2>
            </CenterText>
          </button>
        </Col>
        <Col md={6} xs={12} lg={6} className="dashboard-col">
          <button
            className="flat-card"
            onClick={() => history.push("/dashboard/charge")}
          >
            <CenterText>
              <FiUsers className=" text-white" size={size} />
              <h2 className=" text-white">Cobrar</h2>
            </CenterText>
          </button>
        </Col>
      </Row>
    </>
  );
}

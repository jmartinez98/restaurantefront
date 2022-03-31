import React from "react";
import { Row, Col } from "reactstrap";
import restaurat from "../../images/restaurant1.jpg";
const Schedule = () => {
  return (
    <Row style={{ marginTop: 40 }}>
      <Col className="">
        <div
          className="schedule-image"
          style={{ backgroundImage: `url(${restaurat})` }}
        />
        <div className="absolute-center-container glassform">
          <h3>Horarios</h3>
          <p className="no-margin">Lunes, Martes, Miercoles, Jueves</p>
          <p> 10:00 - 21:00 </p>
          <p className="no-margin">Viernes, Sábado, Domingo</p>
          <p> 10:00 - 17:00 </p>
        </div>
      </Col>
    </Row>
  );
};

export default Schedule;

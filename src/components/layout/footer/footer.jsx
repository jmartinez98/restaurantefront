import React from "react";
import { Col, Row } from "reactstrap";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
const iconSize = 30;
const Footer = () => {
  return (
    <div className="footer-container">
      <Row>
        <Col>
          <h3 className="text-center">Quito - Ecuador</h3>
          <p className="text-center no-margin">
            Sebastian de Benalcazar y Jorge Icaza
          </p>
          <p className="text-center ">099999999</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center aling-items-center">
            {/* <BsFacebook
              size={iconSize}
              style={{ margin: 10, cursor: "pointer" }}
            />
            <BsInstagram
              size={iconSize}
              style={{ margin: 10, cursor: "pointer" }}
            /> */}
            <a
              href="https://wa.me/593987210707"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
            >
              <BsWhatsapp
                size={iconSize}
                style={{ margin: 10, cursor: "pointer" }}
              />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;

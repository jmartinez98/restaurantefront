import React, { useState, useEffect } from "react";
import { Collapse, Row, Col } from "reactstrap";
import { ItemCard } from "../../components/cards/Cards";
import Api from "../../utils/api";
import background from "../../images/restaurant.jpg";
import Schedule from "./Schedule";
import Footer from "../../components/layout/footer/footer";
import noimg from "../../images/no-img.png";
import { SecondaryBtn } from "../../components/Buttons/Buttons";
import { MdRestaurantMenu } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicHome = () => {
  const [menu, setMenu] = useState([]);
  const history = useHistory();
  const isLoggedIn = useSelector((state) => state.authReducer.token);
  useEffect(() => {
    Api.get("/api/menu").then((e) => {
      setMenu(e.data.data);
    });
  }, []);
  return (
    <div className="">
      <div className="button-to-login">
        <SecondaryBtn onClick={() => history.push("/login")}>
          <div className="d-flex justify-content-center align-items-center">
            <MdRestaurantMenu size={30} style={{ marginRight: 10 }} />
            <p className="no-margin fw-bold">
              {isLoggedIn ? "Dashboard" : "Pide ya!"}{" "}
            </p>
          </div>
        </SecondaryBtn>
      </div>

      <Row>
        <Col>
          <div className="custom-nav-container">
            <div
              className="bg-image"
              style={{ backgroundImage: `url(${background})` }}
            />
            {/* <div className="absolute-center-container glassform">
              <h1>RESTAURANTE</h1>
            </div> */}
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: 40 }}>
        <Col>
          <div className="d-flex justify-content-center ">
            <div>
              <p className="no-margin">Conoce nuestros </p>
              <h4 className="text-center">Platos</h4>
            </div>
          </div>
        </Col>
      </Row>
      <div style={{ minHeight: 400 }} className="container">
        {menu.map((e) => (
          <ColapseDish
            key={e._id}
            nombre={e.nombre}
            precio={e.precio}
            platos={e.platos}
          />
        ))}
      </div>
      <Schedule />
      <Footer />
    </div>
  );
};

const ColapseDish = ({ nombre = "", precio = "", platos = [] }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <Row style={{ margin: "10px 0 10px 0" }}>
      <Col>
        <button
          onClick={() => setToggle(!toggle)}
          className={`glassform-button menu-button ${
            toggle ? "menu-button-active" : ""
          }`}
        >
          <div className="d-flex justify-content-between">
            <p className="text-capitalize no-margin">{nombre}</p>
            <p className="no-margin">{precio}$</p>
          </div>
        </button>
        <Collapse isOpen={toggle}>
          <ItemCard>
            <Row>
              {platos.map((e) => (
                <Col
                  key={e._id}
                  sm={12}
                  md={6}
                  className="img-container"
                  style={{ marginBlock: 10 }}
                >
                  <Row>
                    <Col xs={3} md={4}>
                      <img
                        src={
                          e.imagen
                            ? process.env.REACT_APP_HOST_URL + e.imagen
                            : noimg
                        }
                        className="img-dish"
                        alt=""
                      />
                    </Col>
                    <Col xs={9} md={8}>
                      <p className="no-margin title-dish text-capitalize">
                        {e.nombre}
                      </p>
                      <p className="dish-description text-capitalize">
                        {e.descripcion}
                      </p>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          </ItemCard>
        </Collapse>
      </Col>
    </Row>
  );
};

export default PublicHome;

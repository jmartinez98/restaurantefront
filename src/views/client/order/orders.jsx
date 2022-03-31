import React, { useState, useEffect, useContext } from "react";
import { Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { SecondaryBtn } from "../../../components/Buttons/Buttons";
import { ItemCard } from "../../../components/cards/Cards";
import { MenuContent } from "../dishes/styles";
import Api from "../../../utils/ClientApi";
import { useHistory } from "react-router-dom";
import { states } from "../../../utils/states";
import noimg from "../../../images/no-img.png";
import { Context } from "../../../context/SocketContext";
import Loading from "../../../components/animations/loading";
export default function Orders() {
  const [pedido, setPedido] = useState([]);
  const selector = useSelector((state) => state.orderReducer);
  const history = useHistory();
  const [allData, setAllData] = useState({});
  const [orderReady, setOrderready] = useState(false);
  const [loading, setLoading] = useState(true);
  const { socket } = useContext(Context);
  const goTooBack = () => history.push("/dashboard");

  const getData = () => {
    Api.get(`/api/pedido/reserva/${selector.reserve}`)
      .then((e) => {
        let order = e.data.data;
        if (order.length > 0) {
          setPedido(order[order.length - 1].pedidos);
          setAllData(order[order.length - 1]);
          if (order[order.length - 1].reserva.estado === states.preparado) {
            setOrderready(true);
          }
        }
        setLoading(false);
      })
      .catch(() => {
        goTooBack();
      });
  };
  useEffect(() => {
    socket.on("cocinero-mesero", (data) => {
      getData();
    });
  }, [allData]);

  useEffect(() => {
    if (loading) {
      getData();
    }
  }, [loading]);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
        <Row>
          {orderReady ? (
            <Col>
              <h3 className="text-center text-white">
                Tu orden esta ya esta Lista!
              </h3>
            </Col>
          ) : (
            <Col>
              <h3 className="text-center  text-white">
                Tu orden esta en Proceso
              </h3>
              <small className="text-center  text-white">
                Estamos llevando tu pedido al a mesa
              </small>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <h4 className="text-center  text-white">Tu Orden </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12}>
            <Row>
              {pedido.map((data) => (
                <Col
                  style={{ marginBlock: "5px" }}
                  key={data._id}
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <ItemCard>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <h5>
                        {data.cantidad} {data?.menu?.nombre ?? ""}
                      </h5>
                      <small>${data?.menu?.precio ?? "EE"} c/u</small>
                    </div>
                    {data.menu && (
                      <MenuContent className={"scroll"}>
                        {data.menu.platos.map((plato) => (
                          <Col key={plato._id} sm={12}>
                            <Row>
                              <Col xs={3} className="">
                                <img
                                  src={
                                    plato.imagen
                                      ? process.env.REACT_APP_HOST_URL +
                                        plato.imagen
                                      : noimg
                                  }
                                  className="img-dish"
                                  alt=""
                                />
                              </Col>
                              <Col xs={8}>
                                <p className="no-margin title-dish text-capitalize">
                                  {plato.nombre}
                                </p>
                                <p className="dish-description ">
                                  {plato.descripcion}
                                </p>
                              </Col>
                            </Row>
                          </Col>
                        ))}
                      </MenuContent>
                    )}

                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <h4>
                        $ {data.menu?.precio ?? "Menú Borrado" * data.cantidad}
                      </h4>
                    </div>
                  </ItemCard>
                </Col>
              ))}
              {pedido.length > 0 ? (
                <Col style={{ marginBlock: "5px" }} xs={12}>
                  <ItemCard>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <h4>Total</h4>
                    </div>
                    <div className="d-flex w-100 justify-content-between align-items-center">
                      <h3>$ {allData.total} </h3>
                    </div>
                  </ItemCard>
                </Col>
              ) : (
                <ItemCard>
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <h4>Gracias por su visita!</h4>
                  </div>
                  <div className="d-flex w-100 justify-content-between align-items-center">
                    <SecondaryBtn onClick={() => history.goBack()}>
                      Continuar
                    </SecondaryBtn>
                  </div>
                </ItemCard>
              )}
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

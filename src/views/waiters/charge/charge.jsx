import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Row,
  CardTitle,
  CardSubtitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { ItemCard } from "../../../components/cards/Cards";
import { SecondaryBtn, PrimaryBtn } from "../../../components/Buttons/Buttons";
import Loading from "../../../components/animations/loading";
import Api from "../../../utils/ClientApi";
import { submitCharge } from "./api_request";
import { Context } from "../../../context/SocketContext";
import { CenterText } from "../../client/tables/style";
import { useHistory } from "react-router-dom";
export default function Charge() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [chargeData, setChargeData] = useState(null);
  const [modal, setModal] = useState(false);
  const { socket } = useContext(Context);
  const toggle = () => setModal(!modal);

  const charge = (data) => {
    setChargeData(data);
    setModal(true);
  };

  const submit = () => {
    submitCharge(chargeData.reserva.mesa._id, chargeData.reserva._id).then(
      () => {
        socket.emit("cocinero-mesero");
        setModal(false);
        setLoading(true);
      }
    );
  };

  useEffect(() => {
    Api.get("/api/pedido").then((e) => {
      let data = e.data.data.filter((e) => e.reserva.estado === "entregado");
      setOrders(data);
      setLoading(false);
    });
  }, [loading]);

  if (loading) {
    return <Loading />;
  }
  return (
    <Row style={{ marginTop: "15px" }}>
      {orders.map((order) => (
        <Col key={order._id} md={4} style={{ height: "300px" }}>
          <ItemCard>
            <div style={{ padding: "20px" }}>
              <CardTitle tag="h5">Mesa {order.reserva.mesa.numero}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Numero de platos : <b>{order.pedidos.length}</b>
              </CardSubtitle>

              <div className="scroll" style={{ height: 70 }}>
                {order.pedidos.map((dishes) => (
                  <div
                    key={dishes._id}
                    className="d-flex justify-content-between"
                  >
                    <div className="text-capitalize">
                      <b>{dishes.cantidad}</b> {dishes.menu.nombre}
                    </div>
                    <b>${dishes.cantidad * dishes.menu.precio}</b>
                  </div>
                ))}
              </div>
              <CardText>
                Total: <b> $ {order.total}</b>
              </CardText>
            </div>
            <SecondaryBtn onClick={() => charge(order)}>Cobrar</SecondaryBtn>
          </ItemCard>
        </Col>
      ))}
      {!orders.length > 0 ? (
        <Col md={6} xs={12} lg={6} className="dashboard-col">
          <button
            onClick={() => history.push("/dashboard/")}
            className="flat-card"
          >
            <CenterText>
              <h2 className="text-white">Sin mesas por cobrar </h2>
              <small className="text-white">Aceptar</small>
            </CenterText>
          </button>
        </Col>
      ) : null}
      <ChargeModal
        submit={submit}
        data={chargeData}
        modal={modal}
        toggle={toggle}
      />
    </Row>
  );
}
const ChargeModal = ({ submit, data, modal, toggle }) => (
  <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>
      {" "}
      Mesa {data?.reserva?.mesa?.numero}
    </ModalHeader>
    <ModalBody>
      <ItemCard>
        <CardText>Cobrar Mesa?</CardText>
        <div className="scroll" style={{ height: 70 }}>
          {data ? (
            <div>
              {data.pedidos.map((dishes) => (
                <div
                  key={dishes._id}
                  className="d-flex justify-content-between"
                >
                  <div className="text-capitalize">
                    <b>{dishes.cantidad}</b> {dishes.menu.nombre}
                  </div>
                  <b>${dishes.cantidad * dishes.menu.precio}</b>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <CardText>
          total: <b> $ {data?.total}</b>
        </CardText>
      </ItemCard>
    </ModalBody>
    <ModalFooter>
      <PrimaryBtn onClick={submit}>Cobrar</PrimaryBtn>
      <SecondaryBtn onClick={toggle}>Cancelar</SecondaryBtn>
    </ModalFooter>
  </Modal>
);

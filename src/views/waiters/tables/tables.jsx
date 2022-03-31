import React, { useEffect, useState, useContext } from "react";
import {
  Col,
  Row,
  CardTitle,
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
import { Context } from "../../../context/SocketContext";
import { CenterText } from "../../client/tables/style";
import { useHistory } from "react-router-dom";
export default function Tables() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [deliveData, setDeliveData] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { socket } = useContext(Context);

  const deliver = (data) => {
    setDeliveData(data);
    setModal(true);
  };

  const submit = () => {
    Api.put(`/api/reserva/${deliveData?.reserva?._id}`, { estado: "entregado" })
      .then((e) => {
        setModal(false);
        setLoading(true);
      })
      .catch(() => {
        setModal(false);
      });
  };
  const getOrders = () => {
    Api.get("/api/pedido").then((e) => {
      let data = e.data.data.filter((e) => e.reserva.estado === "preparado");
      setOrders(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getOrders();
  }, [loading]);
  useEffect(() => {
    socket.on("cocinero-mesero", (data) => {
      getOrders();
    });
  }, [orders]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Row style={{ marginTop: "15px" }}>
        {orders.map((order) => (
          <Col key={order._id} md={4} style={{ height: "300px" }}>
            <ItemCard>
              <div style={{ padding: "20px" }}>
                <CardTitle tag="h5">Mesa {order.reserva.mesa.numero}</CardTitle>

                <CardText className="scroll" style={{ height: 70 }}>
                  {order.pedidos.map((dishes) => (
                    <li key={dishes._id} className="text-capitalize">
                      <b>{dishes.cantidad}</b> {dishes.menu.nombre}
                    </li>
                  ))}
                </CardText>
                {/* <CardText>Hora de pedido: <b>{order.reserva.fecha}</b></CardText> */}
              </div>
              <SecondaryBtn onClick={() => deliver(order)}>
                Entregar
              </SecondaryBtn>
            </ItemCard>
          </Col>
        ))}
        {!orders.length > 0 ? (
          <Col>
            <Col md={6} xs={12} lg={6} className="dashboard-col">
              <button
                onClick={() => history.push("/dashboard/")}
                className="flat-card"
              >
                <CenterText>
                  <h2 className="text-white">Sin mesas por despachar </h2>
                  <small className="text-white">Aceptar</small>
                </CenterText>
              </button>
            </Col>
          </Col>
        ) : null}
        <DeliverModal
          submit={submit}
          data={deliveData}
          modal={modal}
          toggle={toggle}
        />
      </Row>
    </>
  );
}

const DeliverModal = ({ submit, data, modal, toggle }) => (
  <Modal isOpen={modal} toggle={toggle}>
    <ModalHeader toggle={toggle}>
      {" "}
      Mesa {data?.reserva?.mesa?.numero}
    </ModalHeader>
    <ModalBody>
      <ItemCard>
        <CardText>Entregar plato a mesa ?</CardText>
      </ItemCard>
    </ModalBody>
    <ModalFooter>
      <PrimaryBtn onClick={submit}>Entregar</PrimaryBtn>
      <SecondaryBtn onClick={toggle}>Cancelar</SecondaryBtn>
    </ModalFooter>
  </Modal>
);

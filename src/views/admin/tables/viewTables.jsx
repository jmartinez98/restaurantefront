import React, { useEffect, useState } from "react";
import { PrimaryBtn } from "./../../../components/Buttons/Buttons";
import { useLocation, useHistory } from "react-router-dom";
import QRCode from "qrcode.react";
import Api from "../../../utils/ClientApi";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
export default function ViewTables() {
  const data = useLocation();
  const history = useHistory();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      if (data.state) {
        Api.get("/api/reserva").then((e) => {
          const user = e.data.data
            .filter(
              (a) => a.estado !== "finalizado" && a.mesa._id === data.state._id
            )
            .map((i) => i.usuario);
          if (user[0]) setName(user[0].nombre);

          setLoading(false);
        });
      }
    }
  }, [loading]);
  if (!loading) {
    if (data.state) {
      const { numero, estado } = data.state;
      return (
        <div className="center-container">
          <Card>
            <div style={{ marginTop: 20 }} className="center-container">
              <QRCode
                size={400}
                imageSettings={{
                  src: `https://via.placeholder.com/150/FFFFFF/000000?text=M${numero}`,
                  height: 50,
                  width: 50,
                }}
                value={JSON.stringify(data.state)}
              />
            </div>
            <CardBody>
              <CardTitle tag="h5">Mesa N: {numero}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {estado ? "Disponible" : "Ocupado"}{" "}
                {!estado && (
                  <>
                    por
                    <p className="no-margin text-capitalize"> {name}</p>
                  </>
                )}
              </CardSubtitle>
              <CardText>
                Este código Qr contiene la información de la mesa que permite al
                cliente tomar la mesa para su pedido
              </CardText>
              <Button onClick={() => history.goBack()}>Volver</Button>
            </CardBody>
          </Card>
        </div>
      );
    }
    return (
      <div className="center-container">
        <PrimaryBtn onClick={() => history.goBack()}>
          Seleciona una mesa
        </PrimaryBtn>
      </div>
    );
  } else {
    return <div>Cargando...</div>;
  }
}

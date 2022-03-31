import React, { useState, useEffect, useRef } from "react";
import { BtnCard, SimpleCard } from "../../../components/cards/Cards";
import { PrimaryBtn, SecondaryBtn } from "../../../components/Buttons/Buttons";
import { Row, Col, Button } from "reactstrap";
import { CenterText, H2 } from "./style";
import { useHistory } from "react-router-dom";
import Api from "../../../utils/ClientApi";
import { getUserData } from "../../../utils/tokenFunctions";
import { useDispatch } from "react-redux";
import { OrderActions } from "../../../redux/actions";
import Loading from "../../../components/animations/loading";
import { states } from "../../../utils/states";
import QrReader from "react-qr-reader";
export default function Tables() {
  const router = useHistory();
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const userData = getUserData();
  const dispatch = useDispatch();
  const [reserved, setReserved] = useState(false);
  const [result, setResult] = useState(null);
  const [activeCamera, setActiveCamera] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  // const qrReader = useRef(null);
  // const refPrint=()=>{
  //     console.log(qrReader.current)
  // }
  const getTable = (id, num) => {
    setLoading(true);
    Api.put(`/api/mesa/${id}`, { estado: false })
      .then((e) => {
        Api.post("/api/reserva", {
          mesa: id,
          usuario: userData.id,
        }).then((response) => {
          dispatch({
            type: OrderActions.GET_TABLE,
            payload: { num: num, reserve: response.data.id },
          });
          router.push("/dashboard/dishes");
        });
      })
      .catch((e) => {
        setLoading(false);
        setError(true);
      });
  };
  const handleScan = (data) => {
    if (data) {
      console.log(data);
      try {
        const tableQr = JSON.parse(data);
        let getTable = tables.find((e) => e._id === tableQr._id);
        setResult(getTable);
        handleActiveCamera();
      } catch (error) {}
    }
  };

  const handleError = (err) => {
    console.error("error", err);
  };
  const handleActiveCamera = () => {
    setActiveCamera(!activeCamera);
  };
  const changeCamera = () => {
    setCameraMode(!cameraMode);
  };
  useEffect(() => {
    setLoading(true);
    Api.get("/api/mesa")
      .then((e) => {
        setTables(e.data.data);
        setError(false);
        Api.get(`/api/reserva/usuario/${userData.id}`).then((response) => {
          let userReserves = response.data.data;
          if (userReserves.length > 0) {
            let lastReserveState = userReserves[userReserves.length - 1];
            if (lastReserveState.estado !== states.finalizado) {
              setReserved(true);
              dispatch({
                type: OrderActions.GET_TABLE,
                payload: {
                  num: lastReserveState.mesa.numero,
                  reserve: lastReserveState._id,
                },
              });
            }
          }
          setLoading(false);
        });
      })
      .catch((e) => {
        setError(true);
      });
  }, [error]);
  if (reserved) {
    return (
      <Row>
        <Col style={{ height: 300 }}>
          <BtnCard onClick={() => router.push("/dashboard/dishes")}>
            <CenterText>
              <H2> Ya tienes reservado una Mesa</H2>
              <H2>Continuar</H2>
            </CenterText>
          </BtnCard>
        </Col>
      </Row>
    );
  }
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        {activeCamera ? (
          <div className="center-container">
            <div style={{ display: "grid", marginBottom: 10 }}>
              <QrReader
                facingMode={!cameraMode ? "environment" : "user"}
                // constraints={{facingMode: 'rear'}}
                // choosedeviceid={choosedevice}
                delay={1000}
                style={{ height: 300, width: 300 }}
                onError={(e) => handleError(e)}
                onScan={(e) => handleScan(e)}
              />
              <Button outline onClick={changeCamera} color="secondary">
                Cambiar cámara
              </Button>
              {/* <Button outline onClick={refPrint} color="secondary">ref</Button> */}
            </div>
          </div>
        ) : null}
        {/* <p>{result}</p> */}

        {result ? (
          <Row>
            <Col
              md={6}
              xs={12}
              lg={4}
              style={{ height: "300px", marginBottom: 15 }}
            >
              <SimpleCard>
                {/* <CenterText> */}
                {result.estado ? (
                  <>
                    <H2>Mesa {result.numero}</H2>
                    <PrimaryBtn
                      disabled={!result.estado}
                      onClick={() => getTable(result._id, result.numero)}
                    >
                      Elegir Mesa
                    </PrimaryBtn>
                    {"   "}
                    <SecondaryBtn onClick={handleActiveCamera}>
                      {!activeCamera ? "Elegir otra" : "Apagar camara"}
                    </SecondaryBtn>
                  </>
                ) : (
                  <>
                    <H2>Mesa {result.numero}</H2>
                    <H2>Esta mesa esta Ocupada </H2>
                    <SecondaryBtn onClick={handleActiveCamera}>
                      {!activeCamera ? "Elegir otra" : "Apagar camara"}
                    </SecondaryBtn>
                  </>
                )}

                {/* </CenterText> */}
              </SimpleCard>
            </Col>
          </Row>
        ) : null}
        {!result ? (
          <BtnCard onClick={handleActiveCamera} style={{ marginTop: 20 }}>
            {activeCamera ? "Apagar cámara" : "Escanear código Qr"}
          </BtnCard>
        ) : null}

        {/* <Row style={{paddingBlock: '20px'}}>
                    <Col>
                        <h1>Elige un lugar para empezar... </h1>
                    </Col>
                </Row> */}
        {/* <Row>
                    {tables.map(table=>(
                        <Col key={table._id}  md={6} xs={12} lg={4} style={{height: '300px', marginBottom: 15}}>
                            <BtnCard disabled={!table.estado} onClick={()=>getTable(table._id, table.numero)}>
                                <CenterText>
                                    {table.estado?(
                                        <H2>Mesa {table.numero}</H2>
                                    ):(
                                        <>
                                            <H2>Mesa {table.numero}</H2>
                                            <H2>ocupado</H2>
                                        </>
                                    )}
                                    
                                </CenterText>
                            </BtnCard>
                        </Col>
                    ))}
                </Row> */}
      </div>
    );
  }
}

import React, { useState, useEffect } from "react";
import { Card, Table, CardText, CardBody, Badge, CardTitle } from "reactstrap";
import {
  PrimaryBtn,
  SecondaryBtn,
  WaringBtn,
} from "../../../components/Buttons/Buttons";
import Alert from "../../../components/alert/Alert";
import Api from "../../../utils/ClientApi";
import { useHistory } from "react-router-dom";
import { IoEnterOutline, IoTrashSharp } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
export default function Tables() {
  const [tables, setTables] = useState([]);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [tableSelected, setTableSelected] = useState({});
  const createTables = () => {
    history.push("/dashboard/tablesForm");
  };
  const editTables = (table) => {
    history.push("/dashboard/tablesForm", { table: table });
  };
  const goToTable = (data) => {
    history.push("/dashboard/table", data);
  };
  const toggle = () => setAlert(!alert);
  const openAlert = (e) => {
    if (e.estado) {
      setTableSelected(e);
      setAlert(true);
    }
  };
  const DeleteTable = () => {
    setAlert(false);
    Api.delete("/api/mesa/" + tableSelected._id).then((data) => {
      setLoading(true);
    });
  };
  useEffect(() => {
    if (loading) {
      Api.get("/api/mesa").then((data) => {
        setTables(data.data.data);
        setLoading(false);
      });
    }
  }, [loading]);
  return (
    <div>
      <Card>
        <Alert
          toggle={toggle}
          visible={alert}
          data={`Mesa ${tableSelected.numero}`}
          accept={DeleteTable}
        />
        <CardBody>
          <CardTitle tag="h5">Mesas</CardTitle>
          <CardText>Agrega o elimina</CardText>
          <PrimaryBtn onClick={createTables}>Agregar nuevo</PrimaryBtn>
        </CardBody>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Numero de mesa</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table, index) => (
                <tr key={table._id}>
                  <th scope="row">{index + 1}</th>
                  <td> Mesa {table.numero}</td>
                  <td>
                    {table.estado ? (
                      <Badge color="success">Disponible</Badge>
                    ) : (
                      <Badge color="danger">Ocupado</Badge>
                    )}
                  </td>
                  <td>
                    <PrimaryBtn onClick={() => goToTable(table)}>
                      <IoEnterOutline /> ver
                    </PrimaryBtn>
                    {table.estado && (
                      <>
                        <SecondaryBtn onClick={() => editTables(table)}>
                          <AiFillEdit /> Editar
                        </SecondaryBtn>

                        <WaringBtn onClick={() => openAlert(table)}>
                          <IoTrashSharp /> Eliminar
                        </WaringBtn>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

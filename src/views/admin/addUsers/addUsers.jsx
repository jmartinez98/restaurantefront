import React, { useState, useEffect } from "react";
import { Card, Table, CardText, CardBody, CardTitle } from "reactstrap";
import { SecondaryBtn, PrimaryBtn } from "../../../components/Buttons/Buttons";
import { useHistory } from "react-router-dom";
import Api from "../../../utils/ClientApi";
import { IoEnterOutline } from "react-icons/io5";
export default function AddUsers() {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    Api.get("/api/usuario").then((e) => {
      let data = e.data.data.filter((user) => user.rol !== "cliente");
      setUsers(data);
    });
  }, []);

  const usersForm = () => {
    history.push("/dashboard/usersForm");
  };
  const userData = (id) => {
    history.push("/dashboard/usersForm", { id: id });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Usuarios</CardTitle>
          <CardText></CardText>
          <PrimaryBtn onClick={usersForm}>Agregar nuevo</PrimaryBtn>
        </CardBody>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Cargo</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.nombre}</td>
                  <td>{user.correo}</td>
                  <td>{user.rol}</td>
                  <td>
                    <SecondaryBtn onClick={() => userData(user._id)}>
                      <IoEnterOutline /> Ver
                    </SecondaryBtn>

                    {/* <WaringBtn>
                                            Eliminar Menu
                                        </WaringBtn> */}
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

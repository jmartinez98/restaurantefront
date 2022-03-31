import React, { useState, useEffect } from "react";
import { Card, Table, CardText, CardBody, CardTitle } from "reactstrap";
import { PrimaryBtn, WaringBtn } from "../../../components/Buttons/Buttons";
import Api from "../../../utils/ClientApi";
import { useHistory } from "react-router-dom";
import { IoEnterOutline, IoTrashSharp } from "react-icons/io5";
import Alert from "../../../components/alert/Alert";
export default function AddMenu() {
  const [menus, setMenus] = useState([]);
  const [menuSelected, setMenuSelected] = useState({});
  const [alert, setAlert] = useState(false);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const createDishes = () => {
    history.push("/dashboard/menuForm");
  };
  const goToMenu = (id) => {
    history.push("/dashboard/menuForm", { id: id });
  };

  useEffect(() => {
    if (loading) {
      Api.get("/api/menu").then((data) => {
        setMenus(data.data.data);
        setLoading(false);
      });
    }
  }, [loading]);
  const openAlert = (e) => {
    setMenuSelected(e);
    setAlert(true);
  };
  const toggle = () => setAlert(!alert);
  const DeleteMenu = () => {
    setAlert(false);
    Api.delete("/api/menu/" + menuSelected._id).then((data) => {
      setLoading(true);
    });
  };
  return (
    <div>
      <Alert
        toggle={toggle}
        visible={alert}
        data={menuSelected.nombre}
        accept={DeleteMenu}
      />
      <Card>
        <CardBody>
          <CardTitle tag="h5">Menú</CardTitle>
          <CardText>Agrega o elimina</CardText>
          <PrimaryBtn onClick={createDishes}>Agregar nuevo</PrimaryBtn>
        </CardBody>
        <CardBody>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Platos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu, index) => (
                <tr key={menu._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{menu.nombre}</td>
                  <td>
                    <ul className="list-group list-group-flush">
                      {menu.platos.map((e) => (
                        <li
                          className="list-group-item "
                          style={{ paddingBlock: 3 }}
                          key={e._id}
                        >
                          <p className="no-margin list-description">
                            {e.nombre}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <PrimaryBtn onClick={() => goToMenu(menu._id)}>
                        <IoEnterOutline /> Ver
                      </PrimaryBtn>

                      <WaringBtn onClick={() => openAlert(menu)}>
                        <IoTrashSharp />
                        Eliminar
                      </WaringBtn>
                    </div>
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

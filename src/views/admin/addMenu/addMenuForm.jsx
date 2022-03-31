import React, { useState, useEffect } from "react";
import { ItemCard } from "../../../components/cards/Cards";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  UncontrolledAlert,
} from "reactstrap";
import {
  SecondaryBtn,
  PrimaryBtn,
  WaringBtn,
} from "../../../components/Buttons/Buttons";
import { formInitData, AddItems, createMenu, editMenu } from "./api_request";
import * as yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import Api from "../../../utils/ClientApi";
import Loading from "../../../components/animations/loading";
import DishesForm from "./dihesForm";
import noimg from "../../../images/no-img.png";
import DishesImageForm from "./addImage";
import Alert from "../../../components/alert/Alert";
export default function AddMenuForm() {
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState(false);
  const [platos, setPlatos] = useState([]);
  const history = useHistory();
  const [loading, setLoadig] = useState(true);
  const [loadingDishes, setLoadigDishes] = useState(true);
  const [error, setError] = useState(false);
  const [newDish, setNewDish] = useState(true);
  const [dish, setDish] = useState({});
  const [menuDishes, setMenuDishes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditDishes, setIsEditDishes] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [initialValues, setinitialValues] = useState({
    nombre: "",
    precio: 0,
  });

  const [alert, setAlert] = useState(false);
  const menuFormik = useFormik({
    initialValues: initialValues,
    validationSchema: yup.object(menuSchema()),
    enableReinitialize: true,
    onSubmit: (form) => {
      if (isEdit) {
        editMenu(form, menuDishes, history.location.state.id).then(() => {
          setLoadig(true);
        });
      } else {
        createMenu(form, menuDishes)
          .then((e) => {
            history.replace("/dashboard/menu");
          })
          .catch(console.log);
      }
    },
  });

  const editdish = (plato) => {
    setDish(plato);
    setIsEditDishes(true);
    toggle();
  };
  const dishImg = (plato) => {
    setDish(plato);
    setModalImg(!modalImg);
  };
  const toggle = () => setModal(!modal);
  const toggleAlert = () => setAlert(!alert);
  const openAlert = (e) => {
    const exist = menuDishes.filter((plato) => plato._id == e._id).length > 0;

    if (!exist) {
      setDish(e);
      setAlert(true);
    }
  };
  const addDishesToMenu = (data) => {
    setMenuDishes(AddItems(menuDishes, data));
  };
  const deleteItem = (id) => {
    let item = menuDishes.filter((plato) => plato._id !== id);
    setMenuDishes(item);
  };
  const DeleteDish = () => {
    setAlert(false);
    Api.delete("/api/plato/" + dish._id).then((data) => {
      setNewDish(true);
    });
  };
  useEffect(() => {
    if (loading) {
      if (history.location.state) {
        setIsEdit(true);
        setReadOnly(true);
        Api.get(`/api/menu/${history.location.state.id}`)
          .then((data) => {
            const { platos, nombre, precio } = data.data.data;
            setinitialValues({ nombre: nombre, precio: precio });
            setMenuDishes(platos);
            setLoadig(false);
          })
          .catch(() => setError(true));
      } else {
        setLoadig(false);
      }
    }
  }, [loading]);
  useEffect(() => {
    if (newDish) {
      formInitData()
        .then((e) => {
          setPlatos(e.platos);
        })
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setNewDish(false);
          setLoadigDishes(false);
        });
    }
  }, [newDish]);

  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Alert
        toggle={toggleAlert}
        visible={alert}
        data={dish.nombre}
        accept={DeleteDish}
      />
      <ItemCard style={{ marginTop: "15px" }}>
        {isEdit ? (
          <Row>
            <Col>
              <div className="d-flex justify-content-end">
                <SecondaryBtn onClick={() => setReadOnly(false)}>
                  Editar
                </SecondaryBtn>
              </div>
            </Col>
          </Row>
        ) : null}
        <UncontrolledAlert
          color="warning"
          isOpen={error}
          toggle={() => setError(false)}
        >
          Ocurrio un error intentalo nuevamente
        </UncontrolledAlert>
        <Form onSubmit={menuFormik.handleSubmit}>
          <fieldset disabled={readOnly}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="nombre">Nombre del menú</Label>
                  <Input
                    type="text"
                    invalid={menuFormik.errors.nombre ? true : false}
                    onChange={menuFormik.handleChange}
                    value={menuFormik.values.nombre}
                    name="nombre"
                    id="nombre"
                    placeholder="Ej: Desayuno, Almuerzo, etc."
                  />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="precio">Precio</Label>
                  <Input
                    type="number"
                    step=".01"
                    invalid={menuFormik.errors.precio ? true : false}
                    onChange={menuFormik.handleChange}
                    value={menuFormik.values.precio}
                    name="precio"
                    id="precio"
                    placeholder="Precio"
                  />
                </FormGroup>
              </Col>
            </Row>
          </fieldset>
          <Row>
            <Col>
              <ListGroup>
                {menuDishes.map((dish) => (
                  <ListGroupItem
                    key={dish._id}
                    style={{ backgroundColor: "#fff0" }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <ListGroupItemHeading>
                          <p className="no-margin text-capitalize">
                            {dish.nombre}
                          </p>
                        </ListGroupItemHeading>
                        <ListGroupItemText className="no-margin">
                          {dish.descripcion}
                        </ListGroupItemText>
                      </div>
                      {!readOnly && (
                        <WaringBtn
                          type="button"
                          onClick={() => deleteItem(dish._id)}
                        >
                          Quitar
                        </WaringBtn>
                      )}
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row style={{ marginBlock: "15px" }}>
            <Col>
              {!isEdit && (
                <PrimaryBtn
                  type="submit"
                  disabled={menuDishes.length > 0 && !loading ? false : true}
                >
                  Crear
                </PrimaryBtn>
              )}
              {!readOnly & isEdit ? (
                <PrimaryBtn
                  type="submit"
                  disabled={menuDishes.length > 0 && !loading ? false : true}
                >
                  Editar
                </PrimaryBtn>
              ) : null}
            </Col>
          </Row>
        </Form>
      </ItemCard>
      {!readOnly && (
        <>
          <Row>
            <Col xs={12} style={{ marginBlock: "10px" }}>
              <SecondaryBtn
                type="button"
                onClick={() => {
                  toggle();
                  setIsEditDishes(false);
                }}
              >
                Crear nuevo plato
              </SecondaryBtn>{" "}
              <DishesForm
                modal={modal}
                data={dish}
                setModal={setModal}
                toggle={toggle}
                setNewDish={setNewDish}
                setLoadig={setLoadigDishes}
                loading={loadingDishes}
                isedit={isEditDishes}
              />
              <DishesImageForm
                modal={modalImg}
                data={dish}
                setModal={setModalImg}
                toggle={setModalImg}
                setNewDish={setNewDish}
                setLoadig={setLoadigDishes}
                loading={loadingDishes}
              />
            </Col>
          </Row>
          <Row>
            {loading ? (
              <div>cargando</div>
            ) : (
              platos.map((plato) => (
                <Col key={plato._id} xs={12} lg={6} style={{ marginBlock: 10 }}>
                  <ItemCard>
                    <Row>
                      <Col xs={3}>
                        <img
                          src={
                            plato.imagen
                              ? process.env.REACT_APP_HOST_URL + plato.imagen
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
                        <p className="dish-description ">{plato.descripcion}</p>
                      </Col>
                    </Row>
                    <div
                      style={{ marginTop: 10 }}
                      className="d-flex justify-content-between"
                    >
                      <div className="d-flex justify-content-around">
                        <PrimaryBtn
                          type="button"
                          onClick={() => addDishesToMenu(plato)}
                        >
                          Agregar
                        </PrimaryBtn>{" "}
                        <SecondaryBtn
                          type="button"
                          onClick={() => editdish(plato)}
                        >
                          Editar
                        </SecondaryBtn>
                        <SecondaryBtn
                          type="button"
                          onClick={() => dishImg(plato)}
                        >
                          {plato.imagen ? "Cambiar Imagen" : " Agregar Imagen"}
                        </SecondaryBtn>
                      </div>
                      <WaringBtn type="button" onClick={() => openAlert(plato)}>
                        Eliminar
                      </WaringBtn>
                    </div>
                  </ItemCard>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
    </>
  );
}

function menuSchema() {
  return {
    nombre: yup.string().required(true),
    precio: yup.number().required(true),
  };
}

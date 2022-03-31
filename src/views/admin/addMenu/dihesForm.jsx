import React from "react";
import { useFormik } from "formik";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { addDish, edidDish } from "./api_request";
import { SecondaryBtn, PrimaryBtn } from "../../../components/Buttons/Buttons";
import * as yup from "yup";
export default function DihesForm({
  modal,
  setModal,
  setNewDish,
  toggle,
  setLoadig,
  loading,
  data,
  isedit,
}) {
  const dishesFormik = useFormik({
    initialValues: {
      nombre: isedit ? data.nombre : "",
      descripcion: isedit ? data.descripcion : "",
    },
    validationSchema: yup.object(disheSchema()),
    enableReinitialize: true,
    onSubmit: (form) => {
      if (isedit) {
        edidDish(form, data._id).then(() => {
          setNewDish(true);
          setModal(false);
          setLoadig(true);
        });
      } else {
        addNewDish(form);
      }
    },
  });
  const addNewDish = (form) => {
    setLoadig(true);
    addDish(form)
      .then((e) => {
        setNewDish(true);
        setModal(false);
      })
      .catch((e) => {
        setModal(false);
      });
  };
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Crear Plato</ModalHeader>
      <Form onSubmit={dishesFormik.handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="nombre">Nombre del Plato</Label>
            <Input
              type="text"
              invalid={dishesFormik.errors.nombre ? true : false}
              onChange={dishesFormik.handleChange}
              name="nombre"
              id="nombre"
              value={dishesFormik.values.nombre}
              placeholder="Ej: Seco de Pollo, Encebollado, Coca Cola, Jugo etc."
            />
          </FormGroup>
          <FormGroup>
            <Label for="descripcion">Descripcion del plato</Label>
            <Input
              type="text"
              invalid={dishesFormik.errors.descripcion ? true : false}
              onChange={dishesFormik.handleChange}
              value={dishesFormik.values.descripcion}
              name="descripcion"
              id="descripcion"
              placeholder="Ej: Arroz con pollo al jugo, Jugo de naranja etc."
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {loading ? null : (
            <>
              <PrimaryBtn type="submit">
                {isedit ? "Editar" : "Crear"}
              </PrimaryBtn>{" "}
              <SecondaryBtn type="button" onClick={toggle}>
                Cancelar
              </SecondaryBtn>
            </>
          )}
        </ModalFooter>
      </Form>
    </Modal>
  );
}
function disheSchema() {
  return {
    nombre: yup.string().required(true),
    descripcion: yup.string().required(true),
  };
}

import React, { useState } from "react";
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
import { addImageDish } from "./api_request";
import { SecondaryBtn, PrimaryBtn } from "../../../components/Buttons/Buttons";
import noimg from "../../../images/no-img.png";
export default function DihesImageForm({
  modal,
  setModal,
  setNewDish,
  toggle,
  setLoadig,
  loading,
  data,
}) {
  const [fieldValue, setFieldValue] = useState(null);
  const [preview, setPreview] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    addImageDish(fieldValue, data._id)
      .then((e) => {
        setNewDish(true);
        setModal(false);
        setLoadig(true);
        setFieldValue(null);
        setPreview(null);
      })
      .catch(console.log);
  };
  return (
    <Modal isOpen={modal} toggle={() => toggle(!modal)}>
      <ModalHeader toggle={() => toggle(!modal)}>Imagen</ModalHeader>
      <Form onSubmit={onSubmit}>
        <ModalBody>
          <div
            className={`d-flex ${
              fieldValue
                ? "justify-content-between align-items-center"
                : "justify-content-center"
            }`}
          >
            <img
              className={fieldValue ? "modal-img-old" : "modal-img"}
              src={
                data.imagen
                  ? process.env.REACT_APP_HOST_URL + data.imagen
                  : noimg
              }
              alt=""
            />
            {fieldValue && (
              <img className="modal-img-preview" src={preview} alt="" />
            )}
          </div>

          <FormGroup>
            <Label for="file">Imagen del plato</Label>
            <Input
              type="file"
              onChange={(e) => {
                const fileReader = new FileReader();
                fileReader.onload = () => {
                  if (fileReader.readyState === 2) {
                    const formData = new FormData();
                    formData.append("file", e.target.files[0]);
                    setFieldValue(formData);
                    setPreview(fileReader.result);
                  }
                };
                fileReader.readAsDataURL(e.target.files[0]);
              }}
              accept="image/*"
              name="file"
              id="file"
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {loading ? null : (
            <>
              <PrimaryBtn disabled={fieldValue ? false : true} type="submit">
                Agregar
              </PrimaryBtn>{" "}
              <SecondaryBtn
                type="button"
                onClick={() => {
                  toggle(!modal);
                  setFieldValue(null);
                  setPreview(null);
                }}
              >
                Cancelar
              </SecondaryBtn>
            </>
          )}
        </ModalFooter>
      </Form>
    </Modal>
  );
}

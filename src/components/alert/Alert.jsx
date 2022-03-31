import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
export default function Alert({ toggle, visible = false, data = "", accept }) {
  return (
    <div>
      <Modal centered isOpen={visible} toggle={toggle}>
        <ModalHeader toggle={toggle}>Eliminar</ModalHeader>
        <ModalBody>Eliminar {data}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={accept}>
            Aceptar
          </Button>{" "}
          <Button onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

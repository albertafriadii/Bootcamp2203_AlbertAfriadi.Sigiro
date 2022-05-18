import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";

export default function DetailUsers({ users }) {
  // modal update
  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const [nama] = useState(users.name);
  const [email] = useState(users.email);
  const [role] = useState(users.role);

  return (
    <>
      <ButtonGroup className="justify-content-center mb-2">
        <Button variant="info" onClick={() => handleShowDetail(users.id)}>
          <BsIcons.BsInfoSquareFill />
        </Button>
      </ButtonGroup>
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Detail User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Nama user : {nama} </h6>
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Email : {email}</h6>
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Role : {role}</h6>
                </Form.Label>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

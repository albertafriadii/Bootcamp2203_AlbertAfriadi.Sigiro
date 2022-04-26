import React, { Fragment, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetailContact({ contacts, setContacts }) {
  // modal update
  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const [nama] = useState(contacts.nama);
  const [email] = useState(contacts.email);
  const [mobile] = useState(contacts.mobile);

  return (
    <Fragment>
      <Button
        style={{ width: "80%" }}
        variant="info"
        onClick={() => handleShowDetail(contacts.id)}
      >
        Detail Data
      </Button>
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Kontak</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>{nama}</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{email}</Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>{mobile}</Form.Label>
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

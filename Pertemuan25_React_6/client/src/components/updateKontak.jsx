import React, { Fragment, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UpdateContact({ contacts }) {
  // modal update
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [nama, setNama] = useState(contacts.nama);
  const [email, setEmail] = useState(contacts.email);
  const [mobile, setMobile] = useState(contacts.mobile);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const body = { nama, email, mobile };
      await fetch(`http://localhost:3001/contacts/${contacts.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button
        style={{ width: "80%" }}
        variant="warning"
        onClick={handleShowUpdate}
      >
        Edit Data
      </Button>
      <Modal show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  name="nama"
                  value={nama}
                  onChange={(e) => {
                    setNama(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Mobile"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" onClick={(e) => updateData(e)}>
                Simpan
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

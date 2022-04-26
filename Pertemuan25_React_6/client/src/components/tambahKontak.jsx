import React, { Fragment, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TambahKontak() {
  // modal tambah
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //   form data
  const [nama, setFormNama] = useState("");
  const [email, setFormEmail] = useState("");
  const [mobile, setFormMobile] = useState("");

  //   Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { nama, email, mobile };
      const response = await fetch("http://localhost:3001/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <Button
        style={{ margin: "2rem", width: "20%" }}
        variant="primary"
        onClick={handleShowAdd}
      >
        Tambah Data
      </Button>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama"
                  name="nama"
                  value={nama}
                  onChange={(e) => {
                    setFormNama(e.target.value);
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
                    setFormEmail(e.target.value);
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
                    setFormMobile(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}

import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import * as BiIcons from "react-icons/bi";

export default function UpdateUser({ users }) {
  // modal update
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [name, setName] = useState(users.name);
  const [email, setEmail] = useState(users.email);
  const [role, setRole] = useState(users.role);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, role };
      await fetch(`http://localhost:5000/users/${users.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/users";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <ButtonGroup className="mb-2">
        <Button variant="warning" onClick={handleShowUpdate}>
          <BiIcons.BiEdit />
        </Button>
      </ButtonGroup>
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tipe Barang"
                  name="tipe"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deskripsi"
                  name="role"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
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
    </>
  );
}

import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import * as BiIcons from "react-icons/bi";

export default function UpdateBarang({ barang }) {
  // modal update
  const [showUpdate, setShowUpdate] = useState(false);

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const [namabarang, setNama] = useState(barang.namabarang);
  const [tipebarang, setTipe] = useState(barang.tipebarang);
  const [deskripsi, setDeskripsi] = useState(barang.deskripsi);
  const [stock, setStock] = useState(barang.stock);

  const updateData = async (e) => {
    e.preventDefault();
    try {
      const body = { namabarang, tipebarang, deskripsi, stock };
      await fetch(`http://localhost:5000/barang/${barang.idbarang}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/barang";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <ButtonGroup>
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
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Barang"
                  name="nama"
                  value={namabarang}
                  onChange={(e) => {
                    setNama(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipe Barang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tipe Barang"
                  name="tipe"
                  value={tipebarang}
                  onChange={(e) => {
                    setTipe(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Deskripsi"
                  name="deskripsi"
                  value={deskripsi}
                  onChange={(e) => {
                    setDeskripsi(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Stock"
                  name="Stock"
                  disabled
                  value={stock}
                  onChange={(e) => {
                    setStock(e.target.value);
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

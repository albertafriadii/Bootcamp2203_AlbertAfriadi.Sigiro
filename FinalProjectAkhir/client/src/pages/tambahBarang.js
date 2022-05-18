import React, { useState } from "react";
import { Form, Button, Modal, ButtonGroup } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TambahBarang() {
  // modal tambah
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //   form data
  const [namabarang, setFormNama] = useState("");
  const [tipebarang, setFormTipe] = useState("");
  const [deskripsi, setFormDeskripsi] = useState("");
  const [stock, setFormStock] = useState("0");
  // const [gambar, setFormGambar] = useState("https://fakeimg.pl/350x200/");
  // const [saveImage, setSaveImage] = useState(null);

  //   Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { namabarang, tipebarang, deskripsi, stock };
      // const formData = new FormData();
      // formData.append("photo", saveImage);
      const response = await fetch("http://localhost:5000/barang", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/barang";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  // handle on change
  // function handleUploadChange(e) {
  //   const uploaded = e.target.files[0];
  //   setFormGambar(URL.createObjectURL(uploaded));
  //   setSaveImage(uploaded);
  // }

  return (
    <>
      <ButtonGroup className="justify-content-center mb-2">
        <Button variant="primary" onClick={handleShowAdd}>
          Tambah Data
        </Button>
      </ButtonGroup>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nama Barang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Barang"
                  name="nama"
                  value={namabarang}
                  onChange={(e) => {
                    setFormNama(e.target.value);
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
                    setFormTipe(e.target.value);
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
                    setFormDeskripsi(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Stock"
                  name="stock"
                  value={stock}
                  disabled
                  onChange={(e) => {
                    setFormStock(e.target.value);
                  }}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <br />
                <div className="w-100">
                  <div>
                    <img src={gambar} className="img-thumbnail" alt="..." />
                  </div>
                  <Form.Label>Gambar Barang</Form.Label>
                  <input
                    type="file"
                    onChange={handleUploadChange}
                    className="form-control"
                    id="formFile"
                  />
                </div>
              </Form.Group> */}
              <Button variant="primary" type="submit">
                Simpan
              </Button>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

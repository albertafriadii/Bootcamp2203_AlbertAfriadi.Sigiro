import React, { useEffect, useState } from "react";
import { Form, Button, Modal, ButtonGroup } from "react-bootstrap";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TambahBarangKeluar() {
  // modal tambah
  const [showAdd, setShowAdd] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);

  //   form data
  const [barang, setBarang] = useState([]);
  const [idbarang, setIdBarang] = useState();
  const [namabarang, setNamaBarang] = useState();
  const [tanggal, setFormTanggal] = useState("");
  const [penerima, setFormPenerima] = useState("");
  const [qty, setFormQty] = useState("");

  //   Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { idbarang, tanggal, penerima, qty, namabarang };
      const response = await fetch("http://localhost:5000/barang-keluar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/barang-keluar";
      console.log(response);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getBarang = async () => {
    try {
      const response = await fetch("http://localhost:5000/barang");
      const jsonData = await response.json();
      setBarang(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  return (
    <>
      <ButtonGroup className="justify-content-center mb-2">
        <Button variant="primary" onClick={handleShowAdd}>
          Tambah Data Keluar
        </Button>
      </ButtonGroup>
      <Modal show={showAdd} onHide={handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Barang Keluar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Pilih Barang</Form.Label>
                <br />
                <select
                  value={idbarang}
                  onChange={(e) => {
                    setIdBarang(e.target.value);
                  }}
                >
                  <option> --Pilih Disini--</option>
                  {barang.map((item) => (
                    <option
                      value={item.idbarang}
                      onChange={(e) => {
                        setBarang(e.target.value);
                      }}
                    >
                      {item.idbarang} . {item.namabarang}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Nama Barang</Form.Label>
                <br />
                <select
                  value={namabarang}
                  onChange={(e) => {
                    setNamaBarang(e.target.value);
                  }}
                >
                  <option> --Pilih Disini--</option>
                  {barang.map((item) => (
                    <option
                      value={item.namabarang}
                      onChange={(e) => {
                        setBarang(e.target.value);
                      }}
                    >
                      {item.namabarang}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tanggal</Form.Label>
                <Form.Control
                  type="date"
                  name="nama"
                  value={tanggal}
                  onChange={(e) => {
                    setFormTanggal(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Penerima</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Penerima"
                  name="nama"
                  value={penerima}
                  onChange={(e) => {
                    setFormPenerima(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Jumlah Barang</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Jumlah Barang Keluar"
                  name="tipe"
                  value={qty}
                  onChange={(e) => {
                    setFormQty(e.target.value);
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
    </>
  );
}

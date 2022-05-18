import React, { useState } from "react";
import { Button, Modal, Form, ButtonGroup } from "react-bootstrap";
import * as BsIcons from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DetailBarang({ barang }) {
  // modal update
  const [showDetail, setShowDetail] = useState(false);

  const handleCloseDetail = () => setShowDetail(false);
  const handleShowDetail = () => setShowDetail(true);

  const [nama] = useState(barang.namabarang);
  const [tipe] = useState(barang.tipebarang);
  const [deskripsi] = useState(barang.deskripsi);
  const [stock] = useState(barang.stock);
  // const [gambar] = useState(barang.gambar);

  return (
    <>
      <ButtonGroup className="justify-content-center">
        <Button variant="info" onClick={() => handleShowDetail(barang.id)}>
          <BsIcons.BsInfoSquareFill />
        </Button>
      </ButtonGroup>
      <Modal show={showDetail} onHide={handleCloseDetail}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Barang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="Form">
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Nama barang : </h6>
                  {nama}
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Tipe barang : </h6>
                  {tipe}
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Deskripsi : </h6>
                  {deskripsi}
                </Form.Label>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <h6>Stock : {stock} </h6>
                </Form.Label>
              </Form.Group>
              {/* <Form.Group className="mb-3"> */}
              {/* <Form.Label>
                  <h6>Path Gambar : </h6>
                  {gambar}
                </Form.Label> */}
              {/* <img src={require(`../${gambar}`)} alt="Gambar" /> */}
              {/* </Form.Group> */}
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

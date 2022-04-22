import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactApp({
  data,
  handleDelete,
  handleEdit,
  handleDetail,
}) {
  const contactData = data.map((contact) => {
    return (
      <React.Fragment key={contact.id}>
        {/* <Row xs={1} md={4} className="g-4">
            <Col> */}
        <Card
          style={{
            width: "18rem",
            float: "left",
            margin: "1rem",
            color: "black",
            display: "flex",
            overflow: "x",
          }}
        >
          <Card.Body>
            <Card.Title>Data Kontak</Card.Title>
            <Card.Text>
              {contact.Nama}
              <br></br>
              {contact.Email}
              <br></br>
              {contact.Mobile}
            </Card.Text>
            <Button
              className="btn-card"
              variant="info"
              onClick={() => handleDetail(contact.id)}
            >
              Detail
            </Button>
            <Button
              className="btn-card"
              variant="primary"
              onClick={() => handleEdit(contact.id)}
            >
              Edit
            </Button>
            <Button
              className="btn-card"
              variant="danger"
              onClick={() => handleDelete(contact.id)}
            >
              Hapus
            </Button>
          </Card.Body>
        </Card>
        {/* </Col>
        </Row> */}
      </React.Fragment>
    );
  });

  return <div>{contactData}</div>;
}
